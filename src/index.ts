export { ClientError } from './types'
import 'cross-fetch/polyfill'

import GraphQLClient from './GraphQLClient'
import rawRequest from './rawRequest'
import request from './request'

export {
  GraphQLClient,
  rawRequest,
  request,
}

export default request
