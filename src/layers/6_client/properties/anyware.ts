import type { Anyware as AnywareLib } from '../../../lib/anyware/__.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { Core } from '../../5_core/__.js'
import type { FnParametersProperty } from '../fluent.js'

export interface FnAnyware extends Fluent.FnProperty<`anyware`> {
  // @ts-expect-error untyped params
  return: Anyware<this['params']>
}

export interface Anyware<$Args extends FnParametersProperty> {
  /**
   * TODO Anyware Docs.
   */
  (
    anyware: AnywareLib.Extension2<Core.Core<$Args['state']['context']['config']>>,
  ): Fluent.IncrementNothing<$Args>
}
