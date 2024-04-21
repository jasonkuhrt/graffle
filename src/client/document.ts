import type { MergeExclusive, NonEmptyObject } from 'type-fest'
import type { IsMultipleKeys } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../Schema/__.js'
import type { Config, ReturnMode } from './Config.js'
import type { ResultSet } from './ResultSet/__.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { DocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

// dprint-ignore
export type DocumentFn<$Config extends Config, $Index extends Schema.Index> =
<$Document extends Document<$Index>>(document: ValidateDocumentOperationNames<NonEmptyObject<$Document>>) =>
  {
    run: <
      $Name extends keyof $Document & string,
      $Params extends (IsMultipleKeys<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
    >(...params: $Params) => Promise<
      ReturnMode<$Config, ResultSet.Root<GetOperation<$Document[$Name]>, $Index, 'Query'>>
    >
  }

export const toDocumentExpression = (
  document: DocumentObject,
) => {
  return Object.entries(document).map(([operationName, operationInput]) => {
    const operationType = `query` in operationInput ? `query` : `mutation`
    const operation = `query` in operationInput ? operationInput[`query`] : operationInput[`mutation`]
    const documentString = SelectionSet.toGraphQLDocumentSelectionSet(operation)
    return `${operationType} ${operationName} ${documentString}`
  }).join(`\n\n`)
}

// dprint-ignore
export type Document<$Index extends Schema.Index> =
  {
    [name: string]:
      $Index['Root']['Query'] extends null    ? { mutation: SelectionSet.Root<$Index, 'Mutation'> } :
      $Index['Root']['Mutation'] extends null ? { query: SelectionSet.Root<$Index, 'Query'> } :
                                                MergeExclusive<
                                                  {
                                                    query: SelectionSet.Root<$Index, 'Query'>
                                                  },
                                                  {
                                                    mutation: SelectionSet.Root<$Index, 'Mutation'>
                                                  }
                                                >
  }

// dprint-ignore
export type ValidateDocumentOperationNames<$Document> =
  // This initial condition checks that the document is not already in an error state.
  // Namely from for example { x: { mutation: { ... }}} where the schema has no mutations.
  // Which is statically caught by the `Document` type. In that case the document type variable
  // no longer functions per normal with regards to keyof utility, not returning exact keys of the object
  // but instead this more general union. Not totally clear _why_, but we have tests covering this...
  string | number extends keyof $Document
    ? $Document
    : keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K } extends never
      ? $Document
      : TSError<'ValidateDocumentOperationNames', `One or more Invalid operation name in document: ${keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K }}`>

// dprint-ignore
type GetOperation<T extends {query:any}|{mutation:any}> =
  T extends {query:infer U}    ? U : 
  T extends {mutation:infer U} ? U :
  never
