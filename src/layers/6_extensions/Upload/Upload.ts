import type { StandardScalarVariables } from '../../../lib/graphql.js'
import type { ExecutionInput } from '../../../lib/graphqlHTTP.js'
import { createExtension } from '../../5_createExtension/createExtension.js'
import extractFiles from './extractFiles.js'

/**
 * @see https://github.com/jaydenseric/graphql-multipart-request-spec
 */
export const Upload = createExtension({
  name: `Upload`,
  anyware: async ({ encode }) => {
    const { pack } = await encode({
      using: {
        body: (input) => {
          if (!(input.variables && isUsingUploadScalar(input.variables))) return

          // TODO we can probably get file upload working for in-memory schemas too :)
          if (encode.input.transport !== `http`) throw new Error(`Must use http transport for uploads.`)

          return createUploadBody({
            query: input.query,
            variables: input.variables,
          })
        },
      },
    })

    // const { exchange } = await pack()
    // if (exchange.input.transport !== `http`) return exchange()

    // return await exchange({
    //   input: {
    //     ...exchange.input,
    //     request: {
    //       ...exchange.input.request,
    //       headers: {},
    //     },
    //   },
    // })
  },
})

const createUploadBody = (input: ExecutionInput): FormData => {
  const { clone, files } = extractFiles(
    { query: input.query, variables: input.variables },
    (value: unknown) => value instanceof Blob,
    ``,
  )
  const operationJSON = JSON.stringify(clone)
  console.log(clone, files)

  if (files.size === 0) throw new Error(`Not an upload request.`)

  const form = new FormData()

  form.append(`operations`, operationJSON)

  const map: Record<string, string[]> = {}
  let i = 0
  for (const paths of files.values()) {
    map[++i] = paths
  }
  form.append(`map`, JSON.stringify(map))

  i = 0
  for (const file of files.keys()) {
    form.append(`${++i}`, file)
  }

  return form
}

const isUsingUploadScalar = (variables: StandardScalarVariables) => {
  return true // todo
}
