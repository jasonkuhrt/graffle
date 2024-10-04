import type { HKT } from '../../../entrypoints/utilities-for-generated.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { ClientContext } from '../fluent.js'

export interface FnRequestMethods extends Fluent.FnMerge {
  // @ts-expect-error untyped params
  return: BuilderRequestMethods<this['params']>
}

// dprint-ignore
export type BuilderRequestMethods<$Context extends ClientContext>=
  & (
    $Context['schemaIndex'] extends null
      ? {}
      :
        (
          // eslint-disable-next-line
          // @ts-ignore Passes after generation
          & HKT.Call<GlobalRegistry.GetOrDefault<$Context['config']['name']>['interfaces']['Root'], $Context>
          & {
              // eslint-disable-next-line
              // @ts-ignore Passes after generation
              document: HKT.Call<GlobalRegistry.GetOrDefault<$Context['config']['name']>['interfaces']['Document'], $Context>
            }
        )
  )
