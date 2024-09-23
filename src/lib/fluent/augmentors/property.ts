import type { HKT } from '../../hkt/__.js'
import type { CallFluentFn, FluentFn, State } from '../Fluent.js'

// dprint-ignore
export type AddPropertyFn<$FluentFn extends FluentFn<any>, $State extends State, $PropertyFn extends PropertyFn> =
    CallFluentFn<
      $FluentFn,
      {
        Properties:
          & $State['Properties']
          & {
            [_ in $PropertyFn['name']]: $PropertyFn
          }
        // Passthrough
        Config: $State['Config']
        Merges: $State['Merges']
      }
  >

export type MaterializeProperties<$FluentFn extends FluentFn, $State extends State> = {
  [$PropertyName in keyof $State['Properties']]: CallPropertyFn<
    $State['Properties'][$PropertyName],
    { FluentFn: $FluentFn; State: $State }
  >
}

export interface PropertyFn<$Name extends string = string> extends HKT.Fn {
  name: $Name
}

export type CallPropertyFn<$PropertyFn extends PropertyFn, $Params extends PropertyFnParams> = HKT.Call<
  $PropertyFn,
  $Params
>

export type PropertyFnParams = {
  FluentFn: FluentFn
  State: State
}
