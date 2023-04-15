/* eslint-disable */

/**
 * It's possible to use a middleware to pre-process any request or handle raw response.
 */

import { GraphQLClient } from '../src/index.js'
import type { RequestMiddleware } from '../src/types.js'

const endpoint = `https://api.spacex.land/graphql/`

const getAccessToken = () => Promise.resolve(`some special token here`)

{
  /**
   * Request middleware example (set actual auth token to each request):
   */

  const requestMiddleware: RequestMiddleware = async (request) => {
    const token = await getAccessToken()
    return {
      ...request,
      headers: { ...request.headers, 'x-auth-token': token },
    }
  }

  const _client = new GraphQLClient(endpoint, { requestMiddleware })
}
{
  /**
   * It's also possible to use an async function as a request middleware. The resolved data will be passed to the request:
   */

  const requestMiddleware: RequestMiddleware = async (request) => {
    const token = await getAccessToken()
    return {
      ...request,
      headers: { ...request.headers, 'x-auth-token': token },
    }
  }

  const _client = new GraphQLClient(endpoint, { requestMiddleware })
}
{
  /**
   * Response middleware example (log request trace id if error caused):
   */

  // @ts-expect-error TODO export a response middleware type
  const responseMiddleware = (response: Response<unknown>) => {
    if (response.errors) {
      const traceId = response.headers.get(`x-b3-trace-id`) || `unknown`
      console.error(
        `[${traceId}] Request error:
        status ${response.status}
        details: ${response.errors}`
      )
    }
  }

  const _client = new GraphQLClient(endpoint, { responseMiddleware })
}
