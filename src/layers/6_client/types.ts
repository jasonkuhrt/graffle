import type { TypedQueryDocumentNode } from 'graphql'
import type { SomeData } from '../../lib/graphql.js'
import type { TypedDocumentString } from '../0_functions/types.js'
import type { Schema } from '../1_Schema/__.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'
import type { ConfigGetOutputError } from './handleOutput.js'
import type { Config } from './Settings/Config.js'

export type DocumentInput<$Data extends SomeData = SomeData, V = any> =
  | string
  | TypedDocumentString<$Data, V>
  | TypedQueryDocumentNode<$Data, V>

export type OperationNameInput = string

export type Aug<
  $Config extends Config,
  $RootTypeName extends Schema.RootTypeName,
  $SchemaIndex extends Schema.Index,
  $Selection,
> = ConfigGetOutputError<$Config, 'schema'> extends 'throw'
  ? (keyof $Selection & $SchemaIndex['error']['rootResultFields'][$RootTypeName]) extends never ? $Selection
  : $Selection & SelectionSet.TypenameSelection
  : $Selection
