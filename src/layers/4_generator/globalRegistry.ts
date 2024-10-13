import type { HKT } from '../../entrypoints/utilities-for-generated.js'
import type { Values } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { SchemaIndex } from './generators/SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    interface Schemas {}
    // Use this is for manual internal type testing.
    interface SchemasAlwaysEmpty {}
  }
}

type SomeSchema = {
  name: string
  index: SchemaIndex
  featureOptions: {
    schemaErrors: boolean
  }
  interfaces: {
    MethodsSelect: {}
    MethodsRoot: HKT.Fn
    Document: HKT.Fn
  }
  /**
   * If the code was generated with introspection, the URL used is taken as the default schema URL.
   */
  defaultSchemaUrl: string | null
}

type ZeroSchema = {
  name: GlobalRegistry.DefaultSchemaName
  index: { name: never }
  featureOptions: {
    schemaErrors: false
  }
  interfaces: {
    MethodsSelect: {}
  }
  defaultSchemaUrl: null
}

export type GlobalRegistry = Record<string, SomeSchema>

export namespace GlobalRegistry {
  export type DefaultSchemaName = 'default'

  export type Schemas = GraffleGlobalTypes.Schemas

  export type IsEmpty = keyof Schemas extends never ? true : false

  export type SchemaUnion = IsEmpty extends true ? ZeroSchema : Values<Schemas>

  export type SchemaNames = keyof GraffleGlobalTypes.Schemas extends never
    ? TSError<'SchemaNames', 'No schemas have been registered. Did you run graffle generate?'>
    : keyof GraffleGlobalTypes.Schemas

  // dprint-ignore
  export type HasDefaultUrlForSchema<$Schema extends SchemaUnion> =
    $Schema['defaultSchemaUrl'] extends null
      ? false
      : true

  // dprint-ignore
  export type HasSchemaErrors<$Schema extends SchemaUnion> =
    $Schema['featureOptions']['schemaErrors']

  export type HasSchemaErrorsViaName<$Name extends SchemaNames> =
    // todo use conditional types?
    // eslint-disable-next-line
    // @ts-ignore passes after generation
    GraffleGlobalTypes.Schemas[$Name]['featureOptions']['schemaErrors']

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type GetSchemaIndex<$Name extends SchemaNames> = GraffleGlobalTypes.Schemas[$Name]['index']

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type SchemaIndexDefault = GetSchemaIndex<DefaultSchemaName>

  // dprint-ignore
  export type GetOrDefault<$Name extends SchemaNames | undefined> =
    $Name extends SchemaNames
      // eslint-disable-next-line
      // @ts-ignore passes after generation
      ? GraffleGlobalTypes.Schemas[$Name]
      // eslint-disable-next-line
      // @ts-ignore passes after generation
      : GraffleGlobalTypes.Schemas[DefaultSchemaName]

  // dprint-ignore
  export type GetSchemaIndexOrDefault<$Name extends SchemaNames | undefined> =
    $Name extends SchemaNames
      ? GetSchemaIndex<$Name>
      : SchemaIndexDefault
}
