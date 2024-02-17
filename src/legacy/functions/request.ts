import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { GraphQLClient } from '../classes/GraphQLClient.js'
import type { RequestDocument, RequestOptions, Variables, VariablesAndRequestHeadersArgs } from '../helpers/types.js'

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
// REMARKS: In order to have autocomplete for options work make it the first overload. If not
// then autocomplete will instead show the various methods for a string, which is not what we want.

// dprint-ignore
export async function request<T, V extends Variables = Variables>(options: RequestExtendedOptions<V, T>): Promise<T>
// dprint-ignore
export async function request<T, V extends Variables = Variables>(url: string, document: RequestDocument | TypedDocumentNode<T, V>, ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>): Promise<T>
// dprint-ignore
// eslint-disable-next-line
export async function request<T, V extends Variables = Variables>(urlOrOptions: string | RequestExtendedOptions<V, T>, document?: RequestDocument | TypedDocumentNode<T, V>, ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>): Promise<T> {
  const requestOptions = parseRequestExtendedArgs<V>(urlOrOptions, document, ...variablesAndRequestHeaders)
  const client = new GraphQLClient(requestOptions.url)
  return client.request<T, V>({
    ...requestOptions,
  })
}

export const parseRequestArgs = <V extends Variables = Variables>(
  documentOrOptions: RequestDocument | RequestOptions<V>,
  variables?: V,
  requestHeaders?: HeadersInit,
): RequestOptions<V> => {
  return (documentOrOptions as RequestOptions<V>).document
    ? (documentOrOptions as RequestOptions<V>)
    : ({
      document: documentOrOptions as RequestDocument,
      variables: variables,
      requestHeaders: requestHeaders,
      signal: undefined,
    } as unknown as RequestOptions<V>)
}

export type RequestExtendedOptions<V extends Variables = Variables, T = unknown> = {
  url: string
} & RequestOptions<V, T>

export const parseRequestExtendedArgs = <V extends Variables = Variables>(
  urlOrOptions: string | RequestExtendedOptions<V>,
  document?: RequestDocument,
  ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
): RequestExtendedOptions<V> => {
  const [variables, requestHeaders] = variablesAndRequestHeaders
  return typeof urlOrOptions === `string`
    ? ({
      url: urlOrOptions,
      document: document as RequestDocument,
      variables,
      requestHeaders,
      signal: undefined,
    } as unknown as RequestExtendedOptions<V>)
    : urlOrOptions
}
