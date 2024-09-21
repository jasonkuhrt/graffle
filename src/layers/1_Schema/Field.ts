import type { Args } from './Args.js'
import type { MaybeThunk } from './core/helpers.js'
import type { Hybrid } from './Hybrid/__.js'
import type { Output } from './Output/__.js'

export type Field<$Type extends Output.Any, $Args extends Args<any> | null> = {
  // todo when generating schema keep track of the unwrapped type too to avoid IDE runtime cost to calcualte it
  // typeUnwrapped: $NamedType
  type: $Type
  args: $Args
}

export const field = <$Type extends Output.Any, $Args extends null | Args<any> = null>(
  type: MaybeThunk<$Type>,
  args: $Args = null as $Args,
): Field<$Type, $Args> => {
  return {
    // At type level "type" is not a thunk
    type: type as any,
    args,
  }
}

type FieldType =
  | Hybrid.Enum
  | Hybrid.Scalar.Any
  | Output.List<any>
  | Output.Nullable<any>
  | Output.Object$2<string, any>
  | Output.Union<string, [any, ...any[]]>
  | Output.Interface<string, Record<string, Field<any, Args<any> | null>>, [any, ...any[]]>

// todo test non null interface fields
export type SomeField = Field<FieldType, Args<any> | null>

export type SomeFields<$Keys extends SomeKey = SomeKey> = Record<$Keys, SomeField>

type SomeKey = string | number | symbol
