import type { HKT } from '../../hkt/__.js'
import type { mergeObjectArray } from '../../prelude.js'
import type { CallFluentFn, FluentFn, State } from '../Fluent.js'

export interface MergeFn extends HKT.Fn {
  Kind: 'MergeFn'
}

// dprint-ignore
export type AddMergeFn<$FluentFn extends FluentFn<any>, $State extends State, $MergeFn extends MergeFn> =
  CallFluentFn<
    $FluentFn,
    {
      Merges: [...$State['Merges'], $MergeFn]
      // Passthrough
      Config: $State['Config']
      Properties: $State['Properties']
    }
  >

export type MaterializeMerges<$Merges extends [...MergeFn[]], $Config extends State['Config']> = mergeObjectArray<
  {
    [$Index in keyof $Merges]: HKT.Call<$Merges[$Index], { Config: $Config }>
  }
>
