import { createExtension } from '../../layers/6_client/extension/extension.js'
import { normalizeRequestToNode } from '../../lib/grafaid/request.js'
import { decodeResultData } from './decode.js'
import { encodeRequestVariables } from './encode.js'

export const CustomScalars = () =>
  createExtension({
    name: `CustomScalars`,
    // todo: can we make it easier to remove the string interface case?
    // documentNode: true,
    onRequest: (async ({ pack }) => {
      const sddm = pack.input.state.config.schemaMap
      if (!sddm) return pack()

      const request = normalizeRequestToNode(pack.input.request)

      // We will mutate query. Assign it back to input for it to be carried forward.
      pack.input.request.query = request.query

      encodeRequestVariables({ sddm, request })

      const { exchange } = await pack()
      const { unpack } = await exchange()
      const { decode } = await unpack()

      // If there has been an error and we definitely don't have any data, such as when
      // giving an operation name that doesn't match any in the document,
      // then don't attempt to decode.
      const isError = !decode.input.result.data && (decode.input.result.errors?.length ?? 0) > 0

      if (!isError) {
        decodeResultData({
          sddm,
          request,
          data: decode.input.result.data,
        })
      }

      return await decode()
    }),
  })
