import type { OperationTypeNode } from 'graphql'
import { RootTypeName, RootTypeNameToOperationName } from '../../../lib/graphql-plus/graphql.js'
import {
  type OperationType,
  type RootTypeNameMutation,
  type RootTypeNameQuery,
} from '../../../lib/graphql-plus/graphql.js'
import type { FirstNonUnknownNever, IsKeyInObjectOptional, Values } from '../../../lib/prelude.js'
import type { SelectionSet } from '../__.js'

export type OperationName = string

export interface SomeDocumentOperation {
  [k: string]: object
}
export type DocumentObject = {
  query?: Record<string, SelectionSet.AnySelectionSet>
  mutation?: Record<string, SelectionSet.AnySelectionSet>
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

export interface OperationNormalized {
  name: string | null
  type: OperationTypeNode
  rootType: RootTypeName
  selectionSet: SelectionSet.AnySelectionSet
}

export interface DocumentNormalized {
  operations: Record<string, OperationNormalized>
  facts: {
    hasMultipleOperations: boolean
    hasRootType: {
      query: boolean
      mutation: boolean
      subscription: boolean
    }
  }
}

export const createDocumentNormalized = (document: DocumentNormalized) => document

export const createDocumentNormalizedFromRootTypeSelection = (
  rootTypeName: RootTypeName,
  selectionSet: SelectionSet.AnySelectionSet,
) =>
  createDocumentNormalized({
    operations: {
      [defaultOperationName]: {
        name: null,
        type: RootTypeNameToOperationName[rootTypeName],
        rootType: rootTypeName,
        selectionSet,
      },
    },
    facts: {
      hasMultipleOperations: false,
      hasRootType: {
        query: rootTypeName === RootTypeName.Query,
        mutation: rootTypeName === RootTypeName.Mutation,
        subscription: rootTypeName === RootTypeName.Subscription,
      },
    },
  })

export const normalizeOrThrow = (document: DocumentObject): DocumentNormalized => {
  const queryOperations = Object.entries(document.query ?? {}).map((
    [name, selectionSet],
  ): [name: string, OperationNormalized] => [name, {
    name,
    type: RootTypeNameToOperationName[RootTypeName.Query],
    rootType: RootTypeName.Query,
    selectionSet,
  }])
  const mutationOperations = Object.entries(document.mutation ?? {}).map((
    [name, selectionSet],
  ): [name: string, OperationNormalized] => [name, {
    name,
    type: RootTypeNameToOperationName[RootTypeName.Mutation],
    rootType: RootTypeName.Mutation,
    selectionSet,
  }])
  const operations = [
    ...queryOperations,
    ...mutationOperations,
  ]

  // todo test case for this
  const conflictingOperationNames = queryOperations.filter(([_, queryOp]) =>
    mutationOperations.some(([_, mutationOp]) => mutationOp.name === queryOp.name)
  )

  if (conflictingOperationNames.length > 0) {
    throw {
      errors: [
        new Error(`Document has multiple uses of operation name(s): ${conflictingOperationNames.join(`, `)}.`),
      ],
    }
  }

  const hasMultipleOperations = operations.length > 1

  const hasNoOperations = operations.length === 0

  if (hasNoOperations) {
    throw {
      errors: [new Error(`Document has no operations.`)],
    }
  }

  return createDocumentNormalized({
    operations: Object.fromEntries(operations),
    facts: {
      hasMultipleOperations,
      hasRootType: {
        query: queryOperations.length > 0,
        mutation: mutationOperations.length > 0,
        subscription: false,
      },
    },
  })
}

const defaultOperationName = `__default__`

export const getOperationOrThrow = (
  document: DocumentNormalized,
  operationName?: OperationName,
): OperationNormalized => {
  if (!operationName) {
    if (document.facts.hasMultipleOperations) {
      throw new Error(`Must provide operation name if query contains multiple operations.`)
    }
    // The default operation may be named or not so instead of looking it up by name we rely on the fact that
    // there is guaranteed to be exactly one operation in the document based on checks up to this point.
    return Object.values(document.operations)[0]!
  }

  if (!(operationName in document.operations)) {
    throw new Error(`Unknown operation named "${operationName}".`)
  }
  return document.operations[operationName]!
}
