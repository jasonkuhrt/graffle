/* eslint-disable @typescript-eslint/ban-types */

export interface Index {
  unions: {
    Union: null | Union
    // root: null | Object
  }
  Root: {
    Query: null | Object
    Mutation: null | Object
    Subscription: null | Object
  }
  scalars: object
  objects: Record<string, Object>
  unionMemberNames: Record<string, string>
}

export type Nullable = null
// todo needs to be extensible for custom scalars...
export type Scalar = string | boolean | number // Schema.$.Scalars[keyof Schema.$.Scalars]
export type Object = { __typename: { args: null; type: string } }
export type Union = { __unionname: string; type: Object }
export type Node = Object | Union | Scalar | Nullable

export type FieldBase<$Type extends Node> = { args: null | Args; type: $Type; nullable: boolean }
export type NullableField = FieldBase<Nullable>
export type ScalarField = FieldBase<Scalar>
export type ObjectField = FieldBase<Object>
export type unionField = FieldBase<Union>
export type Field = FieldBase<Node>

export type Args = { type: object; allOptional: boolean }

export type AsField<T> = T extends Field ? T : never
