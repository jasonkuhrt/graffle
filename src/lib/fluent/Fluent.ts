import type { Simplify } from 'type-fest'
import type { HKT } from '../hkt/__.js'
import type { AddMergeFn, MaterializeMerges, MergeFn } from './augmentors/merge.js'
import type { AddPropertyFn, MaterializeProperties, PropertyFn, PropertyFnParams } from './augmentors/property.js'

export * from './augmentors/merge.js'
export * from './augmentors/property.js'

export interface State<$Context extends object = object> {
  Merges: [...MergeFn[]]
  Properties: Record<string, PropertyFn>
  Context: $Context
}

interface StateInitial {
  Merges: []
  Properties: {}
  Context: {}
}

export interface FluentFn<$StateCurrent extends State = StateInitial> extends HKT.Fn {
  StateCurrent: $StateCurrent
  // @ts-expect-error cannot type HKT.Fn params
  return: FluentFn<this['params']>
}

export type CallFluentFn<$FluentFn extends FluentFn, $State extends State> = HKT.Call<$FluentFn, $State>

export type Create<$Context> = FluentFn<StateInitial & { Context: $Context }>

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
    Context?: State['Context']
  },
> = Materialize<
  CallFluentFn<$Params['FluentFn'], $Params['State'] & $NewState>
>

export type IncrementWthNewContext<
  $Params extends PropertyFnParams,
  $NewContext extends State['Context'],
> = Materialize<
  CallFluentFn<
    $Params['FluentFn'],
    {
      Context: $NewContext
      Properties: $Params['State']['Properties']
      Merges: $Params['State']['Merges']
    }
  >
>
