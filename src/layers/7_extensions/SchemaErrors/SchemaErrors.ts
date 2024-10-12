import { normalizeRequestToNode } from '../../../lib/grafaid/request.js'
import { injectTypenameOnRootResultFields } from '../../5_request/schemaErrors.js'
import { createExtension } from '../../6_client/extension/extension.js'

// todo?: augment config to include how schema errors should be handled in the output
// todo: manipulate results: 1) schema errors should be thrown or returned (outside envelope) depending on config.
// todo: manipulate the types

export const SchemaErrors = () => {
  return createExtension({
    name: `SchemaErrors`,
    onRequest: async ({ pack }) => {
      const sddm = pack.input.state.config.schemaMap
      if (!sddm) return pack()

      const request = normalizeRequestToNode(pack.input.request)

      // We will mutate query. Assign it back to input for it to be carried forward.
      pack.input.request.query = request.query

      injectTypenameOnRootResultFields({ sddm, request })

      return pack()
    },
  })
}
