import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { TypedQueryDocumentNode } from 'graphql'
import type { HasRequiredKeys, IsEmptyObject } from 'type-fest'
import type { HasKeys, Negate } from '../../lib/prelude.js'
import type { SomeData, Variables } from '../graphql-plus/graphql.js'
export type { SomeData, Variables } from '../graphql-plus/graphql.js'

export { type TypedQueryDocumentNode } from 'graphql'

// We default to `any` because otherwise when this type is used as a constraint
// it will reject apparent subtypes. The reason I think has to do with co/contra-variant stuff
// in regards to how function parameters versus return types affect if only wider or narrower
// types are allowed.
export type TypedDocument<$Data extends SomeData = SomeData, $Variables extends Variables = any> =
  | TypedQueryDocumentNode<$Data, $Variables>
  | TypedDocumentString<$Data, $Variables>

export interface TypedDocumentString<$Data = SomeData, $Variables = Variables>
  extends String, DocumentTypeDecoration<$Data, $Variables>
{}

// dprint-ignore
export type HasRequiredVariables<$Document extends TypedDocument> =
  IsEmptyObject<VariablesOf<$Document>> extends true    ? false :
  HasRequiredKeys<VariablesOf<$Document>> extends true  ? true  :
                                                          false

export type VariablesInputKind = VariablesInputKindNone | VariablesInputKindRequired | VariablesInputKindOptional

export type VariablesInputKindNone = 'none'

export type VariablesInputKindRequired = 'required'

export type VariablesInputKindOptional = 'optional'

// dprint-ignore
export type GetVariablesInputKind<$Variables extends Variables> =
  HasRequiredKeys<$Variables> extends true  ? VariablesInputKindRequired :
  HasKeys<$Variables>         extends true  ? VariablesInputKindOptional :
                                              VariablesInputKindNone

export type HasVariables<$Document extends TypedQueryDocumentNode | TypedDocumentString> = Negate<
  IsEmptyObject<VariablesOf<$Document>>
>

// Helpers

// dprint-ignore
export type ResultOf<$Document extends TypedDocument> =
  $Document extends TypedQueryDocumentNode<infer $R, infer _>   ? $R :
  $Document extends TypedDocumentString<infer $R, infer _>      ? $R :
                                                                  never

// dprint-ignore
export type VariablesOf<$Document extends TypedDocument> =
  $Document extends TypedQueryDocumentNode<infer _, infer $V>   ? $V :
  $Document extends TypedDocumentString<infer _, infer $V>       ? $V  :
                                                                  never
