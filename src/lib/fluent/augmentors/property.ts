import type { HKT } from '../../hkt/__.js'
import type { CallFluentFn, Context, FluentFn, State } from '../Fluent.js'

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
        Context: $State['Context']
        Merges: $State['Merges']
      }
  >

export type MaterializeProperties<$FluentFn extends FluentFn, $State extends State> = {
  [$PropertyName in keyof $State['Properties']]: CallPropertyFn<
    $State['Properties'][$PropertyName],
    { FluentFn: $FluentFn; State: $State }
  >
}

export interface PropertyFn<$Name extends string = string, _$Context extends Context = Context> extends HKT.Fn {
  name: $Name
}

export type CallPropertyFn<$PropertyFn extends PropertyFn, $Params extends PropertyFnParams> = HKT.Call<
  $PropertyFn,
  $Params
>

export type PropertyFnParams<$Context extends Context = Context> = {
  FluentFn: FluentFn
  State: State<$Context>
}
