import type { HKT } from '../../hkt/__.js'
import type { mergeObjectArray } from '../../prelude.js'
import type { Context, FnCallFluent, FnFluent, State } from '../Fluent.js'

export interface FnMerge extends HKT.Fn {
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
    [$Index in keyof $Merges]: HKT.Call<$Merges[$Index], $State['context']>
  }
>
