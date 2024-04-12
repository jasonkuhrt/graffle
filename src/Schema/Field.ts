import type { Args } from './Args.js'
import type { MaybeThunk } from './core/helpers.js'
import { buildTimeOnly } from './core/helpers.js'
// import type * as TypesHybrid from '../Hybrid/_.js'
import type { Output } from './Output/__.js'

// export type Enum<$Args extends Args | null = null> = Field<TypesHybrid.Enum, $Args>

// export type Scalar<$Args extends Args | null = Args | null> = Field<TypesHybrid.Scalar.Any, $Args>

// export type String<$Args extends Args | null = null> = Field<TypesHybrid.Scalar.String, $Args>

// export type Number<$Args extends Args | null = null> = Field<TypesHybrid.Scalar.Int, $Args>

// export type Boolean<$Args extends Args | null = null> = Field<TypesHybrid.Scalar.Boolean, $Args>

// export interface Args<$Fields extends Record<keyof $Fields, InputFieldType> = Record<string, InputFieldType>> {

export type Field<$Type extends any = any, $Args extends Args | null = Args | null> = {
  typeUnwrapped: Output.Unwrap<$Type>
  type: $Type
  args: $Args
}

export const field = <$Type extends Output.Any, $Args extends null | Args = null>(
  type: MaybeThunk<$Type>,
  args: $Args = null as $Args,
): Field<$Type, $Args> => {
  return {
    typeUnwrapped: buildTimeOnly, // eslint-disable-line
    // At type level "type" is not a thunk
    type: type as any, // eslint-disable-line
    args,
  }
}
