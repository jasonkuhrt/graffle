import type { MaybeList, NonEmptyString } from './prelude.js'
import type {
  ClientIndicator,
  ExcludeNull,
  FieldDirectives,
  Indicator,
  NoArgsIndicator,
  ObjectType,
  OmitUnionBrand,
  ScalarType,
  SchemaIndex,
  UnionType,
} from './schemaTypes.js'
import type { TSError } from './TSError.js'

type OmitArgs<T> = Omit<T, '$'>

// dprint-ignore
export type SelectionSet<T, $Index extends SchemaIndex> =
	T extends ScalarType 	                ? Indicator<T> :
	ExcludeNull<T> extends UnionType 	    ? SelectionSetUnion<ExcludeNull<T>, $Index> & { __typename?: NoArgsIndicator } :
	T extends ObjectType 	                ? SelectionSetObject<OmitArgs<T>, $Index> & Arguments<T> :
													                TSError<'SelectionSet', 'T is not a SelectableFieldsType', { T:T }>

type SelectionSetObject<$Object extends ObjectType, $Index extends SchemaIndex> =
  & {
    [Key in keyof OmitArgs<$Object>]?: SelectionSet<ExcludeNull<$Object[Key]>, $Index>
  }
  /**
   * Alias support.
   * Allow every field to also be given as a key with this pattern `<field>_as_<alias>: ...`
   */
  & {
    [Key in keyof OmitArgs<$Object> as `${keyof OmitArgs<$Object> & string}_as_${NonEmptyString}`]?: SelectionSet<
      ExcludeNull<$Object[Key]>,
      $Index
    >
  }
  & FieldDirectives
  /**
   * Inline fragments for field groups.
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  & {
    ___?: MaybeList<SelectionSetObject<$Object, $Index>>
  }
  /**
   * Special property to select all scalars.
   */
  & { $scalars?: ClientIndicator }

type Arguments<$FieldType> = '$' extends keyof $FieldType ? Pick<$FieldType, '$'> : {}

// TODO why does $object not get passed to this in a distributed way?
type SelectionSetUnion<$Object extends ObjectType, $Index extends SchemaIndex> =
  & {
    [Key in $Object['__typename'] as `on${Capitalize<Key>}`]?: SelectionSet<
      OmitUnionBrand<Extract<$Object, { __typename: Key }>>,
      $Index
    >
  }
  & { __typename?: NoArgsIndicator }
