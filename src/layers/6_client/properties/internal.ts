import type { Fluent } from '../../../lib/fluent/__.js'
import type { FnParametersMerge } from '../fluent.js'

export interface FnInternal extends Fluent.FnMerge {
  // @ts-expect-error untyped params
  return: Internal<this['params']>
}

export type Internal<$Args extends FnParametersMerge> = {
  /**
   * TODO
   */
  _: {
    context: $Args
  }
}
