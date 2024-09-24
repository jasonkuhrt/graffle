import type { Fluent } from '../../../lib/fluent/__.js'
import { type FnParametersMerge } from '../fluent.js'

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

// todo once context is on state
// export const propertyInternal = createTerminus((state) => {
//   return {
//     context: {
//       config: state.context.config,
//     },
//   }
// })
