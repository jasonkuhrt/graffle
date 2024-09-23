import type { HKT } from '../../hkt/__.js'
import type { mergeObjectArray } from '../../prelude.js'
import type { CallFluentFn, FluentFn, State } from '../Fluent.js'

export interface MergeFn extends HKT.Fn {
  Kind: 'MergeFn'
}

export type MergeFnParams = {
  Context: State['Context']
}

// dprint-ignore
export type AddMergeFn<$FluentFn extends FluentFn<any>, $State extends State, $MergeFn extends MergeFn> =
  CallFluentFn<
    $FluentFn,
    {
      Merges: [...$State['Merges'], $MergeFn]
      // Passthrough
      Context: $State['Context']
      Properties: $State['Properties']
    }
  >

export type MaterializeMerges<$Merges extends [...MergeFn[]], $State extends State> = mergeObjectArray<
  {
    [$Index in keyof $Merges]: HKT.Call<$Merges[$Index], $State['Context']>
  }
>
