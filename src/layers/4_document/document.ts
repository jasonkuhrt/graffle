import { type OperationType, type RootTypeNameMutation, type RootTypeNameQuery } from '../../lib/graphql.js'
import type { FirstNonUnknownNever, IsKeyInObjectOptional, Values } from '../../lib/prelude.js'

export type OperationName = string

export interface SomeDocumentOperation {
  [k: string]: object
}

export interface SomeDocument {
  mutation?: SomeDocumentOperation
  query?: SomeDocumentOperation
}

// // dprint-ignore
// type IsHasMultipleOperations<$Document extends SomeDocument> =
//   All<[
//     IsHasMultipleKeys<$Document[OperationType.Query]>,
//     IsHasMultipleKeys<$Document[OperationType.Mutation]>,
//   ]>

// dprint-ignore
export type GetOperationNames<$Document extends SomeDocument> = Values<
  {
    [$OperationType in keyof $Document]: keyof $Document[$OperationType] & string
  }
>

// dprint-ignore
export type GetRootTypeNameOfOperation<$Document extends SomeDocument, $Name extends OperationName> =
  IsKeyInObjectOptional<$Document[OperationType.Mutation], $Name> extends true  ? RootTypeNameMutation :
  IsKeyInObjectOptional<$Document[OperationType.Query], $Name> extends true     ? RootTypeNameQuery    :
                                                                                  never

// dprint-ignore
export type GetOperation<$Document extends SomeDocument, $Name extends string> =
  FirstNonUnknownNever<[
    // @ts-expect-error could be unknown
    $Document[OperationType.Mutation][$Name],
    // @ts-expect-error could be unknown
    $Document[OperationType.Query][$Name]
  ]>
