import type { TypedQueryDocumentNode } from 'graphql'

export type DocumentInput<D = any, V = any> = string | TypedQueryDocumentNode<D, V>

export type OperationNameInput = string
