import crossFetch, * as CrossFetch from 'cross-fetch'
import { OperationDefinitionNode, DocumentNode } from 'graphql/language/ast'

import { parse } from 'graphql/language/parser'
import { print } from 'graphql/language/printer'
import createRequestBody from './createRequestBody'
import { defaultJsonSerializer } from './defaultJsonSerializer'
import {
  parseBatchRequestArgs,
  parseRawRequestArgs,
  parseRequestArgs,
  parseBatchRequestsExtendedArgs,
  parseRawRequestExtendedArgs,
  parseRequestExtendedArgs,
} from './parseArgs'
import {
  BatchRequestDocument,
  BatchRequestsOptions,
  ClientError,
  RawRequestOptions,
  RequestDocument,
  RequestOptions,
  BatchRequestsExtendedOptions,
  RawRequestExtendedOptions,
  RequestExtendedOptions,
  Variables,
} from './types'
import * as Dom from './types.dom'

export {
  BatchRequestDocument,
  BatchRequestsOptions,
  BatchRequestsExtendedOptions,
  ClientError,
  RawRequestOptions,
  RawRequestExtendedOptions,
  RequestDocument,
  RequestOptions,
  RequestExtendedOptions,
  Variables,
}

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
  | { query: string; variables: V | undefined; operationName: string | undefined; jsonSerializer: Dom.JsonSerializer }
  | { query: string[]; variables: V[] | undefined; operationName: undefined; jsonSerializer: Dom.JsonSerializer }

/**
 * Create query string for GraphQL request
 *
 * @param {object} param0 -
 *
 * @param {string|string[]} param0.query the GraphQL document or array of document if it's a batch request
 * @param {string|undefined} param0.operationName the GraphQL operation name
 * @param {any|any[]} param0.variables the GraphQL variables to use
 */
const buildGetQueryParams = <V>({ query, variables, operationName, jsonSerializer }: TBuildGetQueryParams<V>): string => {
  if (!Array.isArray(query)) {
    const search: string[] = [`query=${encodeURIComponent(queryCleanner(query))}`]

    if (variables) {
      search.push(`variables=${encodeURIComponent(jsonSerializer.stringify(variables))}`)
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
        variables: variables ? jsonSerializer.stringify(variables[index]) : undefined,
      })
      return accu
    },
    []
  )

  return `query=${encodeURIComponent(jsonSerializer.stringify(payload))}`
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
  const body = createRequestBody(query, variables, operationName, fetchOptions.jsonSerializer)

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
    jsonSerializer: fetchOptions.jsonSerializer
  } as TBuildGetQueryParams<V>)

  return await fetch(`${url}?${queryParams}`, {
    method: 'GET',
    headers,
    ...fetchOptions,
  })
}

/**
 * GraphQL Client.
 */
export class GraphQLClient {
  private url: string
  private options: Dom.RequestInit

  constructor(url: string, options?: Dom.RequestInit) {
    this.url = url
    this.options = options || {}
  }

  /**
   * Send a GraphQL query to the server.
   */
  async rawRequest<T = any, V = Variables>(
    query: string,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }>
  async rawRequest<T = any, V = Variables>(
    options: RawRequestOptions<V>
  ): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }>
  async rawRequest<T = any, V = Variables>(
    queryOrOptions: string | RawRequestOptions<V>,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }> {
    const rawRequestOptions = parseRawRequestArgs<V>(queryOrOptions, variables, requestHeaders)

    let { headers, fetch = crossFetch, method = 'POST', ...fetchOptions } = this.options
    let { url } = this
    if (rawRequestOptions.signal !== undefined) {
      fetchOptions.signal = rawRequestOptions.signal
    }

    const { operationName } = resolveRequestDocument(rawRequestOptions.query)

    return makeRequest<T, V>({
      url,
      query: rawRequestOptions.query,
      variables: rawRequestOptions.variables,
      headers: {
        ...resolveHeaders(headers),
        ...resolveHeaders(rawRequestOptions.requestHeaders),
      },
      operationName,
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
  ): Promise<T>
  async request<T = any, V = Variables>(options: RequestOptions<V>): Promise<T>
  async request<T = any, V = Variables>(
    documentOrOptions: RequestDocument | RequestOptions<V>,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<T> {
    const requestOptions = parseRequestArgs<V>(documentOrOptions, variables, requestHeaders)

    let { headers, fetch = crossFetch, method = 'POST', ...fetchOptions } = this.options
    let { url } = this
    if (requestOptions.signal !== undefined) {
      fetchOptions.signal = requestOptions.signal
    }

    const { query, operationName } = resolveRequestDocument(requestOptions.document)

    const { data } = await makeRequest<T, V>({
      url,
      query,
      variables: requestOptions.variables,
      headers: {
        ...resolveHeaders(headers),
        ...resolveHeaders(requestOptions.requestHeaders),
      },
      operationName,
      fetch,
      method,
      fetchOptions,
    })

    return data
  }

  /**
   * Send GraphQL documents in batch to the server.
   */
  async batchRequests<T extends any = any, V = Variables>(
    documents: BatchRequestDocument<V>[],
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<T>
  async batchRequests<T = any, V = Variables>(options: BatchRequestsOptions<V>): Promise<T>
  async batchRequests<T = any, V = Variables>(
    documentsOrOptions: BatchRequestDocument<V>[] | BatchRequestsOptions<V>,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<T> {
    const batchRequestOptions = parseBatchRequestArgs<V>(documentsOrOptions, requestHeaders)

    let { headers, fetch = crossFetch, method = 'POST', ...fetchOptions } = this.options
    let { url } = this
    if (batchRequestOptions.signal !== undefined) {
      fetchOptions.signal = batchRequestOptions.signal
    }

    const queries = batchRequestOptions.documents.map(
      ({ document }) => resolveRequestDocument(document).query
    )
    const variables = batchRequestOptions.documents.map(({ variables }) => variables)

    const { data } = await makeRequest<T, (V | undefined)[]>({
      url,
      query: queries,
      variables,
      headers: {
        ...resolveHeaders(headers),
        ...resolveHeaders(batchRequestOptions.requestHeaders),
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
  const result = await getResult(response, fetchOptions.jsonSerializer)

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
 * Send a GraphQL Query to the GraphQL server for execution.
 */
export async function rawRequest<T = any, V = Variables>(
  url: string,
  query: string,
  variables?: V,
  requestHeaders?: Dom.RequestInit['headers']
): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }>
export async function rawRequest<T = any, V = Variables>(
  options: RawRequestExtendedOptions<V>
): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }>
export async function rawRequest<T = any, V = Variables>(
  urlOrOptions: string | RawRequestExtendedOptions<V>,
  query?: string,
  variables?: V,
  requestHeaders?: Dom.RequestInit['headers']
): Promise<{ data: T; extensions?: any; headers: Dom.Headers; status: number }> {
  const requestOptions = parseRawRequestExtendedArgs<V>(urlOrOptions, query, variables, requestHeaders)
  const client = new GraphQLClient(requestOptions.url)
  return client.rawRequest<T, V>({
    ...requestOptions,
  })
}

/**
 * Send a GraphQL Document to the GraphQL server for execution.
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
): Promise<T>
export async function request<T = any, V = Variables>(options: RequestExtendedOptions<V>): Promise<T>
export async function request<T = any, V = Variables>(
  urlOrOptions: string | RequestExtendedOptions<V>,
  document?: RequestDocument,
  variables?: V,
  requestHeaders?: Dom.RequestInit['headers']
): Promise<T> {
  const requestOptions = parseRequestExtendedArgs<V>(urlOrOptions, document, variables, requestHeaders)
  const client = new GraphQLClient(requestOptions.url)
  return client.request<T, V>({
    ...requestOptions,
  })
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
export async function batchRequests<T = any, V = Variables>(
  url: string,
  documents: BatchRequestDocument<V>[],
  requestHeaders?: Dom.RequestInit['headers']
): Promise<T>
export async function batchRequests<T = any, V = Variables>(
  options: BatchRequestsExtendedOptions<V>
): Promise<T>
export async function batchRequests<T = any, V = Variables>(
  urlOrOptions: string | BatchRequestsExtendedOptions<V>,
  documents?: BatchRequestDocument<V>[],
  requestHeaders?: Dom.RequestInit['headers']
): Promise<T> {
  const requestOptions = parseBatchRequestsExtendedArgs<V>(urlOrOptions, documents, requestHeaders)
  const client = new GraphQLClient(requestOptions.url)
  return client.batchRequests<T, V>({ ...requestOptions })
}

export default request

/**
 * todo
 */
async function getResult(response: Dom.Response, jsonSerializer = defaultJsonSerializer): Promise<any> {
  let contentType: string | undefined

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'content-type') {
      contentType = value
    }
  })

  if (contentType && contentType.toLowerCase().startsWith('application/json')) {
    return jsonSerializer.parse(await response.text())
  } else {
    return response.text()
  }
}
/**
 * helpers
 */

function extractOperationName(document: DocumentNode): string | undefined {
  let operationName = undefined

  const operationDefinitions = document.definitions.filter(
    (definition) => definition.kind === 'OperationDefinition'
  ) as OperationDefinitionNode[]

  if (operationDefinitions.length === 1) {
    operationName = operationDefinitions[0].name?.value
  }

  return operationName
}

function resolveRequestDocument(document: RequestDocument): { query: string; operationName?: string } {
  if (typeof document === 'string') {
    let operationName = undefined

    try {
      const parsedDocument = parse(document)
      operationName = extractOperationName(parsedDocument)
    } catch (err) {
      // Failed parsing the document, the operationName will be undefined
    }

    return { query: document, operationName }
  }

  const operationName = extractOperationName(document)

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
