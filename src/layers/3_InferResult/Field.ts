import type { Simplify } from 'type-fest'
import type { TSError } from '../../lib/TSError.js'
import type { Schema } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { Interface } from './Interface.js'
import type { Object } from './Object.js'
import type { Union } from './Union.js'

// dprint-ignore
export type Field<$SelectionSet, $Field extends Schema.SomeField, $Schema extends SchemaIndex> =
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
  $Type extends Schema.Output.Any,
  $Schema extends SchemaIndex
> = 
  $Type extends Schema.__typename<infer $Value>             ? $Value :
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? null | FieldType<$SelectionSet, $InnerType, $Schema> :
  $Type extends Schema.Output.List<infer $InnerType>        ? Array<FieldType<$SelectionSet, $InnerType, $Schema>> :
  $Type extends Schema.Enum<infer _, infer $Members>        ? $Members[number] :
  $Type extends Schema.Scalar.$Any                          ? ReturnType<$Type['codec']['decode']> :
  $Type extends Schema.Object$2                             ? Object<$SelectionSet, $Schema, $Type> :
  $Type extends Schema.Interface                            ? Interface<$SelectionSet, $Schema, $Type> :
  $Type extends Schema.Union                                ? Union<$SelectionSet, $Schema, $Type> :
                                                              TSError<'FieldType', `Unknown type`, { $Type: $Type; $SelectionSet: $SelectionSet; $Schema:$Schema }>

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
