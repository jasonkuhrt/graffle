import type { Anyware } from '../../../lib/anyware/__.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { Core } from '../../5_core/__.js'
import type { FnParametersProperty } from '../fluent.js'

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
