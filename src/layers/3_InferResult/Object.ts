import type { Simplify } from 'type-fest'
import { type StringKeyof } from '../../lib/prelude.js'
import type { TSErrorDescriptive } from '../../lib/TSError.js'
import type { Schema } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { Alias } from './Alias.js'
import type { Field } from './Field.js'
import type { ScalarsWildcard } from './ScalarsWildcard.js'

// dprint-ignore
export type Object<$SelectionSet, $Schema extends SchemaIndex, $Node extends Schema.Output.Object$2> =
  Select.SelectScalarsWildcard.IsSelectScalarsWildcard<$SelectionSet> extends true
    // todo what about when scalars wildcard is combined with other fields like relations?
    ? ScalarsWildcard<$SelectionSet, $Schema,$Node>
    :
      Simplify<(
        & SelectionNonSelectAlias<$SelectionSet, $Schema, $Node>
        & Alias<$SelectionSet, $Schema, $Node>
      )>

// dprint-ignore
type SelectionNonSelectAlias<$SelectionSet , $Schema extends SchemaIndex, $SchemaNode extends Schema.Output.Object$2> =
  {
    [$Key in PickSelectsPositiveIndicatorAndNotSelectAlias<$SelectionSet>]:
      $Key extends keyof $SchemaNode['fields']
        ? Field<$SelectionSet[$Key], $SchemaNode['fields'][$Key], $Schema>
        : Errors.UnknownFieldName<$Key, $SchemaNode>
  }

// dprint-ignore
export namespace Errors {
  export type UnknownFieldName<$FieldName extends string, $Object extends Schema.Object$2 | Schema.Output.RootType> =
    TSErrorDescriptive<'Object', `field "${$FieldName}" does not exist on object "${$Object['fields']['__typename']['type']['type']}"`>
}

// dprint-ignore
export type PickSelectsPositiveIndicatorAndNotSelectAlias<$SelectionSet> = StringKeyof<{
  [
    $FieldName in keyof $SelectionSet as $SelectionSet[$FieldName] extends Select.Indicator.Negative
      ? never
      : $SelectionSet[$FieldName] extends any[]
      ? never
       : $FieldName
  ]: 0
}>
