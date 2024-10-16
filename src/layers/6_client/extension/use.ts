import type { ConfigManager } from '../../../lib/config-manager/__.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import { type ClientContext, defineProperties, type FnParametersProperty } from '../fluent.js'
import type { Extension } from './extension.js'

export interface UseFn extends Fluent.FnProperty<`use`> {
  // @ts-expect-error untyped params
  return: Use<this['params']>
}

export interface Use<$Args extends FnParametersProperty> {
  /**
   * TODO Use Docs.
   */
  <$Extension extends Extension>(extension?: $Extension): Fluent.IncrementWithStateSet<ClientContext, $Args, {
    context: {
      config: ConfigManager.SetProperties<$Args['state']['context']['config'], {
        typeHooks: ConfigManager.SetProperties<$Args['state']['context']['config']['typeHooks'], {
          onRequestResult: $Extension['typeHooks']['onRequestResult'] extends undefined
            ? $Args['state']['context']['config']['typeHooks']['onRequestResult']
            // dprint-ignore
            : [
                ...$Args['state']['context']['config']['typeHooks']['onRequestResult'],
                $Extension['typeHooks']['onRequestResult'],
              ]
        }>
      }>
    }
    properties:
      & $Args['state']['properties']
      & (
        $Extension['typeHooks']['property'] extends Fluent.FnProperty
          ? Fluent.ToFnPropertyObject<$Extension['typeHooks']['property']>
          : {}
      )
  }>
}

export const useProperties = defineProperties((builder, state) => {
  return {
    use: (extension: Extension) => {
      return builder({
        ...state,
        extensions: [...state.extensions, extension],
      })
    },
  }
})
