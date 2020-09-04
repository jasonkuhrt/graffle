import fetch from 'cross-fetch'
import { print } from 'graphql/language/printer'

import createRequestBody from './createRequestBody'
import { ClientError, GraphQLError, RequestDocument, Variables } from './types'
import { Headers, RequestInit, Response } from './types.dom'

export { ClientError } from './types'

const transformHeaders = (headers: RequestInit["headers"]): Record<string, string> => {
  let oHeaders: Record<string, string> = {};
  if (headers) {
    if (headers instanceof Headers) {
      headers.forEach((v, k) => { oHeaders[k] = v })
    } else if (headers instanceof Array) {
      headers.forEach(([k, v]) => { oHeaders[k] = v })
    } else {
      oHeaders = headers as Record<string, string>
    }
  }

  return oHeaders
};

/**
 * todo
 */
export class GraphQLClient {
  private url: string
  private options: RequestInit

  constructor(url: string, options?: RequestInit) {
    this.url = url
    this.options = options || {}
  }

  async rawRequest<T = any, V = Variables>(
    query: string,
    variables?: V
  ): Promise<{ data?: T; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] }> {
    const { headers, ...others } = this.options
    const oHeaders = transformHeaders(headers)
    const body = createRequestBody(query, variables)

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        ...(typeof body === 'string' ? { 'Content-Type': 'application/json' } : {}),
        ...oHeaders,
      },
      body,
      ...others,
    })

    const result = await getResult(response)

    if (response.ok && !result.errors && result.data) {
      const { headers, status } = response
      return { ...result, headers, status }
    } else {
      const errorResult = typeof result === 'string' ? { error: result } : result
      throw new ClientError(
        { ...errorResult, status: response.status, headers: response.headers },
        { query, variables }
      )
    }
  }

  /**
   * todo
   */
  async request<T = any, V = Variables>(document: RequestDocument, variables?: V): Promise<T> {
    const { headers, ...others } = this.options
    const oHeaders = transformHeaders(headers)
    const resolvedDoc = resolveRequestDocument(document)

    const body = createRequestBody(resolvedDoc, variables)

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        ...(typeof body === 'string' ? { 'Content-Type': 'application/json' } : {}),
        ...oHeaders,
      },
      body,
      ...others,
    })

    const result = await getResult(response)

    if (response.ok && !result.errors && result.data) {
      return result.data
    } else {
      const errorResult = typeof result === 'string' ? { error: result } : result
      throw new ClientError({ ...errorResult, status: response.status }, { query: resolvedDoc, variables })
    }
  }

  setHeaders(headers: RequestInit['headers']): GraphQLClient {
    this.options.headers = headers
    return this
  }

  setHeader(key: string, value: string): GraphQLClient {
    const { headers } = this.options

    if (headers) {
      // todo what if headers is in nested array form... ?
      //@ts-ignore
      headers[key] = value
    } else {
      this.options.headers = { [key]: value }
    }

    return this
  }
}

/**
 * todo
 */
export async function rawRequest<T = any, V = Variables>(
  url: string,
  query: string,
  variables?: V
): Promise<{ data?: T; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] }> {
  const client = new GraphQLClient(url)
  return client.rawRequest<T, V>(query, variables)
}

/**
 * Send a GraphQL Document to the GraphQL server for exectuion.
 *
 * @example
 *
 * ```ts
 * // You can pass a raw string
 *
 * await request('https://foo.bar/graphql', `
 *   {
 *     query {
 *       users
 *     }
 *   }
 * `)
 *
 * // You can also pass a GraphQL DocumentNode. Convenient if you
 * // are using graphql-tag package.
 *
 * import gql from 'graphql-tag'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 *
 * // If you don't actually care about using DocumentNode but just
 * // want the tooling support for gql template tag like IDE syntax
 * // coloring and prettier autoformat then note you can use the
 * // passthrough gql tag shipped with graphql-request to save a bit
 * // of performance and not have to install another dep into your project.
 *
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 * ```
 */
export async function request<T = any, V = Variables>(
  url: string,
  document: RequestDocument,
  variables?: V
): Promise<T> {
  const client = new GraphQLClient(url)
  return client.request<T, V>(document, variables)
}

export default request

/**
 * todo
 */
function getResult(response: Response): Promise<any> {
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('application/json')) {
    return response.json()
  } else {
    return response.text()
  }
}

/**
 * helpers
 */

function resolveRequestDocument(document: RequestDocument): string {
  if (typeof document === 'string') return document

  return print(document)
}

/**
 * Convenience passthrough template tag to get the benefits of tooling for the gql template tag. This does not actually parse the input into a GraphQL DocumentNode like graphql-tag package does. It just returns the string with any variables given interpolated. Can save you a bit of performance and having to install another package.
 *
 * @example
 *
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 *
 * @remarks
 *
 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
 */
export function gql(chunks: TemplateStringsArray, ...variables: any[]): string {
  return chunks.reduce(
    (accumulator, chunk, index) => `${accumulator}${chunk}${index in variables ? variables[index] : ''}`,
    ''
  )
}
