import type { Simplify } from 'type-fest'
import type { TSErrorDescriptive } from '../../lib/ts-error.js'
import type { SchemaKit } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import type { Schema } from '../4_generator/generators/Schema.js'
import type { Interface } from './Interface.js'
import type { Object } from './Object.js'
import type { Union } from './Union.js'

// dprint-ignore
export type Field<$SelectionSet, $Field extends SchemaKit.SomeField, $Schema extends Schema> =
  Simplify<
    $SelectionSet extends Select.Directive.Include.FieldStates.Negative | Select.Directive.Skip.FieldStates.Positive ?
       null :
       (
          | FieldDirectiveInclude<$SelectionSet>
          | FieldDirectiveSkip<$SelectionSet>
          | FieldType<Omit<$SelectionSet, '$'>, $Field['type'], $Schema>
        )
  >

// dprint-ignore
type FieldType<
  $SelectionSet,
  $Type extends SchemaKit.Output.Any,
  $Schema extends Schema
> = 
  $Type extends SchemaKit.__typename<infer $Value>             ? $Value :
  $Type extends SchemaKit.Output.Nullable<infer $InnerType>    ? null | FieldType<$SelectionSet, $InnerType, $Schema> :
  $Type extends SchemaKit.Output.List<infer $InnerType>        ? Array<FieldType<$SelectionSet, $InnerType, $Schema>> :
  $Type extends SchemaKit.Enum<infer _, infer $Members>        ? $Members[number] :
  $Type extends SchemaKit.Scalar.$Any                          ? ReturnType<$Type['codec']['decode']> :
  $Type extends SchemaKit.Object$2                             ? Object<$SelectionSet, $Schema, $Type> :
  $Type extends SchemaKit.Interface                            ? Interface<$SelectionSet, $Schema, $Type> :
  $Type extends SchemaKit.Union                                ? Union<$SelectionSet, $Schema, $Type> :
                                                              TSErrorDescriptive<'FieldType', `Unknown type`, { $Type: $Type; $SelectionSet: $SelectionSet; $Schema:$Schema }>

// dprint-ignore
type FieldDirectiveInclude<$SelectionSet> =
  $SelectionSet extends Select.Directive.Include.Field  ? $SelectionSet extends Select.Directive.Include.FieldStates.Positive ? never
																																																															: null
																												: never

// dprint-ignore
type FieldDirectiveSkip<$SelectionSet> =
  $SelectionSet extends Select.Directive.Skip.Field     ? $SelectionSet extends Select.Directive.Skip.FieldStates.Negative 	? never 
																																																														: null
																												: never
