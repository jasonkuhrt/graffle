import type { Simplify } from 'type-fest'
import { type ExcludeNull, type GetKeyOr, type StringKeyof } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { Schema } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { Field } from './Field.js'
import type { InferSelectionSelectAlias } from './SelectAlias.js'

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

// dprint-ignore
export type Object<$SelectionSet, $Schema extends SchemaIndex, $Node extends Schema.Output.Object$2> =
  Select.SelectScalarsWildcard.IsSelectScalarsWildcard<$SelectionSet> extends true
    // todo what about when scalars wildcard is combined with other fields like relations?
    ? SelectScalarsWildcard<$SelectionSet, $Schema,$Node>
    :
      Simplify<(
        & SelectionNonSelectAlias<$SelectionSet, $Schema, $Node>
        & InferSelectionSelectAlias<$SelectionSet, $Schema, $Node>
      )>

// dprint-ignore
type SelectionNonSelectAlias<$SelectionSet , $Schema extends SchemaIndex, $Node extends Schema.Output.Object$2> =
  {
    [$Select in PickSelectsPositiveIndicatorAndNotSelectAlias<$SelectionSet>]:
      $Select extends keyof $Node['fields']
        ? Field<$SelectionSet[$Select], $Node['fields'][$Select], $Schema>
        : Errors.UnknownFieldName<$Select, $Node>
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

type SelectScalarsWildcard<
  $SelectionSet,
  $Index extends SchemaIndex,
  $Node extends Schema.Output.Object$2,
> = {
  [$Key in keyof PickScalarFields<$Node>]: Field<$SelectionSet, $Node['fields'][$Key], $Index>
}

// todo could we use this since the valuesoremptyobject could drop the nevers?
// type HandFieldExpressionAliases<$SelectionSet, $Index extends SchemaIndex, $Node extends Schema.Output.Object$2> =
// ValuesOrEmptyObject<
//   {
//     [$KeyExpression in keyof $SelectionSet & string]:
//       $SelectionSet[$KeyExpression] extends any[]
//         ?
//           HandleAliasExpression<
//             $SelectionSet[$KeyExpression],
//             $KeyExpression,
//             $Index,
//             $Node
//           >
//         : never

//   }
// >

// dprint-ignore
export type Union<$SelectionSet, $Index extends SchemaIndex, $Node extends Schema.Output.Union> =
  InlineFragmentTypeConditional<$SelectionSet, $Node['members'][number], $Index>

// dprint-ignore
export type Interface<$SelectionSet, $Index extends SchemaIndex, $Node extends Schema.Output.Interface> =
  InlineFragmentTypeConditional<$SelectionSet, $Node['implementors'][number], $Index>

// dprint-ignore
type InlineFragmentTypeConditional<$SelectionSet, $Node extends Schema.Output.Object$2, $Index extends SchemaIndex> =
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

// dprint-ignore
export namespace Errors {
  export type UnknownFieldName<$FieldName extends string, $Object extends Schema.Object$2 | Schema.Output.RootType> =
    TSError<'Object', `field "${$FieldName}" does not exist on object "${$Object['fields']['__typename']['type']['type']}"`>
}

// dprint-ignore
export type PickScalarFields<$Object extends Schema.Output.Object$2> = {
  [
    $Key in keyof $Object['fields']
    as Schema.Output.UnwrapToNamed<$Object['fields'][$Key]['type']> extends Schema.Hybrid.Scalar.$Any | Schema.Output.__typename
      ? $Key
      : never
  ]: $Object['fields'][$Key]
}
