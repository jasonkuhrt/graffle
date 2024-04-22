import { ClientError } from '../raw/classes/ClientError.js'
import {
  type BatchRequestDocument,
  type BatchRequestsExtendedOptions,
  type BatchRequestsOptions,
} from '../raw/functions/batchRequests.js'
import type { RequestExtendedOptions } from '../raw/functions/request.js'
import { request } from '../raw/functions/request.js'
import type { GraphQLResponse, RequestMiddleware, ResponseMiddleware } from '../raw/helpers/types.js'
import type { RawRequestOptions, RequestDocument, RequestOptions, Variables } from '../raw/helpers/types.js'
export { GraphQLClient } from '../raw/classes/GraphQLClient.js'
export { batchRequests } from '../raw/functions/batchRequests.js'
export { gql } from '../raw/functions/gql.js'
export { rawRequest } from '../raw/functions/rawRequest.js'
export { analyzeDocument } from '../raw/helpers/analyzeDocument.js'
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
