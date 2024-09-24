import type { Anyware } from '../../../lib/anyware/__.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { Core } from '../../5_core/__.js'
import type { FnParametersProperty } from '../fluent.js'

export interface FnAnyware extends Fluent.FnProperty<`anyware`> {
  // @ts-expect-error untyped params
  return: Anyware_<this['params']>
}

export interface Anyware_<$Args extends FnParametersProperty> {
  /**
   * TODO Anyware Docs.
   */
  (
    anyware: Anyware.Extension2<Core.Core<$Args['state']['context']['config']>>,
  ): Fluent.IncrementNothing<$Args>
}
