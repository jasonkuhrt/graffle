import { GraphQLClient } from '../classes/GraphQLClient.js'
import type {
  GraphQLClientResponse,
  RawRequestOptions,
  Variables,
  VariablesAndRequestHeadersArgs,
} from '../helpers/types.js'

/**
 * Send a GraphQL Query to the GraphQL server for execution.
 */
export const rawRequest: RawRequest = async <T, V extends Variables>(
  ...args: RawRequestArgs<V>
): Promise<GraphQLClientResponse<T>> => {
  const [urlOrOptions, query, ...variablesAndRequestHeaders] = args
  const requestOptions = parseRawRequestExtendedArgs<V>(urlOrOptions, query, ...variablesAndRequestHeaders)
  const client = new GraphQLClient(requestOptions.url)
  return client.rawRequest<T, V>({
    ...requestOptions,
  })
}

// dprint-ignore
interface RawRequest {
  <T, V extends Variables = Variables>(url: string, query: string, ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>): Promise<GraphQLClientResponse<T>>
  <T, V extends Variables = Variables>(options: RawRequestExtendedOptions<V>): Promise<GraphQLClientResponse<T>>
}

// dprint-ignore
type RawRequestArgs<V extends Variables> = 
  | [options: RawRequestExtendedOptions<V>, query?: string, ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>]
  | [url: string,                           query?: string, ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>]

export const parseRawRequestExtendedArgs = <V extends Variables = Variables>(
  urlOrOptions: string | RawRequestExtendedOptions<V>,
  query?: string,
  ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
): RawRequestExtendedOptions<V> => {
  const [variables, requestHeaders] = variablesAndRequestHeaders
  return typeof urlOrOptions === `string`
    ? ({
      url: urlOrOptions,
      query: query as string,
      variables,
      requestHeaders,
      signal: undefined,
    } as unknown as RawRequestExtendedOptions<V>)
    : urlOrOptions
}

export type RawRequestExtendedOptions<V extends Variables = Variables> = {
  url: string
} & RawRequestOptions<V>

export const parseRawRequestArgs = <V extends Variables = Variables>(
  queryOrOptions: string | RawRequestOptions<V>,
  variables?: V,
  requestHeaders?: HeadersInit,
): RawRequestOptions<V> => {
  return (queryOrOptions as RawRequestOptions<V>).query
    ? (queryOrOptions as RawRequestOptions<V>)
    : ({
      query: queryOrOptions as string,
      variables: variables,
      requestHeaders: requestHeaders,
      signal: undefined,
    } as unknown as RawRequestOptions<V>)
}
