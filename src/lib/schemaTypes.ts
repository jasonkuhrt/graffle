export interface Metadata {
  unions: null | ObjectType
  scalars: object
}

// todo needs to be extensible for custom scalars...
export type ScalarType = string | boolean | number // Schema.$.Scalars[keyof Schema.$.Scalars]
export type ObjectType = { __typename: string }
export type UnionType = ObjectType & { $$union: true }

export type ExcludeNull<T> = Exclude<T, null>
export type OmitUnionBrand<T> = Omit<T, '$$union'>

export type Indicator = boolean | 1 | 0
