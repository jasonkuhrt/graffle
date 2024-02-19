import type { NonEmptyString } from './prelude.js'
import type {
  ExcludeNull,
  Indicator,
  ObjectType,
  OmitUnionBrand,
  ScalarType,
  SchemaIndex,
  UnionType,
} from './schemaTypes.js'
import type { TSError } from './TSError.js'

// todo if is a union type then must have each union member become an on_... field
// dprint-ignore
export type SelectionSet<T, $Index extends SchemaIndex> =
	T extends ScalarType 	                ? Indicator :
	ExcludeNull<T> extends UnionType 	    ? SelectionSetUnion<ExcludeNull<T>, $Index> & { __typename?: Indicator } :
	T extends ObjectType 	                ? SelectionSetObject<T, $Index> :
													                TSError<'SelectionSet', 'T is not a SelectableFieldsType',{ T:T }>

// todo an empty selection set should be a static type error
type SelectionSetObject<$Object extends ObjectType, $Index extends SchemaIndex> =
  & {
    [Key in keyof $Object]?: SelectionSet<ExcludeNull<$Object[Key]>, $Index>
  }
  /**
   * Alias support.
   * Allow every field to also be given as a key with this pattern `<field>_as_<alias>: ...`
   */
  & {
    [Key in keyof $Object as `${keyof $Object & string}_as_${NonEmptyString}`]?: SelectionSet<
      ExcludeNull<$Object[Key]>,
      $Index
    >
  }

// TODO why does $object no get passed to this in a distributed way?
type SelectionSetUnion<$Object extends ObjectType, $Index extends SchemaIndex> =
  & {
    [Key in $Object['__typename'] as `on${Capitalize<Key>}`]?: SelectionSet<
      OmitUnionBrand<Extract<$Object, { __typename: Key }>>,
      $Index
    >
  }
  & { __typename?: Indicator }
