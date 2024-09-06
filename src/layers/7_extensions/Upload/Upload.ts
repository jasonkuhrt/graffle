import type { StandardScalarVariables } from '../../../lib/graphql.js'
import { createExtension } from '../../5_createExtension/createExtension.js'
import { createBody } from './createBody.js'

/**
 * @see https://github.com/jaydenseric/graphql-multipart-request-spec
 */
export const Upload = createExtension({
  name: `Upload`,
  anyware: async ({ pack }) => {
    // const { pack } = await encode({
    //   using: {
    //     body: (input) => {
    //       const hasUploadScalarVariable = input.variables && isUsingUploadScalar(input.variables)
    //       if (!hasUploadScalarVariable) return

    //       // TODO we can probably get file upload working for in-memory schemas too :)
    //       if (encode.input.transport !== `http`) throw new Error(`Must be using http transport to use "Upload" scalar.`)

    //       return createBody({
    //         query: input.query,
    //         variables: input.variables!,
    //       })
    //     },
    //   },
    // })
    // Remove the content-type header so that fetch sets it automatically upon seeing the body is a FormData instance.
    // @see https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
    // @see https://stackoverflow.com/questions/3508338/what-is-the-boundary-in-multipart-form-data
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
    return await pack({
      // todo rename "using" to "with"
      using: {
        body: (input) => {
          const hasUploadScalarVariable = input.variables && isUsingUploadScalar(input.variables)
          if (!hasUploadScalarVariable) return

          // TODO we can probably get file upload working for in-memory schemas too :)
          if (pack.input.transport !== `http`) throw new Error(`Must be using http transport to use "Upload" scalar.`)

          return createBody({
            query: input.query,
            variables: input.variables!,
          })
        },
      },
      input: {
        ...pack.input,
        headers: {
          'content-type': ``,
        },
      },
    })
  },
})

const isUsingUploadScalar = (_variables: StandardScalarVariables) => {
  return Object.values(_variables).some(_ => _ instanceof Blob)
}
