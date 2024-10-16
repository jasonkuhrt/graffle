import type { TypeFunction } from '../../entrypoints/utilities-for-generated.js'
import type { Values } from '../../lib/prelude.js'
import type { TSErrorDescriptive } from '../../lib/ts-error.js'
import type { Schema } from './generators/Schema.js'

declare global {
  export namespace GraffleGlobal {
    interface Schemas {}
    // Use this is for manual internal type testing.
    interface SchemasAlwaysEmpty {}
  }
}

type ZeroSchema = {
  name: GlobalRegistry.DefaultSchemaName
  index: { name: never }
  // featureOptions: {}
  interfaces: {
    MethodsSelect: {}
  }
  defaultSchemaUrl: null
}

export type GlobalRegistry = Record<string, GlobalRegistry.RegisteredSchema>

export namespace GlobalRegistry {
  export interface RegisteredSchema {
    name: string
    index: Schema
    // featureOptions: {}
    interfaces: {
      Root: TypeFunction.Fn
      Document: TypeFunction.Fn
      MethodsSelect: {}
    }
    /**
     * If the code was generated with introspection, the URL used is taken as the default schema URL.
     */
    defaultSchemaUrl: string | null
  }

  export type DefaultSchemaName = 'default'

  export type Schemas = GraffleGlobal.Schemas

  export type IsEmpty = keyof Schemas extends never ? true : false

  export type SchemaUnion = IsEmpty extends true ? ZeroSchema : Values<Schemas>

  export type SchemaNames = keyof GraffleGlobal.Schemas extends never
    ? TSErrorDescriptive<'SchemaNames', 'No schemas have been registered. Did you run graffle generate?'>
    : keyof GraffleGlobal.Schemas

  // dprint-ignore
  export type HasDefaultUrlForSchema<$Schema extends SchemaUnion> =
    $Schema['defaultSchemaUrl'] extends null
      ? false
      : true

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type GetSchemaIndex<$Name extends SchemaNames> = GraffleGlobal.Schemas[$Name]['index']

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type SchemaIndexDefault = GetSchemaIndex<DefaultSchemaName>

  // dprint-ignore
  export type GetOrDefault<$Name extends SchemaNames | undefined> =
    $Name extends SchemaNames
      // eslint-disable-next-line
      // @ts-ignore passes after generation
      ? GraffleGlobal.Schemas[$Name]
      // eslint-disable-next-line
      // @ts-ignore passes after generation
      : GraffleGlobal.Schemas[DefaultSchemaName]

  // dprint-ignore
  export type GetSchemaIndexOrDefault<$Name extends SchemaNames | undefined> =
    $Name extends SchemaNames
      ? GetSchemaIndex<$Name>
      : SchemaIndexDefault
}
