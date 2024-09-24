import type { Fluent } from '../../../lib/fluent/__.js'
import { defineProperties, type FnParametersProperty } from '../fluent.js'
import type { Extension } from './extension.js'

export interface UseFn extends Fluent.FnProperty<`use`> {
  // @ts-expect-error untyped params
  return: Use<this['params']>
}

export interface Use<$Args extends FnParametersProperty> {
  /**
   * TODO Use Docs.
   */
  <$Extension extends Extension>(extension?: $Extension): Fluent.IncrementUsingMerge<$Args, {
    properties: $Extension['property'] extends Fluent.FnProperty ? Fluent.ToFnPropertyObject<$Extension['property']>
      : {}
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
