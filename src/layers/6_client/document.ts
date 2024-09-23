import {
  operationTypeNameToRootTypeName,
  type RootTypeNameMutation,
  type RootTypeNameQuery,
} from '../../lib/graphql.js'
import type { IsMultipleKeys, Values } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import { SelectionSet } from '../3_SelectionSet/__.js'
import type { Context, DocumentObject } from '../3_SelectionSet/encode.js'
import type { ResultSet } from '../4_ResultSet/__.js'
import type { ResolveOutputReturnRootType } from './handleOutput.js'
import type { AddTypenameToSelectedRootTypeResultFields, Config } from './Settings/Config.js'

interface SomeDocument {
  mutations?: Record<string, object>
  queries?: Record<string, object>
}

// dprint-ignore
type HasMultipleOperations<$Document extends SomeDocument> =
  IsMultipleKeys<
    & ('mutations' extends keyof $Document ? $Document['mutations'] : {})
    & ('queries' extends keyof $Document ? $Document['queries'] : {})
  >

// dprint-ignore
type GetOperationNames<$Document extends SomeDocument> = Values<
  {
    [$OperationType in keyof $Document]: keyof $Document[$OperationType] & string
  }
>

// dprint-ignore
type GetRootTypeName<$Document extends SomeDocument, $Name extends string> =
  $Name extends keyof $Document['mutations'] ? RootTypeNameMutation :
  $Name extends keyof $Document['queries'] ? RootTypeNameQuery :
  never

// dprint-ignore
type GetOperation<$Document extends SomeDocument, $Name extends string> =
  $Name extends keyof $Document['mutations'] ? $Document['mutations'][$Name] :
  $Name extends keyof $Document['queries'] ? $Document['queries'][$Name] :
  never

// dprint-ignore
export type DocumentRunner2<$Config extends Config, $Index extends Schema.Index, $Document extends SomeDocument> = {
  run: <
    $Name extends GetOperationNames<$Document>,
    $Params extends (HasMultipleOperations<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
  >(...params: $Params) =>
    Promise<
      ResolveOutputReturnRootType<
        $Config,
        $Index,
        ResultSet.Root<
          AddTypenameToSelectedRootTypeResultFields<
            $Config,
            $Index,
            GetRootTypeName<$Document, $Name>,
            GetOperation<$Document, $Name>
          >,
          $Index,
          GetRootTypeName<$Document, $Name>
        >
      >
    >
}

// ... the below is legacy prior to generating the document signature

export const toDocumentString = (
  context: Context,
  document: DocumentObject,
) => {
  return Object.entries(document).map(([operationName, operationDocument]) => {
    const operationType = `query` in operationDocument ? `query` : `mutation`
    const rootType = operationTypeNameToRootTypeName[operationType]
    const rootTypeDocument = (operationDocument as any)[operationType] as SelectionSet.Print.GraphQLObjectSelection

    const schemaRootType = context.schemaIndex[`Root`][rootType]
    if (!schemaRootType) throw new Error(`Schema has no ${rootType} root type`)

    const documentString = SelectionSet.Print.resolveRootType(
      context,
      schemaRootType,
      rootTypeDocument,
      operationName,
    )
    return documentString
  }).join(`\n\n`)
}

// todo maybe bring back these validations, but need to understand the perf impact

// // dprint-ignore
// export type Document<$Index extends Schema.Index> =
//   {
//     [name: string]:
//       $Index['Root']['Query'] extends null    ? { mutation: SelectionSet.Root<$Index, 'Mutation'> } :
//       $Index['Root']['Mutation'] extends null ? { query: SelectionSet.Root<$Index, 'Query'> } :
//                                                 MergeExclusive<
//                                                   {
//                                                     query: SelectionSet.Root<$Index, 'Query'>
//                                                   },
//                                                   {
//                                                     mutation: SelectionSet.Root<$Index, 'Mutation'>
//                                                   }
//                                                 >
//   }

// // dprint-ignore
// export type ValidateDocumentOperationNames<$Document> =
//   // This initial condition checks that the document is not already in an error state.
//   // Namely from for example { x: { mutation: { ... }}} where the schema has no mutations.
//   // Which is statically caught by the `Document` type. In that case the document type variable
//   // no longer functions per normal with regards to keyof utility, not returning exact keys of the object
//   // but instead this more general union. Not totally clear _why_, but we have tests covering this...
//   string | number extends keyof $Document
//     ? $Document
//     : keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K } extends never
//       ? $Document
//       : TSError<'ValidateDocumentOperationNames', `One or more Invalid operation name in document: ${keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K }}`>
