import type { Schema } from '../1_Schema/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { Field } from './Field.js'

export type ScalarsWildcard<
  $SelectionSet,
  $Index extends SchemaIndex,
  $Node extends Schema.Output.Object$2,
> = {
  [$Key in keyof PickScalarFields<$Node>]: Field<$SelectionSet, $Node['fields'][$Key], $Index>
}

// dprint-ignore
type PickScalarFields<$Object extends Schema.Output.Object$2> = {
  [
    $Key in keyof $Object['fields']
    as Schema.Output.UnwrapToNamed<$Object['fields'][$Key]['type']> extends Schema.Hybrid.Scalar.$Any | Schema.Output.__typename
      ? $Key
      : never
  ]: $Object['fields'][$Key]
}
