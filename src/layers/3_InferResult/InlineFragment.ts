import { type GetKeyOr } from '../../lib/prelude.js'
import type { SchemaKit } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import type { Schema } from '../4_generator/generators/Schema.js'
import type { Object } from './Object.js'

// dprint-ignore
export type InlineFragmentTypeConditional<$SelectionSet, $Node extends SchemaKit.Output.Object$2, $Index extends Schema> =
  $Node extends any // force distribution
    ? Object<
        & GetKeyOr<
            $SelectionSet,
            `${Select.InlineFragment.TypeConditionalKeyPrefix}${$Node['fields']['__typename']['type']['type']}`,
            {}
          >
        & Select.InlineFragment.OmitInlineFragmentsWithTypeConditions<$SelectionSet>,
        $Index,
        $Node
      >
    : never
