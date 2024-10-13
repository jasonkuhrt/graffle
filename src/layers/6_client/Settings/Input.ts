import type { GraphQLSchema } from 'graphql'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { SchemaDrivenDataMap } from '../../7_extensions/CustomScalars/schemaDrivenDataMap/types.js'
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
export type InputStatic<$Schema extends GlobalRegistry.SchemaUnion = GlobalRegistry.SchemaUnion> =
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
     * todo
     */
    readonly schemaMap?: SchemaDrivenDataMap | null
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
