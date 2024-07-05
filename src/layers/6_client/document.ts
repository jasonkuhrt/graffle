import type { MergeExclusive, NonEmptyObject } from 'type-fest'
import { operationTypeNameToRootTypeName } from '../../lib/graphql.js'
import type { IsMultipleKeys } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { Schema } from '../1_Schema/__.js'
import { SelectionSet } from '../3_SelectionSet/__.js'
import type { Context, DocumentObject } from '../3_SelectionSet/encode.js'
import type { ResultSet } from '../4_ResultSet/__.js'
import type { AugmentRootTypeSelectionWithTypename, Config, OrThrowifyConfig, ReturnModeRootType } from './Config.js'

// dprint-ignore
export type DocumentFn<$Config extends Config, $Index extends Schema.Index> =
<$Document extends Document<$Index>>(document: ValidateDocumentOperationNames<NonEmptyObject<$Document>>) =>
  {
    run: <
      $Name extends keyof $Document & string,
      $Params extends (IsMultipleKeys<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
    >(...params: $Params) => Promise<
      ReturnModeRootType<$Config, $Index, ResultSet.Root<GetRootTypeSelection<$Config,$Index,$Document[$Name]>, $Index, GetRootType<$Document[$Name]>>>
    >
    runOrThrow: <
      $Name extends keyof $Document & string,
      $Params extends (IsMultipleKeys<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
    >(...params: $Params) => Promise<
      ReturnModeRootType<OrThrowifyConfig<$Config>, $Index, ResultSet.Root<GetRootTypeSelection<OrThrowifyConfig<$Config>, $Index, $Document[$Name]>, $Index, GetRootType<$Document[$Name]>>>
    >
  }

export const toDocumentString = (
  context: Context,
  document: DocumentObject,
) => {
  return Object.entries(document).map(([operationName, operationDocument]) => {
    const operationType = `query` in operationDocument ? `query` : `mutation`
    const rootType = operationTypeNameToRootTypeName[operationType]
    const rootTypeDocument = (operationDocument as any)[operationType] as SelectionSet.Print.GraphQLObjectSelection // eslint-disable-line

    const schemaRootType = context.schemaIndex[`Root`][rootType]
    if (!schemaRootType) throw new Error(`Schema has no ${rootType} root type`)

    const documentString = SelectionSet.Print.rootTypeSelectionSet(
      context,
      schemaRootType,
      rootTypeDocument,
      operationName,
    )
    return documentString
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
type GetRootTypeSelection<
  $Config extends Config,
  $Index extends Schema.Index,
  $Selection extends object 
> =
  $Selection extends { query: infer U extends object }    ? AugmentRootTypeSelectionWithTypename<$Config, $Index, 'Query', U> : 
  $Selection extends { mutation: infer U extends object } ? AugmentRootTypeSelectionWithTypename<$Config, $Index, 'Mutation', U> :
  never

// dprint-ignore
type GetRootType<$Selection extends object> =
  $Selection extends {query:any}    ? 'Query' : 
  $Selection extends {mutation:any} ? 'Mutation' :
  never
