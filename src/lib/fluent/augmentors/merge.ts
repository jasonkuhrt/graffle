import type { mergeObjectArray } from '../../prelude.js'
import type { TypeFunction } from '../../type-function/__.js'
import type { Context, FnCallFluent, FnFluent, State } from '../Fluent.js'

export interface FnMerge extends TypeFunction.Fn {
  Kind: 'MergeFn'
}

export type ParametersFnMerge<$Context extends Context = Context> = $Context

export type AddFnMerge<
  $FluentFn extends FnFluent<any>,
  $State extends State,
  $MergeFn extends FnMerge,
> = FnCallFluent<
  $FluentFn,
  State<$State['context'], $State['properties'], [...$State['merges'], $MergeFn]>
>

export type MaterializeMerges<$Merges extends [...FnMerge[]], $State extends State> = mergeObjectArray<
  {
    [$Index in keyof $Merges]: TypeFunction.Call<$Merges[$Index], $State['context']>
  }
>
