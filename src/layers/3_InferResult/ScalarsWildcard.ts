import type { SchemaKit } from '../1_Schema/__.js'
import type { Schema } from '../4_generator/generators/Schema.js'
import type { Field } from './Field.js'

export type ScalarsWildcard<
  $SelectionSet,
  $Index extends Schema,
  $Node extends SchemaKit.Output.Object$2,
> = {
  [$Key in keyof PickScalarFields<$Node>]: Field<$SelectionSet, $Node['fields'][$Key], $Index>
}

// dprint-ignore
type PickScalarFields<$Object extends SchemaKit.Output.Object$2> = {
  [
    $Key in keyof $Object['fields']
    as SchemaKit.Output.UnwrapToNamed<$Object['fields'][$Key]['type']> extends SchemaKit.Hybrid.Scalar.$Any | SchemaKit.Output.__typename
      ? $Key
      : never
  ]: $Object['fields'][$Key]
}
