import type { Anyware } from '../../../lib/anyware/__.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { Core } from '../../5_core/__.js'
import { defineProperties, type FnParametersProperty } from '../fluent.js'

export interface FnRetry extends Fluent.FnProperty<`retry`> {
  // @ts-expect-error untyped params
  return: Retry<this['params']>
}

export interface Retry<$Args extends FnParametersProperty> {
  /**
   * TODO Retry Docs.
   */
  (extension: Anyware.Extension2<Core.Core, { retrying: true }>): Fluent.IncrementNothing<$Args>
}

export const retryProperties = defineProperties((builder, state) => {
  return {
    retry: (anyware: Anyware.Extension2<Core.Core, { retrying: true }>) => {
      return builder({ ...state, retry: anyware })
    },
  }
})
