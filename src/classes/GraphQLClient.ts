import type { BatchRequestDocument, BatchRequestsOptions, BatchResult } from '../functions/batchRequests.js'
import { parseBatchRequestArgs } from '../functions/batchRequests.js'
import { parseRawRequestArgs } from '../functions/rawRequest.js'
import { parseRequestArgs } from '../functions/request.js'
import { defaultJsonSerializer } from '../helpers/defaultJsonSerializer.js'
import { resolveRequestDocument } from '../helpers/resolveRequestDocument.js'
import type {
  Fetch,
  FetchOptions,
  HTTPMethodInput,
  JsonSerializer,
  RequestDocument,
  RequestMiddleware,
  RequestOptions,
  VariablesAndRequestHeadersArgs,
} from '../helpers/types.js'
import {
  ClientError,
  type GraphQLClientResponse,
  type RawRequestOptions,
  type RequestConfig,
  type Variables,
} from '../helpers/types.js'
import { cleanQuery, isGraphQLContentType } from '../lib/graphql.js'
import { ACCEPT_HEADER, CONTENT_TYPE_GQL, CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON } from '../lib/http.js'
import { callOrIdentity, HeadersInstanceToPlainObject, uppercase } from '../lib/prelude.js'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

/**
 * GraphQL Client.
 */
export class GraphQLClient {
  constructor(
    private url: string,
    public readonly requestConfig: RequestConfig = {},
  ) {}

  /**
   * Send a GraphQL query to the server.
   */
  rawRequest: RawRequestMethod = async <T, V extends Variables = Variables>(
    ...args: RawRequestMethodArgs<V>
  ): Promise<GraphQLClientResponse<T>> => {
    const [queryOrOptions, variables, requestHeaders] = args
    const rawRequestOptions = parseRawRequestArgs<V>(queryOrOptions, variables, requestHeaders)

    const {
      headers,
      fetch = globalThis.fetch,
      method = `POST`,
      requestMiddleware,
      responseMiddleware,
      ...fetchOptions
    } = this.requestConfig
    const { url } = this
    if (rawRequestOptions.signal !== undefined) {
      fetchOptions.signal = rawRequestOptions.signal
    }

    const { operationName } = resolveRequestDocument(rawRequestOptions.query)

    return makeRequest<T, V>({
      url,
      query: rawRequestOptions.query,
      variables: rawRequestOptions.variables as V,
      headers: {
        ...resolveHeaders(callOrIdentity(headers)),
        ...resolveHeaders(rawRequestOptions.requestHeaders),
      },
      operationName,
      fetch,
      method,
      fetchOptions,
      middleware: requestMiddleware,
    })
      .then((response) => {
        if (responseMiddleware) {
          responseMiddleware(response)
        }
        return response
      })
      .catch((error) => {
        if (responseMiddleware) {
          responseMiddleware(error)
        }
        throw error
      })
  }

  /**
   * Send a GraphQL document to the server.
   */
  async request<T, V extends Variables = Variables>(
    document: RequestDocument | TypedDocumentNode<T, V>,
    ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
  ): Promise<T>
  async request<T, V extends Variables = Variables>(options: RequestOptions<V, T>): Promise<T>
  async request<T, V extends Variables = Variables>(
    documentOrOptions: RequestDocument | TypedDocumentNode<T, V> | RequestOptions<V>,
    ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
  ): Promise<T> {
    const [variables, requestHeaders] = variablesAndRequestHeaders
    const requestOptions = parseRequestArgs(documentOrOptions, variables, requestHeaders)

    const {
      headers,
      fetch = globalThis.fetch,
      method = `POST`,
      requestMiddleware,
      responseMiddleware,
      ...fetchOptions
    } = this.requestConfig
    const { url } = this
    if (requestOptions.signal !== undefined) {
      fetchOptions.signal = requestOptions.signal
    }

    const { query, operationName } = resolveRequestDocument(requestOptions.document)

    return makeRequest<T>({
      url,
      query,
      variables: requestOptions.variables,
      headers: {
        ...resolveHeaders(callOrIdentity(headers)),
        ...resolveHeaders(requestOptions.requestHeaders),
      },
      operationName,
      fetch,
      method,
      fetchOptions,
      middleware: requestMiddleware,
    })
      .then((response) => {
        if (responseMiddleware) {
          responseMiddleware(response)
        }
        return response.data
      })
      .catch((error) => {
        if (responseMiddleware) {
          responseMiddleware(error)
        }
        throw error
      })
  }

  /**
   * Send GraphQL documents in batch to the server.
   */
  // prettier-ignore
  batchRequests<T extends BatchResult, V extends Variables = Variables>(documents: BatchRequestDocument<V>[], requestHeaders?: HeadersInit): Promise<T>
  // prettier-ignore
  batchRequests<T extends BatchResult, V extends Variables = Variables>(options: BatchRequestsOptions<V>): Promise<T>
  // prettier-ignore
  batchRequests<T extends BatchResult, V extends Variables = Variables>(documentsOrOptions: BatchRequestDocument<V>[] | BatchRequestsOptions<V>, requestHeaders?: HeadersInit): Promise<T> {
    const batchRequestOptions = parseBatchRequestArgs<V>(documentsOrOptions, requestHeaders)
    const { headers, ...fetchOptions } = this.requestConfig

    if (batchRequestOptions.signal !== undefined) {
      fetchOptions.signal = batchRequestOptions.signal
    }

    const queries = batchRequestOptions.documents.map(
      ({ document }) => resolveRequestDocument(document).query
    )
    const variables = batchRequestOptions.documents.map(({ variables }) => variables)

    return makeRequest<T>({
      url: this.url,
      query: queries,
      // @ts-expect-error TODO reconcile batch variables into system.
      variables,
      headers: {
        ...resolveHeaders(callOrIdentity(headers)),
        ...resolveHeaders(batchRequestOptions.requestHeaders),
      },
      operationName: undefined,
      fetch: this.requestConfig.fetch ?? globalThis.fetch,
      method: this.requestConfig.method || `POST`,
      fetchOptions,
      middleware: this.requestConfig.requestMiddleware,
    })
      .then((response) => {
        if (this.requestConfig.responseMiddleware) {
          this.requestConfig.responseMiddleware(response)
        }
        return response.data
      })
      .catch((error) => {
        if (this.requestConfig.responseMiddleware) {
          this.requestConfig.responseMiddleware(error)
        }
        throw error
      })
  }

  setHeaders(headers: HeadersInit): GraphQLClient {
    this.requestConfig.headers = headers
    return this
  }

  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(key: string, value: string): GraphQLClient {
    const { headers } = this.requestConfig

    if (headers) {
      // todo what if headers is in nested array form... ?
      //@ts-expect-error todo
      headers[key] = value
    } else {
      this.requestConfig.headers = { [key]: value }
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

// prettier-ignore
interface RawRequestMethod {
  <T, V extends Variables = Variables>(query: string, variables?: V, requestHeaders?: HeadersInit): Promise<GraphQLClientResponse<T>>
  <T, V extends Variables = Variables>(options: RawRequestOptions<V>): Promise<GraphQLClientResponse<T>>
}

// prettier-ignore
type RawRequestMethodArgs<V extends Variables> =
  | [query: string, variables?: V, requestHeaders?: HeadersInit]
  | [RawRequestOptions<V>]

/**
 * Convert the given headers configuration into a plain object.
 */
const resolveHeaders = (headers?: HeadersInit): Record<string, string> => {
  let oHeaders: Record<string, string> = {}
  if (headers) {
    if (headers instanceof Headers) {
      oHeaders = HeadersInstanceToPlainObject(headers)
    } else if (Array.isArray(headers)) {
      headers.forEach(([name, value]) => {
        if (name && value !== undefined) {
          oHeaders[name] = value
        }
      })
    } else {
      oHeaders = headers
    }
  }

  return oHeaders
}

const makeRequest = async <T = unknown, V extends Variables = Variables>(params: {
  url: string
  query: string | string[]
  variables?: V
  headers?: HeadersInit
  operationName?: string
  fetch: Fetch
  method?: HTTPMethodInput
  fetchOptions: FetchOptions
  middleware?: RequestMiddleware<V>
}): Promise<GraphQLClientResponse<T>> => {
  const { query, variables, fetchOptions } = params
  const fetcher = createHttpMethodFetcher(uppercase(params.method ?? `post`))
  const isBatchingQuery = Array.isArray(params.query)
  const response = await fetcher(params)
  const result = await getResult(response, fetchOptions.jsonSerializer ?? defaultJsonSerializer)

  const successfullyReceivedData = Array.isArray(result)
    ? !result.some(({ data }) => !data)
    : Boolean(result.data)

  const successfullyPassedErrorPolicy =
    Array.isArray(result) ||
    !result.errors ||
    (Array.isArray(result.errors) && !result.errors.length) ||
    fetchOptions.errorPolicy === `all` ||
    fetchOptions.errorPolicy === `ignore`

  if (response.ok && successfullyPassedErrorPolicy && successfullyReceivedData) {
    // @ts-expect-error TODO fixme
    const { errors: _, ...rest } = Array.isArray(result) ? result : result
    const data = fetchOptions.errorPolicy === `ignore` ? rest : result
    const dataEnvelope = isBatchingQuery ? { data } : data

    // @ts-expect-error TODO
    return {
      ...dataEnvelope,
      headers: response.headers,
      status: response.status,
    }
  } else {
    const errorResult =
      typeof result === `string`
        ? {
            error: result,
          }
        : result
    throw new ClientError(
      // @ts-expect-error TODO
      { ...errorResult, status: response.status, headers: response.headers },
      { query, variables },
    )
  }
}

const getResult = async (
  response: Response,
  jsonSerializer: JsonSerializer,
): Promise<
  | { data: object; errors: undefined }[]
  | { data: object; errors: undefined }
  | { data: undefined; errors: object }
  | { data: undefined; errors: object[] }
> => {
  const contentType = response.headers.get(CONTENT_TYPE_HEADER)

  if (contentType && isGraphQLContentType(contentType)) {
    return jsonSerializer.parse(await response.text()) as any
  } else {
    return response.text() as any
  }
}

const createHttpMethodFetcher =
  (method: 'GET' | 'POST') =>
  async <V extends Variables>(params: RequestVerbParams<V>) => {
    const { url, query, variables, operationName, fetch, fetchOptions, middleware } = params

    const headers = new Headers(params.headers)
    let queryParams = ``
    let body = undefined

    if (!headers.has(ACCEPT_HEADER)) {
      headers.set(ACCEPT_HEADER, [CONTENT_TYPE_GQL, CONTENT_TYPE_JSON].join(`, `))
    }

    if (method === `POST`) {
      body = createRequestBody(query, variables, operationName, fetchOptions.jsonSerializer)
      if (typeof body === `string` && !headers.has(CONTENT_TYPE_HEADER)) {
        headers.set(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON)
      }
    } else {
      // @ts-expect-error todo needs ADT for TS to understand the different states
      queryParams = buildRequestConfig<V>({
        query,
        variables,
        operationName,
        jsonSerializer: fetchOptions.jsonSerializer ?? defaultJsonSerializer,
      })
    }

    const init: RequestInit = {
      method,
      headers,
      body,
      ...fetchOptions,
    }

    let urlResolved = url
    let initResolved = init
    if (middleware) {
      const result = await Promise.resolve(middleware({ ...init, url, operationName, variables }))
      const { url: urlNew, ...initNew } = result
      urlResolved = urlNew
      initResolved = initNew
    }
    if (queryParams) {
      urlResolved = `${urlResolved}?${queryParams}`
    }
    return await fetch(urlResolved, initResolved)
  }

const createRequestBody = (
  query: string | string[],
  variables?: Variables | Variables[],
  operationName?: string,
  jsonSerializer?: JsonSerializer,
): string => {
  const jsonSerializer_ = jsonSerializer ?? defaultJsonSerializer
  if (!Array.isArray(query)) {
    return jsonSerializer_.stringify({ query, variables, operationName })
  }

  if (typeof variables !== `undefined` && !Array.isArray(variables)) {
    throw new Error(`Cannot create request body with given variable type, array expected`)
  }

  // Batch support
  const payload = query.reduce<{ query: string; variables: Variables | undefined }[]>(
    (acc, currentQuery, index) => {
      acc.push({ query: currentQuery, variables: variables ? variables[index] : undefined })
      return acc
    },
    [],
  )

  return jsonSerializer_.stringify(payload)
}

/**
 * Create query string for GraphQL request
 */
const buildRequestConfig = <V extends Variables>(params: BuildRequestConfigParams<V>): string => {
  if (!Array.isArray(params.query)) {
    const params_ = params as BuildRequestConfigParamsSingle<V>
    const search: string[] = [`query=${encodeURIComponent(cleanQuery(params_.query))}`]

    if (params.variables) {
      search.push(`variables=${encodeURIComponent(params_.jsonSerializer.stringify(params_.variables))}`)
    }

    if (params_.operationName) {
      search.push(`operationName=${encodeURIComponent(params_.operationName)}`)
    }

    return search.join(`&`)
  }

  if (typeof params.variables !== `undefined` && !Array.isArray(params.variables)) {
    throw new Error(`Cannot create query with given variable type, array expected`)
  }

  // Batch support
  const params_ = params as BuildRequestConfigParamsBatch<V>
  const payload = params.query.reduce<{ query: string; variables: string | undefined }[]>(
    (acc, currentQuery, index) => {
      acc.push({
        query: cleanQuery(currentQuery),
        variables: params_.variables ? params_.jsonSerializer.stringify(params_.variables[index]) : undefined,
      })
      return acc
    },
    [],
  )

  return `query=${encodeURIComponent(params_.jsonSerializer.stringify(payload))}`
}

interface RequestVerbParams<V extends Variables = Variables> {
  url: string
  query: string | string[]
  fetch: Fetch
  fetchOptions: FetchOptions
  variables?: V
  headers?: HeadersInit
  operationName?: string
  middleware?: RequestMiddleware<V>
}

type BuildRequestConfigParams<V> = BuildRequestConfigParamsSingle<V> | BuildRequestConfigParamsBatch<V>

type BuildRequestConfigParamsBatch<V> = {
  query: string[]
  variables: V[] | undefined
  operationName: undefined
  jsonSerializer: JsonSerializer
}

type BuildRequestConfigParamsSingle<V> = {
  query: string
  variables: V | undefined
  operationName: string | undefined
  jsonSerializer: JsonSerializer
}
