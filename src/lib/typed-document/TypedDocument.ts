import type { DocumentTypeDecoration, TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { TypedQueryDocumentNode } from 'graphql'
import type { HasRequiredKeys, IsNever } from 'type-fest'
import { type HasKeys, type IsHasIndexType } from '../../lib/prelude.js'
import type { SomeData, Variables } from '../graphql-plus/graphql.js'

export { type TypedDocumentNode } from '@graphql-typed-document-node/core'

export { type TypedQueryDocumentNode } from 'graphql'

export type { SomeData, Variables } from '../graphql-plus/graphql.js'

// We default to `any` because otherwise when this type is used as a constraint
// it will reject apparent subtypes. The reason I think has to do with co/contra-variant stuff
// in regards to how function parameters versus return types affect if only wider or narrower
// types are allowed.

// dprint-ignore
export type TypedDocument<$Result extends SomeData = SomeData, $Variables extends Variables = any> =
  | TypedQueryDocumentNode<$Result, $Variables>
  | TypedDocumentString   <$Result, $Variables>
  | TypedDocumentNode     <$Result, $Variables>

/**
 * @remarks From package \@graphql-typed-document-node/core in theory but not exported
 * @see https://github.com/dotansimha/graphql-typed-document-node/issues/163.
 */
// dprint-ignore
export interface TypedDocumentString<$Result = SomeData, $Variables = Variables> extends String, DocumentTypeDecoration<$Result, $Variables> {
 // nothing
}

//
//
//
//
// Variables Helpers

// dprint-ignore
export type GetVariablesInputKind<$Variables extends Variables> =
  IsNever<$Variables>         extends true  ? VariablesInputKindNone     :
  IsHasIndexType<$Variables>  extends true  ? VariablesInputKindOptional :
  HasRequiredKeys<$Variables> extends true  ? VariablesInputKindRequired :
  HasKeys<$Variables>         extends true  ? VariablesInputKindOptional :
                                              VariablesInputKindNone

export type VariablesInputKind =
  | VariablesInputKindNone
  | VariablesInputKindRequired
  | VariablesInputKindOptional

export type VariablesInputKindNone = 'none'

export type VariablesInputKindRequired = 'required'

export type VariablesInputKindOptional = 'optional'

//
//
//
//
// Document Helpers

// dprint-ignore
export type ResultOf<$Document extends TypedDocument> =
  $Document extends TypedDocumentNode     <infer $R, infer _>   ? $R :
  $Document extends TypedQueryDocumentNode<infer $R, infer _>   ? $R :
  $Document extends TypedDocumentString   <infer $R, infer _>   ? $R :
                                                                  never

// dprint-ignore
export type VariablesOf<$Document extends TypedDocument> =
  $Document extends TypedDocumentString   <infer _, infer $V>   ? $V :
  $Document extends TypedQueryDocumentNode<infer _, infer $V>   ? $V :
  $Document extends TypedDocumentNode     <infer _, infer $V>   ? $V :
                                                                  never
