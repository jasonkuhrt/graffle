import type { TypedQueryDocumentNode } from 'graphql'
import type { SomeData } from '../../lib/graphql.js'
import type { TypedDocumentString } from '../0_functions/types.js'

export type DocumentInput<$Data extends SomeData = SomeData, V = any> =
  | string
  | TypedDocumentString<$Data, V>
  | TypedQueryDocumentNode<$Data, V>

export type OperationNameInput = string
