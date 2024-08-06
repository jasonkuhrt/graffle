import type { TypedQueryDocumentNode } from 'graphql'
import type { TypedDocumentString } from '../0_functions/types.js'

export type DocumentInput<D = any, V = any> = string | TypedDocumentString<D, V> | TypedQueryDocumentNode<D, V>

export type OperationNameInput = string
