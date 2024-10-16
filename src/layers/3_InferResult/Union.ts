import type { SchemaKit } from '../1_Schema/__.js'
import type { Schema } from '../4_generator/generators/Schema.js'
import type { InlineFragmentTypeConditional } from './InlineFragment.js'

// dprint-ignore
export type Union<$SelectionSet, $Index extends Schema, $Node extends SchemaKit.Output.Union> =
  InlineFragmentTypeConditional<$SelectionSet, $Node['members'][number], $Index>
