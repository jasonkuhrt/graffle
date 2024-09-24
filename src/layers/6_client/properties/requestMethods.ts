import type { TypedQueryDocumentNode } from 'graphql'
import type { HKT } from '../../../entrypoints/utilities-for-generated.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { SimplifyExceptError } from '../../../lib/prelude.js'
import type { BaseInput, TypedDocumentString } from '../../0_functions/types.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { ClientContext } from '../fluent.js'
import type { RawResolveOutputReturnRootType } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'

export interface FnRequestMethods extends Fluent.FnMerge {
  // @ts-expect-error untyped params
  return: BuilderRequestMethods<this['params']>
}

// dprint-ignore
export type BuilderRequestMethods<$Context extends ClientContext>=
  & BuilderRequestMethodsStatic<$Context['config']>
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

// dprint-ignore
export type BuilderRequestMethodsStatic<$Config extends Config> = {
  raw: <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>) =>
      Promise<SimplifyExceptError<RawResolveOutputReturnRootType<$Config, $Data>>>
  rawString: <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedDocumentString<$Data, $Variables>>) =>
      Promise<RawResolveOutputReturnRootType<$Config, $Data>>
}
