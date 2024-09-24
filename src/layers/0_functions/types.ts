import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import type { DocumentNode, TypedQueryDocumentNode } from 'graphql'
import type { HasRequiredKeys, IsEmptyObject } from 'type-fest'
import type { StandardScalarVariables } from '../../lib/graphql.js'
import type { Negate } from '../../lib/prelude.js'
import type { DocumentInput, OperationNameInput } from '../6_client/types.js'

export type BaseInput_ = {
  document: DocumentNode | string
  operationName?: OperationNameInput
  variables?: StandardScalarVariables
}

// dprint-ignore
export type BaseInput<$Document extends DocumentInput = DocumentInput> =
  & {
      document: $Document
      operationName?: OperationNameInput
    }
  & NoInfer<(
    $Document extends TypedDocumentString<any,any>
        ? GetVariablesInputFromString<Exclude<$Document,TypedQueryDocumentNode>>
        : string extends $Document
          ? { variables?: StandardScalarVariables }
          : GetVariablesInputFromDocumentNode<Exclude<$Document, TypedDocumentString>>
    )>

// dprint-ignore
type GetVariablesInputFromString<$Document extends TypedDocumentString> =
  HasVariables<$Document> extends true
    ? HasRequiredKeys<VariablesOf<$Document>> extends true
      ? { variables: VariablesOf<$Document> }
      : { variables?: VariablesOf<$Document> }
    : {}

// dprint-ignore
type GetVariablesInputFromDocumentNode<$Document extends TypedQueryDocumentNode> =
  HasVariables<$Document> extends true
    ? HasRequiredKeys<VariablesOf<$Document>> extends true
      ? { variables: VariablesOf<$Document> }
      : { variables?: VariablesOf<$Document> }
    : {}

type HasVariables<$Document extends TypedQueryDocumentNode | TypedDocumentString> = Negate<
  IsEmptyObject<VariablesOf<$Document>>
>

// dprint-ignore
type VariablesOf<$Document extends TypedQueryDocumentNode | TypedDocumentString> =
  $Document extends TypedQueryDocumentNode<infer _, infer V>
    ? V
    : $Document extends TypedDocumentString<infer _, infer V>
      ? V
      : never

// TODO open issue asking for core library to expose this type.
export interface TypedDocumentString<TResult = Record<string, any>, TVariables = Record<string, any>>
  extends String, DocumentTypeDecoration<TResult, TVariables>
{}
