import type { GraphQLSchema } from 'graphql'
import type { SchemaDrivenDataMap } from '../../../extensions/CustomScalars/schemaDrivenDataMap/__.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { WithInput } from './inputIncrementable/inputIncrementable.js'

export type URLInput = URL | string

export type InputOutputEnvelopeLonghand = {
  /**
   * @defaultValue `true`
   */
  enabled?: boolean
  errors?: {
    execution?: boolean
    other?: boolean
  }
}

/**
 * @remarks This input extends base with properties that can be filled with exports from the generated client.
 */
export type InputStatic<$RegisteredClient extends GlobalRegistry.ClientUnion = GlobalRegistry.ClientUnion> =
  & InputBase<$RegisteredClient>
  & {
    /**
     * The schema to use.
     *
     * TODO why don't we infer this from the runtime schemaIndex?
     *
     * @defaultValue 'default'
     */
    name?: $RegisteredClient['name']
    /**
     * todo
     */
    readonly schemaMap?: SchemaDrivenDataMap | null
  }

// TODO use code generation to display
// TODO test that schema is optional when introspection was used to generate client.
// dprint-ignore
export type InputBase<$RegisteredClient extends GlobalRegistry.ClientUnion> =
  | (
      & (
          GlobalRegistry.HasDefaultUrlForSchema<$RegisteredClient> extends true
          ? {
              /**
               * @defaultValue The introspection URL used to generate this Graffle client.
               */
              schema?: URLInput
            }
          : {
            schema: URLInput
          }
        )
      // eslint-disable-next-line
      // @ts-ignore passes after generation
      & WithInput<{ name: $RegisteredClient['name']; transport: { type: 'http'} }>
    )
  | (
      & (
          GlobalRegistry.HasDefaultUrlForSchema<$RegisteredClient> extends true
          ? {
              /**
               * TODO this TSDoc is never rendered in VSCode...
               * @defaultValue The introspection URL used to generate this Graffle client.
               */
              schema?: GraphQLSchema
            }
          : { schema: GraphQLSchema }
        )
      // eslint-disable-next-line
      // @ts-ignore passes after generation
      & WithInput<{ name: $RegisteredClient['name']; transport: { type: 'memory'} }>
    )
