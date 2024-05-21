import type { Values } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { Schema } from '../1_Schema/__.js'

declare global {
  export namespace GraphQLRequestTypes {
    interface Schemas {}
    // Use this is for manual internal type testing.
    // interface SchemasAlwaysEmpty {}
  }
}

type SomeSchema = {
  index: Schema.Index
  customScalars: Record<string, Schema.Scalar.Scalar>
  featureOptions: {
    schemaErrors: boolean
  }
}

type ZeroSchema = {
  index: { name: never }
  featureOptions: {
    schemaErrors: false
  }
}

export type GlobalRegistry = Record<string, SomeSchema>

export namespace GlobalRegistry {
  export type Schemas = GraphQLRequestTypes.Schemas

  export type IsEmpty = keyof Schemas extends never ? true : false

  export type SchemaList = IsEmpty extends true ? ZeroSchema : Values<Schemas>

  export type DefaultSchemaName = 'default'

  export type SchemaNames = keyof GraphQLRequestTypes.Schemas extends never
    ? TSError<'SchemaNames', 'No schemas have been registered. Did you run graphql-request generate?'>
    : keyof GraphQLRequestTypes.Schemas

  export type HasSchemaErrors<$Schema extends SchemaList> = $Schema['featureOptions']['schemaErrors']

  export type HasSchemaErrorsViaName<$Name extends SchemaNames> =
    // todo use conditional types?
    // eslint-disable-next-line
    // @ts-ignore passes after generation
    GraphQLRequestTypes.Schemas[$Name]['featureOptions']['schemaErrors']

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type GetSchemaIndex<$Name extends SchemaNames> = GraphQLRequestTypes.Schemas[$Name]['index']

  // eslint-disable-next-line
  // @ts-ignore passes after generation
  export type SchemaIndexDefault = GetSchemaIndex<DefaultSchemaName>

  export type GetSchemaIndexOrDefault<$Name extends SchemaNames | undefined> = $Name extends SchemaNames
    ? GetSchemaIndex<$Name>
    : SchemaIndexDefault
}
