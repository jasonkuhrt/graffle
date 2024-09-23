import type { Simplify } from 'type-fest'
import type { HKT } from '../hkt/__.js'
import type { AddMergeFn, MaterializeMerges, MergeFn } from './augmentors/merge.js'
import type { AddPropertyFn, MaterializeProperties, PropertyFn, PropertyFnParams } from './augmentors/property.js'

export * from './augmentors/merge.js'
export * from './augmentors/property.js'

export interface State {
  Merges: [...MergeFn[]]
  Properties: Record<string, PropertyFn>
  Config: object
}

interface StateInitial {
  Merges: []
  Properties: {}
  Config: {}
}

export interface FluentFn<$StateCurrent extends State = StateInitial> extends HKT.Fn {
  StateCurrent: $StateCurrent
  // @ts-expect-error cannot type HKT.Fn params
  return: FluentFn<this['params']>
}

export type CallFluentFn<$FluentFn extends FluentFn, $State extends State> = HKT.Call<$FluentFn, $State>

export type Empty = FluentFn

// dprint-ignore
export type Materialize<$FluentFn extends FluentFn<any>> =
  $FluentFn extends FluentFn<infer $State>
    ? Simplify<
      & MaterializeProperties<$FluentFn, $State>
      & MaterializeMerges<$State['Merges'], $State>
    >
    : never

// --- Fluent Augmentation Helpers ---
type AugmentationFn = PropertyFn | MergeFn

// dprint-ignore
export type Add<$FluentFn extends FluentFn<any>, $AugmentationFn extends AugmentationFn> =
  // todo this works but leads to infinite depth error in AddMany. Could hurt perf. Avoiding for now.
  // $FluentFn extends FluentFn<infer $State extends State> ?

    $AugmentationFn extends MergeFn     ? AddMergeFn   <$FluentFn, $FluentFn['StateCurrent'], $AugmentationFn> :
    $AugmentationFn extends PropertyFn  ? AddPropertyFn<$FluentFn, $FluentFn['StateCurrent'], $AugmentationFn> :
                                          never
// : never

// dprint-ignore
export type AddMany<$FluentFn extends FluentFn<any>, $AugmentationFns extends [...AugmentationFn[]]> =
	$AugmentationFns extends [infer $FirstAugmentationFn extends AugmentationFn, ...infer $RestAugmentationFns extends AugmentationFn[]]
		? AddMany<Add<$FluentFn, $FirstAugmentationFn>, $RestAugmentationFns>
		: $FluentFn

// --- Property Implementation Helpers ---

export type IncrementNothing<$Params extends PropertyFnParams> = Materialize<$Params['FluentFn']>

export type IncrementUsingMerge<
  $Params extends PropertyFnParams,
  $NewState extends {
    Properties?: State['Properties']
    Config?: State['Config']
  },
> = Materialize<
  CallFluentFn<$Params['FluentFn'], $Params['State'] & $NewState>
>

export type IncrementWthNewConfig<
  $Params extends PropertyFnParams,
  $NewConfig extends State['Config'],
> = Materialize<
  CallFluentFn<
    $Params['FluentFn'],
    {
      Config: $NewConfig
      Properties: $Params['State']['Properties']
      Merges: $Params['State']['Merges']
    }
  >
>
