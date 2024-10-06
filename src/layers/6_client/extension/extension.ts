import type { Anyware } from '../../../lib/anyware/__.js'
import type { FnProperty } from '../../../lib/fluent/Fluent.js'
import type { HKT } from '../../../lib/hkt/__.js'
import type { Fn } from '../../../lib/hkt/hkt.js'
import type { RequestCore } from '../../5_request/__.js'
import type { Client } from '../client.js'
import type { Config } from '../Settings/Config.js'

export interface TypeHooks {
  /**
   * TODO
   */
  property?: FnProperty
}

export interface Extension extends Base, Fn, TypeHooks {}

interface Base {
  /**
   * The name of the extension
   */
  name: string
  /**
   * Anyware executed on every request.
   */
  onRequest?: Anyware.Extension2<RequestCore.Core>
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
      path: string[]
      property: string
      client: Client<{ schemaIndex: null; config: Config }>
    },
  ) => unknown
}

export const createExtension = <$Extension extends Extension = Extension>(
  // type hooks
  extension: Omit<HKT.UnFn<$Extension>, keyof TypeHooks>,
): $Extension => {
  return extension as $Extension
}
