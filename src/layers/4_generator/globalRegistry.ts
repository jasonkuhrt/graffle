import type { TypeFunction } from '../../entrypoints/utilities-for-generated.js'
import type { ConfigManager } from '../../lib/config-manager/__.js'
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

interface ZeroClient extends GlobalRegistry.RegisteredSchema {
  name: GlobalRegistry.DefaultSchemaName
  schema: Schema
  interfaces: {
    Root: TypeFunction.Fn
    Document: TypeFunction.Fn
    MethodsSelect: {}
  }
  defaultSchemaUrl: null
}

export type GlobalRegistry = Record<string, GlobalRegistry.RegisteredSchema>

export namespace GlobalRegistry {
  export type TypeExtensions = Record<string, Record<string, unknown>>

  export type Extensions<
    $Extensions extends { Schema?: TypeExtensions } = {
      Schema: TypeExtensions
    },
  > = {
    Schema: ConfigManager.OrDefault<$Extensions['Schema'], TypeExtensions>
  }

  export interface RegisteredSchema<$Extensions extends Extensions = Extensions> {
    name: string
    schema: Schema<$Extensions['Schema']>
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

  export type Clients = GraffleGlobal.Schemas // todo rename to Clients

  export type IsEmpty = keyof Clients extends never ? true : false

  export type ClientUnion = IsEmpty extends true ? ZeroClient : Values<Clients>

  export type SchemaNames = keyof GraffleGlobal.Schemas extends never
    ? TSErrorDescriptive<'SchemaNames', 'No schemas have been registered. Did you run graffle generate?'>
    : keyof GraffleGlobal.Schemas

  // dprint-ignore
  export type HasDefaultUrlForSchema<$Schema extends ClientUnion> =
    $Schema['defaultSchemaUrl'] extends null
      ? false
      : true

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type GetSchema<$Name extends SchemaNames> = GraffleGlobal.Schemas[$Name]['schema']

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type SchemaDefault = GetSchema<DefaultSchemaName>

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
  export type GetSchemaOrDefault<$Name extends SchemaNames | undefined> =
    $Name extends SchemaNames
      ? GetSchema<$Name>
      : SchemaDefault
}
