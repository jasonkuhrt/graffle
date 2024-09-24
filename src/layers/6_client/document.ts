import type { UnionToTuple } from 'type-fest'
import {
  type OperationType,
  operationTypeNameToRootTypeName,
  OperationTypes,
  type RootTypeNameMutation,
  type RootTypeNameQuery,
} from '../../lib/graphql.js'
import type { FirstNonUnknownNever, IsKeyInObjectOptional, IsTupleMultiple, Values } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import { SelectionSet } from '../3_SelectionSet/__.js'
import type { Context, DocumentObject } from '../3_SelectionSet/encode.js'
import type { ResultSet } from '../4_ResultSet/__.js'
import type { ResolveOutputReturnRootType } from './handleOutput.js'
import type { AddTypenameToSelectedRootTypeResultFields, Config } from './Settings/Config.js'

type OperationName = string

interface SomeDocumentOperation {
  [k: string]: object
}

interface SomeDocument {
  mutation?: SomeDocumentOperation
  query?: SomeDocumentOperation
}

// --- Utility Types To Work With Documents ---

// // dprint-ignore
// type IsHasMultipleOperations<$Document extends SomeDocument> =
//   All<[
//     IsHasMultipleKeys<$Document[OperationType.Query]>,
//     IsHasMultipleKeys<$Document[OperationType.Mutation]>,
//   ]>

// dprint-ignore
type GetOperationNames<$Document extends SomeDocument> = Values<
  {
    [$OperationType in keyof $Document]: keyof $Document[$OperationType] & string
  }
>

// dprint-ignore
type GetRootTypeNameOfOperation<$Document extends SomeDocument, $Name extends OperationName> =
  IsKeyInObjectOptional<$Document[OperationType.Mutation], $Name> extends true  ? RootTypeNameMutation :
  IsKeyInObjectOptional<$Document[OperationType.Query], $Name> extends true     ? RootTypeNameQuery    :
                                                                                  never

// dprint-ignore
type GetOperation<$Document extends SomeDocument, $Name extends string> =
  FirstNonUnknownNever<[
    // @ts-expect-error could be unknown
    $Document[OperationType.Mutation][$Name],
    // @ts-expect-error could be unknown
    $Document[OperationType.Query][$Name]
  ]>

// -- Interface --
//
// dprint-ignore
export type DocumentRunner<
  $$Config extends Config,
  $$Index extends Schema.Index,
  $$Document extends SomeDocument,
  $$Name extends GetOperationNames<$$Document> = GetOperationNames<$$Document>
> = {
  run: <
    $Name extends $$Name,
    $Params extends (IsTupleMultiple<UnionToTuple<$$Name>> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
  >(...params: $Params) =>
    Promise<
      ResolveOutputReturnRootType<
        $$Config,
        $$Index,
        ResultSet.Root<
          AddTypenameToSelectedRootTypeResultFields<
            $$Config,
            $$Index,
            GetRootTypeNameOfOperation<$$Document, $Name>,
            GetOperation<$$Document, $Name>
          >,
          $$Index,
          GetRootTypeNameOfOperation<$$Document, $Name>
        >
      >
    >
}

export const toDocumentString = (
  context: Context,
  document: DocumentObject,
) => {
  const operations = [
    ...(Object.entries(document.query || {}).map(([operationName, selectionSet]) => ({
      operationName,
      selectionSet,
      operationType: OperationTypes.query,
    }))),
    ...(Object.entries(document.mutation || {}).map(([operationName, selectionSet]) => ({
      operationName,
      selectionSet,
      operationType: OperationTypes.mutation,
    }))),
  ]

  return operations.map(({ operationName, selectionSet, operationType }) => {
    const rootType = operationTypeNameToRootTypeName[operationType]
    const rootTypeDocument = selectionSet

    const schemaRootType = context.schemaIndex[`Root`][rootType]
    if (!schemaRootType) throw new Error(`Schema has no ${rootType} root type`)

    const documentString = SelectionSet.Print.resolveRootType(
      context,
      schemaRootType,
      rootTypeDocument,
      operationName,
    )

    console.log(documentString)
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
