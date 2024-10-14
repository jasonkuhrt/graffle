import { Errors } from '../../../lib/errors/__.js'
import { normalizeRequestToNode } from '../../../lib/grafaid/request.js'
import { isString } from '../../../lib/prelude.js'
import { isRecordLikeObject } from '../../../lib/prelude.js'
import type { SchemaIndex } from '../../4_generator/generators/SchemaIndex.js'
import { injectTypenameOnRootResultFields } from '../../5_request/schemaErrors.js'
import { createExtension, type Extension } from '../../6_client/extension/extension.js'
import { SchemaDrivenDataMap } from '../CustomScalars/schemaDrivenDataMap/types.js'

// todo?: augment config to include how schema errors should be handled in the output
// todo: manipulate results: 1) schema errors should be thrown or returned (outside envelope) depending on config.
// todo: manipulate the types

export const SchemaErrors = () => {
  return createExtension<SchemaErrorsExtension>({
    name: `SchemaErrors`,
    onRequest: async ({ pack }) => {
      const state = pack.input.state
      const sddm = state.config.schemaMap
      const config = state.config

      if (!sddm || !config.output.errors.schema) return pack()

      const request = normalizeRequestToNode(pack.input.request)

      // We will mutate query. Assign it back to input for it to be carried forward.
      pack.input.request.query = request.query

      injectTypenameOnRootResultFields({ sddm, request })

      const { exchange } = await pack()
      const { unpack } = await exchange()
      const { decode } = await unpack()
      const result = await decode()

      if (result instanceof Error || !result.data) return result

      const schemaErrors: Error[] = []
      for (const [rootFieldName, rootFieldValue] of Object.entries(result.data)) {
        // todo this check would be nice but it doesn't account for aliases right now. To achieve this we would
        // need to have the selection set available to use and then do a costly analysis for all fields that were aliases.
        // So costly that we would probably instead want to create an index of them on the initial encoding step and
        // then make available down stream.
        // const sddmNodeField = sddm.roots[rootTypeName]?.f[rootFieldName]
        // if (!sddmNodeField) return null
        // if (!isPlainObject(rootFieldValue)) return new Error(`Expected result field to be an object.`)
        if (!isRecordLikeObject(rootFieldValue)) continue

        // If __typename is not selected we assume that this is not a result field.
        // The extension makes sure that the __typename would have been selected if it were a result field.
        const __typename = rootFieldValue[`__typename`]
        if (!isString(__typename)) continue

        const sddmNode = sddm.types[__typename]
        const isErrorObject = SchemaDrivenDataMap.isOutputObject(sddmNode) && Boolean(sddmNode.e)
        if (!isErrorObject) continue

        // todo extract message
        // todo allow mapping error instances to schema errors
        schemaErrors.push(new Error(`Failure on field ${rootFieldName}: ${__typename}`))
      }

      const error = (schemaErrors.length === 1)
        ? schemaErrors[0]!
        : schemaErrors.length > 0
        ? new Errors.ContextualAggregateError(`Two or more schema errors in the execution result.`, {}, schemaErrors)
        : null

      if (error) {
        result.errors = [...result.errors ?? [], error as any]
      }

      return result
    },
  })
}

interface SchemaErrorsExtension extends Extension {
  onRequestResult: SchemaErrorsOnRequestResultFn
}

export interface SchemaErrorsOnRequestResultFn extends Extension.Hooks.OnRequestResult {
  // @ts-expect-error untyped params
  return: SchemaErrorsOnRequestResult<this['params']>
}

type SchemaErrorsOnRequestResult<$Params extends Extension.Hooks.OnRequestResult.Params> = ExcludeSchemaErrors<
  $Params['schema'],
  $Params['result']
>

// dprint-ignore
// export type IfConfiguredStripSchemaErrorsFromDataRootField<$Config extends Config, $Index extends SchemaIndex, $Data> =
//   $Config['output']['errors']['schema'] extends false
//     ? $Data
//     : ExcludeSchemaErrors<$Index, $Data>

// dprint-ignore
type ExcludeSchemaErrors<$Schema extends SchemaIndex, $Data> =
  Exclude<
    $Data,
    $Schema['error']['objectsTypename'][keyof $Schema['error']['objectsTypename']]
  >

// // dprint-ignore
// export type IfConfiguredStripSchemaErrorsFromDataRootType<$Config extends Config, $Index extends SchemaIndex, $Data> =
//   & {
//       [$RootFieldName in keyof $Data]: IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data[$RootFieldName]>
//     }
//   & {}
