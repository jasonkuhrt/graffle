import crossFetch, * as CrossFetch from 'cross-fetch'
import { OperationDefinitionNode } from 'graphql/language/ast'
import { print } from 'graphql/language/printer'
import createRequestBody from './createRequestBody'
import { BatchRequestDocument, ClientError, RequestDocument, Variables } from './types'
import * as Dom from './types.dom'

export { ClientError } from './types'

/**
 * Convert the given headers configuration into a plain object.
 */
const resolveHeaders = (headers: Dom.RequestInit['headers']): Record<string, string> => {
  let oHeaders: Record<string, string> = {}
  if (headers) {
    if (
      (typeof Headers !== 'undefined' && headers instanceof Headers) ||
      headers instanceof CrossFetch.Headers
    ) {
      oHeaders = HeadersInstanceToPlainObject(headers)
    } else if (Array.isArray(headers)) {
      headers.forEach(([name, value]) => {
        oHeaders[name] = value
      })
    } else {
      oHeaders = headers as Record<string, string>
    }
  }

  return oHeaders
}

/**
 * Clean a GraphQL document to send it via a GET query
 *
 * @param {string} str GraphQL query
 * @returns {string} Cleaned query
 */
const queryCleanner = (str: string): string => str.replace(/([\s,]|#[^\n\r]+)+/g, ' ').trim()

type TBuildGetQueryParams<V> =
  | { query: string; variables: V | undefined; operationName: string | undefined }
  | { query: string[]; variables: V[] | undefined; operationName: undefined }

/**
 * Create query string for GraphQL request
 *
 * @param {object} param0 -
 *
 * @param {string|string[]} param0.query the GraphQL document or array of document if it's a batch request
 * @param {string|undefined} param0.operationName the GraphQL operation name
 * @param {any|any[]} param0.variables the GraphQL variables to use
 */
const buildGetQueryParams = <V>({ query, variables, operationName }: TBuildGetQueryParams<V>): string => {
  if (!Array.isArray(query)) {
    const search: string[] = [`query=${encodeURIComponent(queryCleanner(query))}`]

    if (variables) {
      search.push(`variables=${encodeURIComponent(JSON.stringify(variables))}`)
    }

    if (operationName) {
      search.push(`operationName=${encodeURIComponent(operationName)}`)
    }

    return search.join('&')
  }

  if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
    throw new Error('Cannot create query with given variable type, array expected')
  }

  // Batch support
  const payload = query.reduce<{ query: string; variables: string | undefined }[]>(
    (accu, currentQuery, index) => {
      accu.push({
        query: queryCleanner(currentQuery),
        variables: variables ? JSON.stringify(variables[index]) : undefined,
      })
      return accu
    },
    []
  )

  return `query=${encodeURIComponent(JSON.stringify(payload))}`
}

/**
 * Fetch data using POST method
 */
const post = async <V = Variables>({
  url,
  query,
  variables,
  operationName,
  headers,
  fetch,
  fetchOptions,
}: {
  url: string
  query: string | string[]
  fetch: any
  fetchOptions: Dom.RequestInit
  variables?: V
  headers?: Dom.RequestInit['headers']
  operationName?: string
}) => {
  const body = createRequestBody(query, variables, operationName)

  return await fetch(url, {
    method: 'POST',
    headers: {
      ...(typeof body === 'string' ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body,
    ...fetchOptions,
  })
}

/**
 * Fetch data using GET method
 */
const get = async <V = Variables>({
  url,
  query,
  variables,
  operationName,
  headers,
  fetch,
  fetchOptions,
}: {
  url: string
  query: string | string[]
  fetch: any
  fetchOptions: Dom.RequestInit
  variables?: V
  headers?: HeadersInit
  operationName?: string
}) => {
  const queryParams = buildGetQueryParams<V>({
    query,
    variables,
    operationName,
  } as TBuildGetQueryParams<V>)

  return await fetch(`${url}?${queryParams}`, {
    method: 'GET',
    headers,
    ...fetchOptions,
  })
}

/**
 * todo
 */
export class GraphQLClient {
  private url: string
  private options: Dom.RequestInit

  constructor(url: string, options?: Dom.RequestInit) {
    this.url = url
    this.options = options || {}
  }

  rawRequest<T = any, V = Variables>(
    query: string,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }> {
    let { headers, fetch = crossFetch, method = 'POST', ...fetchOptions } = this.options
    let { url } = this

    return makeRequest<T, V>({
      url,
      query,
      variables,
      headers: {
        ...resolveHeaders(headers),
        ...resolveHeaders(requestHeaders),
      },
      operationName: undefined,
      fetch,
      method,
      fetchOptions,
    })
  }

  /**
   * Send a GraphQL document to the server.
   */
  async request<T = any, V = Variables>(
    document: RequestDocument,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<T> {
    let { headers, fetch = crossFetch, method = 'POST', ...fetchOptions } = this.options
    let { url } = this

    const { query, operationName } = resolveRequestDocument(document)

    const { data } = await makeRequest<T, V>({
      url,
      query,
      variables,
      headers: {
        ...resolveHeaders(headers),
        ...resolveHeaders(requestHeaders),
      },
      operationName,
      fetch,
      method,
      fetchOptions,
    })

    return data
  }

  /**
   * Send a GraphQL document to the server.
   */
  async batchRequests<T extends any = any, V = Variables>(
    documents: BatchRequestDocument<V>[],
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<T> {
    let { headers, fetch = crossFetch, method = 'POST', ...fetchOptions } = this.options
    let { url } = this

    const queries = documents.map(({ document }) => resolveRequestDocument(document).query)
    const variables = documents.map(({ variables }) => variables)

    const { data } = await makeRequest<T, (V | undefined)[]>({
      url,
      query: queries,
      variables,
      headers: {
        ...resolveHeaders(headers),
        ...resolveHeaders(requestHeaders),
      },
      operationName: undefined,
      fetch,
      method,
      fetchOptions,
    })

    return data
  }

  setHeaders(headers: Dom.RequestInit['headers']): GraphQLClient {
    this.options.headers = headers
    return this
  }

  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
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

  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(value: string): GraphQLClient {
    this.url = value
    return this
  }
}

async function makeRequest<T = any, V = Variables>({
  url,
  query,
  variables,
  headers,
  operationName,
  fetch,
  method = 'POST',
  fetchOptions,
}: {
  url: string
  query: string | string[]
  variables?: V
  headers?: Dom.RequestInit['headers']
  operationName?: string
  fetch: any
  method: string
  fetchOptions: Dom.RequestInit
}): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }> {
  const fetcher = method.toUpperCase() === 'POST' ? post : get
  const isBathchingQuery = Array.isArray(query)

  const response = await fetcher({
    url,
    query,
    variables,
    operationName,
    headers,
    fetch,
    fetchOptions,
  })
  const result = await getResult(response)

  const successfullyReceivedData =
    isBathchingQuery && Array.isArray(result) ? !result.some(({ data }) => !data) : !!result.data

  if (response.ok && !result.errors && successfullyReceivedData) {
    const { headers, status } = response
    return {
      ...(isBathchingQuery ? { data: result } : result),
      headers,
      status,
    }
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
export async function rawRequest<T = any, V = Variables>(
  url: string,
  query: string,
  variables?: V,
  requestHeaders?: Dom.RequestInit['headers']
): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }> {
  const client = new GraphQLClient(url)
  return client.rawRequest<T, V>(query, variables, requestHeaders)
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
  variables?: V,
  requestHeaders?: Dom.RequestInit['headers']
): Promise<T> {
  const client = new GraphQLClient(url)
  return client.request<T, V>(document, variables, requestHeaders)
}

/**
 * Send a batch of GraphQL Document to the GraphQL server for exectuion.
 *
 * @example
 *
 * ```ts
 * // You can pass a raw string
 *
 * await batchRequests('https://foo.bar/graphql', [
 * {
 *  query: `
 *   {
 *     query {
 *       users
 *     }
 *   }`
 * },
 * {
 *   query: `
 *   {
 *     query {
 *       users
 *     }
 *   }`
 * }])
 *
 * // You can also pass a GraphQL DocumentNode as query. Convenient if you
 * // are using graphql-tag package.
 *
 * import gql from 'graphql-tag'
 *
 * await batchRequests('https://foo.bar/graphql', [{ query: gql`...` }])
 * ```
 */
export async function batchRequests<T extends any = any, V = Variables>(
  url: string,
  documents: BatchRequestDocument<V>[],
  requestHeaders?: Dom.RequestInit['headers']
): Promise<T> {
  const client = new GraphQLClient(url)
  return client.batchRequests<T, V>(documents, requestHeaders)
}

export default request

/**
 * todo
 */
function getResult(response: Dom.Response): Promise<any> {
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

function resolveRequestDocument(document: RequestDocument): { query: string; operationName?: string } {
  if (typeof document === 'string') return { query: document }

  let operationName = undefined

  let operationDefinitions = document.definitions.filter(
    (definition) => definition.kind === 'OperationDefinition'
  ) as OperationDefinitionNode[]

  if (operationDefinitions.length === 1) {
    operationName = operationDefinitions[0].name?.value
  }

  return { query: print(document), operationName }
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

/**
 * Convert Headers instance into regular object
 */
function HeadersInstanceToPlainObject(headers: Dom.Response['headers']): Record<string, string> {
  const o: any = {}
  headers.forEach((v, k) => {
    o[k] = v
  })
  return o
}
