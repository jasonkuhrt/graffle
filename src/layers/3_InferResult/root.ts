import { type ExcludeNull } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { Object } from './Object.js'

export type RootViaObject<
  $SelectionSet,
  $Schema extends SchemaIndex,
  $RootType extends Schema.Output.RootType,
> = Root<
  $SelectionSet,
  $Schema,
  $RootType['fields']['__typename']['type']['type']
>

// dprint-ignore
export type Query<$SelectionSet, $Schema extends SchemaIndex> =
  Root<$SelectionSet, $Schema, 'Query'>

// dprint-ignore
export type Mutation<$SelectionSet, $Schema extends SchemaIndex> =
  Root<$SelectionSet, $Schema, 'Mutation'>

// dprint-ignore
export type Subscription<$SelectionSet, $Schema extends SchemaIndex> =
  Root<$SelectionSet, $Schema, 'Subscription'>

export type Root<
  $SelectionSet,
  $Schema extends SchemaIndex,
  $RootTypeName extends Schema.RootTypeName,
> = Object<$SelectionSet, $Schema, ExcludeNull<$Schema['Root'][$RootTypeName]>>
