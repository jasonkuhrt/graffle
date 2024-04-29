import { ClientError } from '../legacy/classes/ClientError.js'
import {
  type BatchRequestDocument,
  type BatchRequestsExtendedOptions,
  type BatchRequestsOptions,
} from '../legacy/functions/batchRequests.js'
import type { RequestExtendedOptions } from '../legacy/functions/request.js'
import { request } from '../legacy/functions/request.js'
import type { GraphQLResponse, RequestMiddleware, ResponseMiddleware } from '../legacy/helpers/types.js'
import type { RawRequestOptions, RequestDocument, RequestOptions, Variables } from '../legacy/helpers/types.js'
export { GraphQLClient } from '../legacy/classes/GraphQLClient.js'
export { batchRequests } from '../legacy/functions/batchRequests.js'
export { gql } from '../legacy/functions/gql.js'
export { rawRequest } from '../legacy/functions/rawRequest.js'
export { analyzeDocument } from '../legacy/helpers/analyzeDocument.js'
export {
  BatchRequestDocument,
  BatchRequestsExtendedOptions,
  BatchRequestsOptions,
  ClientError,
  GraphQLResponse,
  type RawRequestOptions,
  request,
  type RequestDocument,
  type RequestExtendedOptions,
  RequestMiddleware,
  type RequestOptions,
  ResponseMiddleware,
  type Variables,
}
export default request

export { RequestInitExtended } from '../legacy/helpers/types.js'
