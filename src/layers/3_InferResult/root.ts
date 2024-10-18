import { type ExcludeNull } from '../../lib/prelude.js'
import type { SchemaKit } from '../1_Schema/__.js'
import type { Schema } from '../4_generator/generators/Schema.js'
import type { Object } from './Object.js'

export type RootViaObject<
  $SelectionSet,
  $Schema extends Schema,
  $RootType extends SchemaKit.Output.RootType,
> = Root<
  $SelectionSet,
  $Schema,
  $RootType['fields']['__typename']['type']['type']
>

// dprint-ignore
export type Query<$SelectionSet, $Schema extends Schema> =
  Root<$SelectionSet, $Schema, 'Query'>

// dprint-ignore
export type Mutation<$SelectionSet, $Schema extends Schema> =
  Root<$SelectionSet, $Schema, 'Mutation'>

// dprint-ignore
export type Subscription<$SelectionSet, $Schema extends Schema> =
  Root<$SelectionSet, $Schema, 'Subscription'>

export type Root<
  $SelectionSet,
  $Schema extends Schema,
  $RootTypeName extends SchemaKit.RootTypeName,
> = Object<$SelectionSet, $Schema, ExcludeNull<$Schema['Root'][$RootTypeName]>>
