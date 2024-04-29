import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { callOrIdentity, HeadersInitToPlainObject } from '../../lib/prelude.js'
import type { BatchRequestDocument, BatchRequestsOptions, BatchResult } from '../functions/batchRequests.js'
import { parseBatchRequestArgs } from '../functions/batchRequests.js'
import { parseRawRequestArgs } from '../functions/rawRequest.js'
import { parseRequestArgs } from '../functions/request.js'
import { analyzeDocument } from '../helpers/analyzeDocument.js'
import { runRequest } from '../helpers/runRequest.js'
import type { RequestDocument, RequestOptions, VariablesAndRequestHeadersArgs } from '../helpers/types.js'
import {
  type GraphQLClientResponse,
  type RawRequestOptions,
  type RequestConfig,
  type Variables,
} from '../helpers/types.js'

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
  rawRequest: RawRequestMethod = async <
    T,
    $Variables extends Variables = Variables,
  >(
    ...args: RawRequestMethodArgs<$Variables>
  ): Promise<GraphQLClientResponse<T>> => {
    const [queryOrOptions, variables, requestHeaders] = args
    const rawRequestOptions = parseRawRequestArgs<$Variables>(
      queryOrOptions,
      variables,
      requestHeaders,
    )
    const {
      headers,
      fetch = globalThis.fetch,
      method = `POST`,
      requestMiddleware,
      responseMiddleware,
      excludeOperationName,
      ...fetchOptions
    } = this.requestConfig
    const { url } = this
    if (rawRequestOptions.signal !== undefined) {
      fetchOptions.signal = rawRequestOptions.signal
    }

    const document = analyzeDocument(
      rawRequestOptions.query,
      excludeOperationName,
    )

    const response = await runRequest({
      url,
      request: {
        _tag: `Single`,
        document,
        variables: rawRequestOptions.variables,
      },
      headers: {
        ...HeadersInitToPlainObject(callOrIdentity(headers)),
        ...HeadersInitToPlainObject(rawRequestOptions.requestHeaders),
      },
      fetch,
      method,
      fetchOptions,
      middleware: requestMiddleware,
    })

    if (responseMiddleware) {
      await responseMiddleware(response, {
        operationName: document.operationName,
        variables,
        url: this.url,
      })
    }

    if (response instanceof Error) {
      throw response
    }

    return response
  }

  /**
   * Send a GraphQL document to the server.
   */
  // dprint-ignore
  async request<T, V extends Variables = Variables>(document: RequestDocument | TypedDocumentNode<T, V>, ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>): Promise<T>
  async request<T, V extends Variables = Variables>(options: RequestOptions<V, T>): Promise<T>
  async request<T, V extends Variables = Variables>(
    documentOrOptions:
      | RequestDocument
      | TypedDocumentNode<T, V>
      | RequestOptions<V>,
    ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
  ): Promise<T> {
    const [variables, requestHeaders] = variablesAndRequestHeaders
    const requestOptions = parseRequestArgs(
      documentOrOptions,
      variables,
      requestHeaders,
    )

    const {
      headers,
      fetch = globalThis.fetch,
      method = `POST`,
      requestMiddleware,
      responseMiddleware,
      excludeOperationName,
      ...fetchOptions
    } = this.requestConfig
    const { url } = this
    if (requestOptions.signal !== undefined) {
      fetchOptions.signal = requestOptions.signal
    }

    const analyzedDocument = analyzeDocument(
      requestOptions.document,
      excludeOperationName,
    )

    const response = await runRequest({
      url,
      request: {
        _tag: `Single`,
        document: analyzedDocument,
        variables: requestOptions.variables,
      },
      headers: {
        ...HeadersInitToPlainObject(callOrIdentity(headers)),
        ...HeadersInitToPlainObject(requestOptions.requestHeaders),
      },
      fetch,
      method,
      fetchOptions,
      middleware: requestMiddleware,
    })

    if (responseMiddleware) {
      await responseMiddleware(response, {
        operationName: analyzedDocument.operationName,
        variables: requestOptions.variables,
        url: this.url,
      })
    }

    if (response instanceof Error) {
      throw response
    }

    return response.data
  }

  /**
   * Send GraphQL documents in batch to the server.
   */
  async batchRequests<
    $BatchResult extends BatchResult,
    $Variables extends Variables = Variables,
  >(
    documents: BatchRequestDocument<$Variables>[],
    requestHeaders?: HeadersInit,
  ): Promise<$BatchResult>
  async batchRequests<
    $BatchResult extends BatchResult,
    $Variables extends Variables = Variables,
  >(options: BatchRequestsOptions<$Variables>): Promise<$BatchResult>
  async batchRequests<
    $BatchResult extends BatchResult,
    $Variables extends Variables = Variables,
  >(
    documentsOrOptions:
      | BatchRequestDocument<$Variables>[]
      | BatchRequestsOptions<$Variables>,
    requestHeaders?: HeadersInit,
  ): Promise<$BatchResult> {
    const batchRequestOptions = parseBatchRequestArgs<$Variables>(
      documentsOrOptions,
      requestHeaders,
    )
    const { headers, excludeOperationName, ...fetchOptions } = this.requestConfig

    if (batchRequestOptions.signal !== undefined) {
      fetchOptions.signal = batchRequestOptions.signal
    }

    const analyzedDocuments = batchRequestOptions.documents.map(
      ({ document }) => analyzeDocument(document, excludeOperationName),
    )
    const expressions = analyzedDocuments.map(({ expression }) => expression)
    const hasMutations = analyzedDocuments.some(({ isMutation }) => isMutation)
    const variables = batchRequestOptions.documents.map(
      ({ variables }) => variables,
    )

    const response = await runRequest({
      url: this.url,
      request: {
        _tag: `Batch`,
        operationName: undefined,
        query: expressions,
        hasMutations,
        variables,
      },
      headers: {
        ...HeadersInitToPlainObject(callOrIdentity(headers)),
        ...HeadersInitToPlainObject(batchRequestOptions.requestHeaders),
      },
      fetch: this.requestConfig.fetch ?? globalThis.fetch,
      method: this.requestConfig.method || `POST`,
      fetchOptions,
      middleware: this.requestConfig.requestMiddleware,
    })

    if (this.requestConfig.responseMiddleware) {
      await this.requestConfig.responseMiddleware(response, {
        operationName: undefined,
        variables,
        url: this.url,
      })
    }

    if (response instanceof Error) {
      throw response
    }

    return response.data
  }

  setHeaders(headers: HeadersInit): this {
    this.requestConfig.headers = headers
    return this
  }

  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(key: string, value: string): this {
    const { headers } = this.requestConfig

    if (headers) {
      // todo what if headers is in nested array form... ?
      // @ts-expect-error todo
      headers[key] = value
    } else {
      this.requestConfig.headers = { [key]: value }
    }

    return this
  }

  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(value: string): this {
    this.url = value
    return this
  }
}

interface RawRequestMethod {
  <T, V extends Variables = Variables>(
    query: string,
    variables?: V,
    requestHeaders?: HeadersInit,
  ): Promise<GraphQLClientResponse<T>>
  <T, V extends Variables = Variables>(options: RawRequestOptions<V>): Promise<
    GraphQLClientResponse<T>
  >
}

type RawRequestMethodArgs<V extends Variables> =
  | [query: string, variables?: V, requestHeaders?: HeadersInit]
  | [RawRequestOptions<V>]
