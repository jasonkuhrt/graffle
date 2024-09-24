import type { Simplify } from 'type-fest'
import type { HKT } from '../hkt/__.js'
import type { AddFnMerge, FnMerge, MaterializeMerges } from './augmentors/merge.js'
import type { AddFnProperty, FnParametersProperty, FnProperty, MaterializeProperties } from './augmentors/property.js'

export * from './augmentors/merge.js'
export * from './augmentors/property.js'

export type Context = object

export interface State<
  $Context extends Context = Context,
  $Properties extends Record<string, FnProperty> = Record<string, FnProperty>,
  $Merges extends [...FnMerge[]] = [...FnMerge[]],
> {
  context: $Context
  properties: $Properties
  merges: $Merges
}

interface StateInitial {
  merges: []
  properties: {}
  context: {}
}

export interface FnFluent<$StateCurrent extends State = StateInitial> extends HKT.Fn {
  StateCurrent: $StateCurrent
  // @ts-expect-error untyped params
  return: FnFluent<this['params']>
}

export type FnCallFluent<$FnFluent extends FnFluent, $State extends State> = HKT.Call<$FnFluent, $State>

export type Create<$Context = Context> = FnFluent<StateInitial & { context: $Context }>

// dprint-ignore
export type Materialize<$FluentFn extends FnFluent<any>> =
  $FluentFn extends FnFluent<infer $State>
    ? Simplify<
      & MaterializeProperties<$FluentFn, $State>
      & MaterializeMerges<$State['merges'], $State>
      // & { $$DEBUG: Simplify<$State> }
    >
    : never

// --- Fluent Augmentation Helpers ---

type FnAugmentation = FnProperty | FnMerge

// dprint-ignore
export type Add<$FnFluent extends FnFluent<any>, $FnAugmentation extends FnAugmentation> =
  // todo this works but leads to infinite depth error in AddMany. Could hurt perf. Avoiding for now.
  // $FluentFn extends FluentFn<infer $State extends State> ?

    $FnAugmentation extends FnMerge     ? AddFnMerge   <$FnFluent, $FnFluent['StateCurrent'], $FnAugmentation> :
    $FnAugmentation extends FnProperty  ? AddFnProperty<$FnFluent, $FnFluent['StateCurrent'], $FnAugmentation> :
                                          never
// : never

// dprint-ignore
export type AddMany<$FnFluent extends FnFluent<any>, $AugmentationFns extends [...FnAugmentation[]]> =
	$AugmentationFns extends [infer $FirstAugmentationFn extends FnAugmentation, ...infer $RestAugmentationFns extends FnAugmentation[]]
		? AddMany<Add<$FnFluent, $FirstAugmentationFn>, $RestAugmentationFns>
		: $FnFluent

// --- Property Implementation Helpers ---

export type IncrementNothing<$Args extends FnParametersProperty> = Materialize<$Args['fnFluent']>

export type IncrementUsingMerge<
  $Params extends FnParametersProperty,
  $NewState extends {
    properties?: State['properties']
    context?: State['context']
  },
> = Materialize<
  FnCallFluent<$Params['fnFluent'], $Params['state'] & $NewState>
>

export type IncrementWthNewContext<
  $Params extends FnParametersProperty,
  $NewContext extends State['context'],
> = Materialize<
  FnCallFluent<
    $Params['fnFluent'],
    {
      context: $NewContext
      properties: $Params['state']['properties']
      merges: $Params['state']['merges']
    }
  >
>
