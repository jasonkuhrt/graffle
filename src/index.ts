import {
  type BatchRequestDocument,
  type BatchRequestsExtendedOptions,
  type BatchRequestsOptions,
} from './functions/batchRequests.js'
import { RequestExtendedOptions } from './functions/request.js'
import { request } from './functions/request.js'
import type { GraphQLResponse, RequestMiddleware, ResponseMiddleware } from './types.js'
import { ClientError, RawRequestOptions, RequestDocument, RequestOptions, Variables } from './types.js'
export { GraphQLClient } from './classes/GraphQLClient.js'
export { batchRequests } from './functions/batchRequests.js'
export { gql } from './functions/gql.js'
export { rawRequest } from './functions/rawRequest.js'
export { resolveRequestDocument } from './helpers/resolveRequestDocument.js'
export { GraphQLWebSocketClient } from './lib/graphql-ws.js'
export {
  BatchRequestDocument,
  BatchRequestsExtendedOptions,
  BatchRequestsOptions,
  ClientError,
  GraphQLResponse,
  RawRequestOptions,
  request,
  RequestDocument,
  RequestExtendedOptions,
  RequestMiddleware,
  RequestOptions,
  ResponseMiddleware,
  Variables,
}
export default request
