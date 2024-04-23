import type { TSError } from './lib/TSError.js'
import type { Schema } from './Schema/__.js'

declare global {
  // todo some kind of distinct prefix
  interface NamedSchemas {}
}

export type GlobalRegistry = Record<string, {
  index: Schema.Index
  customScalars: Record<string, Schema.Scalar.Scalar>
  featureOptions: {
    schemaErrors: boolean
  }
}>

export namespace GlobalRegistry {
  export type Schemas = NamedSchemas

  export type DefaultSchemaName = 'default'

  export type SchemaNames = keyof NamedSchemas extends never
    ? TSError<'SchemaNames', 'No schemas have been registered. Did you run graphql-request generate?'>
    : keyof NamedSchemas

  export type HasSchemaErrors<$Name extends SchemaNames> = NamedSchemas[$Name]['featureOptions']['schemaErrors']

  export type GetSchemaIndexOptionally<$Name extends SchemaNames | undefined> = $Name extends SchemaNames
    ? NamedSchemas[$Name]['index']
    : NamedSchemas['default']['index']
}
