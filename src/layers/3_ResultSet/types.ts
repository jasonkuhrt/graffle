import type { Simplify } from 'type-fest'
import type { ExcludeNull, GetKeyOr, mergeObjectArray, ValuesOrEmptyObject } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { Schema, SomeField } from '../1_Schema/__.js'
import type { PickScalarFields } from '../1_Schema/Output/Output.js'
import type { SelectionSet } from '../2_SelectionSet/__.js'
import type { PickPositiveNonAliasIndicators } from '../2_SelectionSet/types.js'

export type RootViaObject<
  $SelectionSet,
  $Index extends Schema.Index,
  $RootType extends Schema.Output.RootType,
> = Root<$SelectionSet, $Index, $RootType['fields']['__typename']['type']['type']>

export type Query<$SelectionSet, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Query'>

// dprint-ignore
export type Mutation<$SelectionSet, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Mutation'>

// dprint-ignore
export type Subscription<$SelectionSet, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Subscription'>

export type Root<
  $SelectionSet,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
> = Object$<$SelectionSet, $Index, ExcludeNull<$Index['Root'][$RootTypeName]>>

// dprint-ignore
export type Object$<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Object$2> =
  SelectionSet.IsSelectScalarsWildcard<$SelectionSet> extends true
    // todo what about when scalars wildcard is combined with other fields like relations?
    ? HandleFieldExpressionScalarsWildcard<$SelectionSet, $Index,$Node>
    :
      (
        & HandleFieldExpressionsPlain<$SelectionSet, $Index, $Node>
        & HandFieldExpressionAliases<$SelectionSet, $Index, $Node>
      )

// dprint-ignore
type HandleFieldExpressionsPlain<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Object$2> = {
  [$FieldExpression in keyof PickPositiveNonAliasIndicators<$SelectionSet> & string]:
    $FieldExpression extends keyof $Node['fields']
      ? Field<$SelectionSet[$FieldExpression], $Node['fields'][$FieldExpression], $Index>
      : Errors.UnknownFieldName<$FieldExpression, $Node>
}

/**
 * Handle Scalars Wildcard
 */
type HandleFieldExpressionScalarsWildcard<
  $SelectionSet,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> = {
  [$Key in keyof PickScalarFields<$Node>]: Field<$SelectionSet, $Node['fields'][$Key], $Index>
}

// type OmitAliases<$Object extends object> = {
//   [$Key in keyof $Object as $Object[$Key] extends any[] ? never : $Key]: $Object[$Key]
// }

// dprint-ignore
type HandFieldExpressionAliases<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Object$2> =
  ValuesOrEmptyObject<
    {
      [
        $KeyExpression in keyof $SelectionSet as $SelectionSet[$KeyExpression] extends any[] ? $KeyExpression : never
      ]:
        HandleAliasExpression<
          // @ts-expect-error We know this satisfies the alias type constraint b/c of the key filtering above.
          $SelectionSet[$KeyExpression],
          $KeyExpression,
          $Index,
          $Node
        >
    }
  >

// todo could we use this since the valuesoremptyobject could drop the nevers?
// type HandFieldExpressionAliases<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Object$2> =
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
type HandleAliasExpression<
  $AliasExpression extends [string, any] | [string, any][],
  $KeyExpression extends string,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> =
  $AliasExpression extends [string, any]
    ? HandleAliasExpressionSingle<$AliasExpression, $KeyExpression, $Index, $Node>
    : HandleAliasExpressionMulti<$AliasExpression, $KeyExpression, $Index, $Node>

type HandleAliasExpressionMulti<
  $Aliases extends [string, any][],
  $KeyExpression extends string,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> = mergeObjectArray<
  {
    [_ in keyof $Aliases]: HandleAliasExpressionSingle<$Aliases[_], $KeyExpression, $Index, $Node>
  }
>

type HandleAliasExpressionSingle<
  $Alias extends [string, any],
  $KeyExpression extends string,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> = {
  [_ in $Alias[0]]: Field<$Alias[1], $Node['fields'][$KeyExpression], $Index>
}

// dprint-ignore
export type Union<$SelectionSet extends SelectionSet.Any, $Index extends Schema.Index, $Node extends Schema.Output.Union> =
  OnTypeFragment<$SelectionSet, $Node['members'][number], $Index>

// dprint-ignore
export type Interface<$SelectionSet extends SelectionSet.Any, $Index extends Schema.Index, $Node extends Schema.Output.Interface> =
  OnTypeFragment<$SelectionSet, $Node['implementors'][number], $Index>

// dprint-ignore
type OnTypeFragment<$SelectionSet extends SelectionSet.Any, $Node extends Schema.Output.Object$2, $Index extends Schema.Index> =
  $Node extends any // force distribution
    ? Object$<
        GetKeyOr<$SelectionSet, `${SelectionSet.On.KeyPrefix}${$Node['fields']['__typename']['type']['type']}`, {}> & SelectionSet.On.OmitOnTypeFragments<$SelectionSet>,
        $Index,
        $Node
      >
    : never

// dprint-ignore
export type Field<$SelectionSet, $Field extends SomeField, $Index extends Schema.Index> =
  Simplify<
    $SelectionSet extends SelectionSet.Directive.Include.FieldStates.Negative | SelectionSet.Directive.Skip.FieldStates.Positive ?
       null :
       (
          | FieldDirectiveInclude<$SelectionSet>
          | FieldDirectiveSkip<$SelectionSet>
          | FieldType<Omit<$SelectionSet, '$'>, $Field['type'], $Index>
        )
  >

// dprint-ignore
type FieldType<
  $SelectionSet extends SelectionSet.Any,
  $Type extends Schema.Output.Any,
  $Index extends Schema.Index
> = 
  $Type extends Schema.__typename<infer $Value>             ? $Value :
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? null | FieldType<$SelectionSet, $InnerType, $Index> :
  $Type extends Schema.Output.List<infer $InnerType>        ? Array<FieldType<$SelectionSet, $InnerType, $Index>> :
  $Type extends Schema.Enum<infer _, infer $Members>        ? $Members[number] :
  $Type extends Schema.Scalar.Any                           ? ReturnType<$Type['codec']['decode']> :
  $Type extends Schema.Object$2                             ? Object$<$SelectionSet, $Index, $Type> :
  $Type extends Schema.Interface                            ? Interface<$SelectionSet, $Index, $Type> :
  $Type extends Schema.Union                                ? Union<$SelectionSet, $Index, $Type> :
                                                              TSError<'FieldType', `Unknown type`, { $Type: $Type }>

// dprint-ignore
type FieldDirectiveInclude<$SelectionSet> =
  $SelectionSet extends SelectionSet.Directive.Include.Field  ? $SelectionSet extends SelectionSet.Directive.Include.FieldStates.Positive ?
                                                          never :
                                                          null
                                                        : never

// dprint-ignore
type FieldDirectiveSkip<$SelectionSet> =
  $SelectionSet extends SelectionSet.Directive.Skip.Field     ? $SelectionSet extends SelectionSet.Directive.Skip.FieldStates.Negative ?
                                                          never :
                                                          null
                                                        : never

// dprint-ignore
export namespace Errors {
  export type UnknownFieldName<$FieldName extends string, $Object extends Schema.Object$2 | Schema.Output.RootType> =
    TSError<'Object', `field "${$FieldName}" does not exist on object "${$Object['fields']['__typename']['type']['type']}"`>
}
