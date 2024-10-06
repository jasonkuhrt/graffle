import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
export interface TypedDocumentString<TResult = Record<string, any>, TVariables = Record<string, any>>
  extends String, DocumentTypeDecoration<TResult, TVariables>
{}
