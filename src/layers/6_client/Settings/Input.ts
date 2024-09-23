import type { GraphQLSchema } from 'graphql'
import type { Schema } from '../../1_Schema/__.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
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
export type InputStatic<$Schema extends GlobalRegistry.SchemaUnion> =
  & InputBase<$Schema>
  & {
    /**
     * The schema to use.
     *
     * TODO why don't we infer this from the runtime schemaIndex?
     *
     * @defaultValue 'default'
     */
    name?: $Schema['index']['name']
    /**
     * Used internally.
     *
     * When custom scalars are being used, this runtime schema is used to
     * encode/decode them before/after your application sends/receives them.
     *
     * When using root type field methods, this runtime schema is used to assist how arguments on scalars versus objects
     * are constructed into the sent GraphQL document.
     */
    readonly schemaIndex?: Schema.Index | null
    // todo way to hide Relay input pattern of nested input
    // elideInputKey: true,
  }

// TODO use code generation to display
// TODO test that schema is optional when introspection was used to generate client.
// dprint-ignore
export type InputBase<$Schema extends GlobalRegistry.SchemaUnion> =
  | (
      & (
          GlobalRegistry.HasDefaultUrlForSchema<$Schema> extends true
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
      & WithInput<{ name: $Schema['name']; transport: { type: 'http'} }>
    )
  | (
      & (
          GlobalRegistry.HasDefaultUrlForSchema<$Schema> extends true
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
      & WithInput<{ name: $Schema['name']; transport: { type: 'memory'} }>
    )
