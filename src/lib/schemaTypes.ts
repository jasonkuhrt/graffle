export interface SchemaIndex {
  unions: {
    Union: null | ObjectType
    // root: null | ObjectType
  }
  Root: {
    Query: null | ObjectType
    Mutation: null | ObjectType
    Subscription: null | ObjectType
  }
  scalars: object
}

// todo needs to be extensible for custom scalars...
export type ScalarType = string | boolean | number // Schema.$.Scalars[keyof Schema.$.Scalars]
export type ObjectType = { __typename: string }
export type UnionType = ObjectType & { $$union: true }

export type ExcludeNull<T> = Exclude<T, null>
export type OmitUnionBrand<T> = Omit<T, '$$union'>

/**
 * Should this field be selected?
 */
export type ClientIndicator = boolean | 1 | 0

/**
 * Field selection in general, with directives support too.
 * If a field directive is given as an indicator then it implies "select this" e.g. `true`/`1`.
 * Of course the semantics of the directive may change the derived type (e.g. `skip` means the field might not show up in the result set)
 */
export type NoArgsIndicator = ClientIndicator | FieldDirectives

// dprint-ignore
export type Indicator<Type> =
'$' extends keyof Type  ? undefined extends Type['$']   ? (Pick<Type, '$'> & FieldDirectives) | ClientIndicator
                                                        : (Pick<Type, '$'> & FieldDirectives)
                        : NoArgsIndicator

/**
 * @see https://spec.graphql.org/draft/#sec-Type-System.Directives.Built-in-Directives
 */
export interface FieldDirectives {
  /**
   * https://spec.graphql.org/draft/#sec--skip
   */
  $skip?: boolean | { if?: boolean }
  /**
   * https://spec.graphql.org/draft/#sec--include
   */
  $include?: boolean | { if?: boolean }
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#defer
   */
  $defer?: boolean | { if?: boolean; label?: string }
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#stream
   */
  $stream?: boolean | { if?: boolean; label?: string; initialCount?: number }
}
