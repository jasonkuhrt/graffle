import type { Anyware } from '../../lib/anyware/__.js'
import type { HKT } from '../../lib/hkt/__.js'
import type { Fn } from '../../lib/hkt/hkt.js'
import type { Core } from '../5_core/__.js'
import type { Client, Context } from './client.js'
import type { Config } from './Settings/Config.js'

export interface ExtensionBuilderPassthrough extends Extension {
  return: this['params']['AdditionalMethods']
}

type TypeCallParams = {
  Config: unknown
  Index: unknown
  AdditionalMethods: unknown
}

export type CallBuilderMerge<$Extension extends Extension, $Params extends TypeCallParams> =
  ($Extension & { params: $Params })['builderMerge']

export type CallBuilderConfig<$Extension extends Extension, $Params extends TypeCallParams> =
  ($Extension & { params: $Params })['builderConfig']

export interface TypeHooks {
  /**
   * todo
   */
  builderMerge: {}
  /**
   * todo
   */
  builderConfig: never
  builderChain: {}
}

export interface Extension extends Base, Fn<TypeCallParams>, TypeHooks {}

interface Base {
  /**
   * The name of the extension
   */
  name: string
  /**
   * Anyware executed on every request.
   */
  onRequest?: Anyware.Extension2<Core.Core>
  /**
   * Hook into "get" events on the builder proxy. Useful for adding new methods or manipulating existing ones.
   *
   * Invoked when a non-record-like-object is reached. For example these:
   *
   * - graffle.use (property: "use")
   * - graffle.query.foo (property: "foo", path: ["query"])
   *
   * Return nothing/`undefined` to passthrough.
   *
   * Anything else returned becomes the result of the proxy "get" event.
   *
   * When there are multiple extensions with "onBuilderGet" handlers they form a execution stack starting from the first registered extension.
   * The first handler to return something short circuits the rest.
   */
  onBuilderGet?: (
    input: {
      context: Context
      path: string[]
      property: string
      client: Client<null, Config>
    },
  ) => unknown
}

export const createExtension = <$Extension extends Extension = Extension>(
  // type hooks
  extension: Omit<HKT.Remove<$Extension>, keyof TypeHooks>,
): $Extension => {
  return extension as $Extension
}
