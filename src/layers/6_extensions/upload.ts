import type { StandardScalarVariables } from '../../lib/graphql.js'
import type { ExecutionInput } from '../../lib/graphqlHTTP.js'
import { createExtension } from '../5_createExtension/createExtension.js'

export const Upload = createExtension({
  name: `Upload`,
  anyware: async ({ pack }) => {
    if (!isUsingUploadScalar(pack.input.variables)) return pack()

    const { exchange } = pack()

    // TODO we can probably get file upload working for in-memory schemas too :)
    if (exchange.input.transport !== `http`) throw new Error(`Must use http transport for uploads.`)

    const headers = new Headers(exchange.input.request.headers)
    headers.append(`content-type`, `multipart/form-data`)

    return exchange({
      ...exchange.input,
      request: {
        ...exchange.input.request,
        body: createUploadBody({
          query: exchange.input.request.body.query,
          variables: exchange.input.request.body.variables,
        }),
        headers,
      },
    })
  },
})

/** @see https://github.com/lynxtaa/awesome-graphql-client/blob/a3ecec2fdd3b72b005268a24b2364dd647dc6efd/packages/awesome-graphql-client/src/AwesomeGraphQLClient.ts#L79 */
const createUploadBody = (input: ExecutionInput): ExecutionInput => {
  return `todo`
}

const isUsingUploadScalar = (variables: StandardScalarVariables) => {
  return `todo`
}
