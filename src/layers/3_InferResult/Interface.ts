import type { Schema } from '../1_Schema/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { InlineFragmentTypeConditional } from './InlineFragment.js'

// dprint-ignore
export type Interface<$SelectionSet, $Index extends SchemaIndex, $Node extends Schema.Output.Interface> =
  InlineFragmentTypeConditional<$SelectionSet, $Node['implementors'][number], $Index>
