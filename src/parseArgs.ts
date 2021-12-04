import {
  BatchRequestDocument,
  BatchRequestsOptions,
  RawRequestOptions,
  RequestDocument,
  RequestOptions,
  BatchRequestsExtendedOptions,
  RawRequestExtendedOptions,
  RequestExtendedOptions,
  Variables,
} from './types'
import * as Dom from './types.dom'

export function parseRequestArgs<V = Variables>(
  arg1: RequestDocument | RequestOptions,
  arg2?: V,
  arg3?: Dom.RequestInit['headers']
) {
  return (arg1 as RequestOptions).document
    ? (arg1 as RequestOptions<V>)
    : {
        document: arg1 as RequestDocument,
        variables: arg2,
        requestHeaders: arg3,
        signal: undefined,
      }
}

export function parseRawRequestArgs<V = Variables>(
  arg1: RequestDocument | RawRequestOptions,
  arg2?: V,
  arg3?: Dom.RequestInit['headers']
) {
  return (arg1 as RawRequestOptions).query
    ? (arg1 as RawRequestOptions<V>)
    : {
        query: arg1 as string,
        variables: arg2,
        requestHeaders: arg3,
        signal: undefined,
      }
}

export function parseBatchRequestArgs<V = Variables>(
  arg1: BatchRequestDocument<V>[] | BatchRequestsOptions,
  arg2?: Dom.RequestInit['headers']
) {
  return (arg1 as BatchRequestsOptions).documents
    ? (arg1 as BatchRequestsOptions<V>)
    : {
        documents: arg1 as BatchRequestDocument<V>[],
        requestHeaders: arg2,
        signal: undefined,
      }
}

export function parseRequestExtendedArgs<V = Variables>(
  arg1: string | RequestExtendedOptions,
  arg2?: RequestDocument,
  arg3?: V,
  arg4?: Dom.RequestInit['headers']
) {
  return (arg1 as RequestExtendedOptions).document
    ? (arg1 as RequestExtendedOptions<V>)
    : {
        url: arg1 as string,
        document: arg2 as RequestDocument,
        variables: arg3,
        requestHeaders: arg4,
        signal: undefined,
      }
}

export function parseRawRequestExtendedArgs<V = Variables>(
  arg1: string | RawRequestExtendedOptions,
  arg2?: string,
  arg3?: V,
  arg4?: Dom.RequestInit['headers']
) {
  return (arg1 as RawRequestExtendedOptions).query
    ? (arg1 as RawRequestExtendedOptions<V>)
    : {
        url: arg1 as string,
        query: arg2 as string,
        variables: arg3,
        requestHeaders: arg4,
        signal: undefined,
      }
}

export function parseBatchRequestsExtendedArgs<V = Variables>(
  arg1: string | BatchRequestsExtendedOptions,
  arg2?: BatchRequestDocument<V>[],
  arg3?: Dom.RequestInit['headers']
) {
  return (arg1 as BatchRequestsExtendedOptions).documents
    ? (arg1 as BatchRequestsExtendedOptions<V>)
    : {
        url: arg1 as string,
        documents: arg2 as BatchRequestDocument<V>[],
        requestHeaders: arg3,
        signal: undefined,
      }
}
