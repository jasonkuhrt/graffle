import type { Args } from './Args.js'
import type { MaybeThunk } from './core/helpers.js'
import type { Output } from './Output/__.js'

export type Field<$Type extends any = any, $Args extends Args | null = Args | null> = {
  type: $Type
  args: $Args
}

export const field = <$Type extends Output.Any, $Args extends null | Args = null>(
  type: MaybeThunk<$Type>,
  args: $Args = null as $Args,
): Field<$Type, $Args> => {
  return {
    // At type level "type" is not a thunk
    type: type as any, // eslint-disable-line
    args,
  }
}
