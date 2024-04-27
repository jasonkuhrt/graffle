import { GraphQLClient } from '../classes/GraphQLClient.js'
import type { RequestDocument, Variables } from '../helpers/types.js'

export type BatchRequestDocument<V extends Variables = Variables> = {
  document: RequestDocument
  variables?: V
}

export interface BatchRequestsOptions<V extends Variables = Variables> {
  documents: BatchRequestDocument<V>[]
  requestHeaders?: HeadersInit
  signal?: RequestInit['signal']
}

export interface BatchRequestsExtendedOptions<V extends Variables = Variables> extends BatchRequestsOptions<V> {
  url: string
}

/**
 * Send a batch of GraphQL Document to the GraphQL server for execution.
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
export const batchRequests: BatchRequests = async (...args: BatchRequestsArgs) => {
  const params = parseBatchRequestsArgsExtended(args)
  const client = new GraphQLClient(params.url)
  return client.batchRequests(params)
}

type BatchRequestsArgs =
  | [url: string, documents: BatchRequestDocument[], requestHeaders?: HeadersInit]
  | [options: BatchRequestsExtendedOptions]

export const parseBatchRequestsArgsExtended = (args: BatchRequestsArgs): BatchRequestsExtendedOptions => {
  if (args.length === 1) {
    return args[0]
  } else {
    return {
      url: args[0],
      documents: args[1],
      requestHeaders: args[2],
      signal: undefined,
    }
  }
}

// dprint-ignore
interface BatchRequests {
  <T extends BatchResult, V extends Variables = Variables>(url: string, documents: BatchRequestDocument<V>[], requestHeaders?: HeadersInit): Promise<T>
  <T extends BatchResult, V extends Variables = Variables>(options: BatchRequestsExtendedOptions<V>): Promise<T>
}

export type BatchResult = [Result, ...Result[]]

interface Result<Data extends object = object> {
  data: Data
}

export const parseBatchRequestArgs = <V extends Variables = Variables>(
  documentsOrOptions: BatchRequestDocument<V>[] | BatchRequestsOptions<V>,
  requestHeaders?: HeadersInit,
): BatchRequestsOptions<V> => {
  // eslint-disable-next-line
  return (documentsOrOptions as BatchRequestsOptions<V>).documents
    ? (documentsOrOptions as BatchRequestsOptions<V>)
    : {
      documents: documentsOrOptions as BatchRequestDocument<V>[],
      requestHeaders: requestHeaders,
      signal: undefined,
    }
}
