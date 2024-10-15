import { Errors } from '../../../lib/errors/__.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import { normalizeRequestToNode } from '../../../lib/grafaid/request.js'
import { type ExcludeNullAndUndefined, isString, type StringKeyof } from '../../../lib/prelude.js'
import { isRecordLikeObject } from '../../../lib/prelude.js'
import type { Schema } from '../../1_Schema/__.js'
import type { Select } from '../../2_Select/__.js'
import type { SchemaIndex } from '../../4_generator/generators/SchemaIndex.js'
import { injectTypenameOnRootResultFields } from '../../5_request/schemaErrors.js'
import { createExtension, type Extension } from '../../6_client/extension/extension.js'
import { SchemaDrivenDataMap } from '../CustomScalars/schemaDrivenDataMap/types.js'
import type { Config } from '../Introspection/config.js'

// todo?: augment config to include how schema errors should be handled in the output
// todo: manipulate results: 1) schema errors should be thrown or returned (outside envelope) depending on config.
// todo: manipulate the types

export const SchemaErrors = () => {
  return createExtension<SchemaErrorsExtension>({
    name: `SchemaErrors`,
    onRequest: async ({ pack }) => {
      const state = pack.input.state
      const sddm = state.config.schemaMap

      if (!sddm) return pack()

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

type SchemaErrorsExtension = Extension<{
  onRequestDocumentRootType: OnRequestDocumentRootTypeFn
  onRequestResult: OnRequestResultFn
}>

type OnRequestDocumentRootType<$Params extends Extension.Hooks.OnRequestDocumentRootType.Params> =
  $Params['selectionRootType']

// dprint-ignore
type OnRequestResult<$Params extends Extension.Hooks.OnRequestResult.Params> =
  {
    result: {
      data?:
        | null
        | {
            [$Key in keyof ExcludeNullAndUndefined<$Params['result']['data']>]:
              Exclude<
                ExcludeNullAndUndefined<$Params['result']['data']>[$Key],
                $Params['registeredSchema']['index']['error']['objectsTypename'][keyof $Params['registeredSchema']['index']['error']['objectsTypename']]
              >
          }
    } & Omit<$Params['result'], 'data'>
    registeredSchema: $Params['registeredSchema']
  }

// ExcludeSchemaErrors<
//   $Params['registeredSchema']['index'],
//   $Params['result']
// >

// dprint-ignore
// export type IfConfiguredStripSchemaErrorsFromDataRootField<$Config extends Config, $Index extends SchemaIndex, $Data> =
//   $Config['output']['errors']['schema'] extends false
//     ? $Data
//     : ExcludeSchemaErrors<$Index, $Data>

// // dprint-ignore
// type ExcludeSchemaErrors<$Schema extends SchemaIndex, $Data extends Grafaid.SomeObjectData> =
//   Exclude<
//     $Data,
//     $Schema['error']['objectsTypename'][keyof $Schema['error']['objectsTypename']]
//   >

// // dprint-ignore
// export type IfConfiguredStripSchemaErrorsFromDataRootType<$Config extends Config, $Index extends SchemaIndex, $Data> =
//   & {
//       [$RootFieldName in keyof $Data]: IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data[$RootFieldName]>
//     }
//   & {}

// dprint-ignore
// type IsResultField<
//   $Schema extends SchemaIndex,
//   $RootTypeName extends Grafaid.Schema.RootTypeName,
//   $RootFieldName extends string,
// > =
//   (
//     & $RootFieldName
//     & $Schema['error']['rootResultFields'][$RootTypeName]
//   ) extends never
//     ? false
//     : true

// dprint-ignore
// export type AddTypenameToRootTypeResultFields<
//   $Schema extends SchemaIndex,
//   $RootTypeName extends Schema.RootTypeName,
//   $DocumentNode extends Select,
// > =
//   {
//     [$RootFieldName in StringKeyof<$DocumentNode>]:
//       IsResultField<$Schema, $RootTypeName, $RootFieldName> extends false
//       ? $DocumentNode[$RootFieldName]
//       : $DocumentNode[$RootFieldName] extends Select.SelectAlias.SelectAlias
//         ? AddTypenameToAliasInput<$DocumentNode[$RootFieldName]>
//         : $DocumentNode[$RootFieldName] & TypenameSelection
//   }

// // dprint-ignore
// type AddTypenameToAliasInput<$AliasInput extends Select.SelectAlias.SelectAlias> = {
//   [$Index in keyof $AliasInput]:
//     $AliasInput[$Index] extends Select.SelectAlias.SelectAlias
//       ? [$AliasInput[$Index][0], $AliasInput[$Index][1] & TypenameSelection]
//       : $AliasInput[$Index]
// }

// --------- Boilerplate Types ---------

interface OnRequestDocumentRootTypeFn extends Extension.Hooks.OnRequestDocumentRootType {
  // @ts-expect-error untyped params
  return: OnRequestDocumentRootType<this['params']>
}

interface OnRequestResultFn extends Extension.Hooks.OnRequestResult {
  // @ts-expect-error untyped params
  return: OnRequestResult<this['params']>
}

// --------- Boilerplate Types ---------
