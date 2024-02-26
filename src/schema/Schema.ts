/* eslint-disable @typescript-eslint/ban-types */

import type { Letter } from '../lib/prelude.js'

export interface Index {
  Root: {
    Query: null | Object
    Mutation: null | Object
    Subscription: null | Object
  }
  objects: Record<string, Object>
  unions: {
    Union: null | Union
  }
  scalars: object
  unionMemberNames: Record<string, string>
}

// export type Nullable = null
// todo needs to be extensible for custom scalars...
export type Scalar = string | boolean | number // Schema.$.Scalars[keyof Schema.$.Scalars]
export type Object = { __typename: FieldTypename }
export type Union = { __unionname: string; type: Object }
export type Literal = string
export type Named = Scalar | Object | Union | Literal
export type Node = Object | Union | Scalar // | Nullable

export type FieldTypeNamed = { kind: 'named'; named: any }
export type FieldTypeLiteral = { kind: 'literal'; value: string }
export type FieldTypeList = { kind: 'list'; type: any }
export type FieldTypeNullable = { kind: 'nullable'; type: any }
export type FieldType = FieldTypeNamed | FieldTypeList | FieldTypeNullable | FieldTypeLiteral

export type Field<$Named extends Named = Named> = {
  args: null | FieldArgs
  type: FieldType
  namedType: $Named
}
export type FieldScalar = Field<Scalar>
export type FieldObject = Field<Object>
export type FieldUnion = Field<Union>
export type FieldTypename = { args: null; type: FieldTypeLiteral; namedType: string }

export type FieldArgs = { type: object; allOptional: boolean }

export type AsField<T> = T extends Field ? T : never

// dprint-ignore
export type NameParse<T extends string> =
  T extends NameHead ? T :
  T extends `${NameHead}${infer Rest}` ? Rest  extends NameBodyParse<Rest> ? T
  : never
  : never

// dprint-ignore
export type NameBodyParse<S extends string> =
  S extends NameBody                    ? S :
  S extends `${NameBody}${infer Rest}`  ? NameBodyParse<Rest> extends string ? S
  : never
  : never

export type NameHead = Letter
export type NameBody = Letter | '_'
