import type { TypeFunction } from '../../type-function/__.js'
import type { FnCallFluent, FnFluent, State } from '../Fluent.js'

export type ToFnPropertyObject<$PropertyFn extends FnProperty> = {
  [_ in $PropertyFn['name']]: $PropertyFn
}

// dprint-ignore
export type AddFnProperty<$FluentFn extends FnFluent<any>, $State extends State, $PropertyFn extends FnProperty> =
    FnCallFluent<
      $FluentFn,
      {
        properties:
          & $State['properties']
          & ToFnPropertyObject<$PropertyFn>
        // Passthrough
        context: $State['context']
        merges: $State['merges']
      }
  >

export type MaterializeProperties<$FluentFn extends FnFluent, $State extends State> = {
  [$PropertyName in keyof $State['properties']]: FnCallProperty<
    $State['properties'][$PropertyName],
    FnParametersProperty<$FluentFn, $State>
  >
}

export interface FnProperty<$Name extends string = string> extends TypeFunction.Fn {
  name: $Name
}

export type FnCallProperty<$PropertyFn extends FnProperty, $Params extends FnParametersProperty> = TypeFunction.Call<
  $PropertyFn,
  $Params
>

export type FnParametersProperty<$FnFluent extends FnFluent<any> = FnFluent, $State extends State = State> = {
  fnFluent: $FnFluent
  state: $State
}
