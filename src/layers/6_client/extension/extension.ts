import type { Anyware } from '../../../lib/anyware/__.js'
import type { FnProperty } from '../../../lib/fluent/Fluent.js'
import type { AssertConstraint } from '../../../lib/prelude.js'
import type { TypeFunction } from '../../../lib/type-function/__.js'
import type { Fn } from '../../../lib/type-function/TypeFunction.js'
import type { Select } from '../../2_Select/__.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { RequestCore } from '../../5_request/__.js'
import type { Client } from '../client.js'
import type { GraffleExecutionResultEnvelope } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'

export interface TypeHooks {
  /**
   * Extend chaining interface with new methods.
   */
  property?: FnProperty
  /**
   * Manipulate the execution result of a request.
   *
   * Applies to all requests.
   */
  onRequestResult?: Extension.Hooks.OnRequestResult
  /**
   * Manipulate the root type in a document in a request.
   *
   * Applies to all requests with typed documents which is all of them except `gql` method when passed a `string`.
   *
   * The root type received is the one that the request's operation name pointed to.
   *
   * Note: There is no way to manipulate the whole document.
   */
  onRequestDocumentRootType?: Extension.Hooks.OnRequestDocumentRootType
}

export type RunTypeHookOnRequestResult<$Config extends Config, $Params extends Extension.Hooks.OnRequestResult.Params> =
  AssertConstraint<
    Extension.Hooks.OnRequestResult.Params,
    TypeFunction.CallPipeline<$Config['typeHooks']['onRequestResult'], $Params>
  >

interface EmptyTypeHooks {
  property: undefined
  onRequestResult: undefined
  onRequestDocumentRootType: undefined
}

export interface Extension<$TypeHooks extends TypeHooks = TypeHooks> extends Base, Fn {
  typeHooks: $TypeHooks
}

export namespace Extension {
  export namespace Hooks {
    export interface OnRequestDocumentRootType extends Fn {}
    export namespace OnRequestDocumentRootType {
      export interface Params {
        selectionRootType: Select.SelectionSet.RootType
      }
    }
    export interface OnRequestResult extends Fn {}
    export namespace OnRequestResult {
      export interface Params {
        result: GraffleExecutionResultEnvelope
        registeredSchema: GlobalRegistry.RegisteredSchema
      }
    }
  }
}

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

export const createExtension = <$Extension extends Extension = Extension<EmptyTypeHooks>>(
  // type hooks
  extension: Omit<TypeFunction.UnFn<$Extension>, 'typeHooks'>,
): $Extension => {
  return extension as $Extension
}
