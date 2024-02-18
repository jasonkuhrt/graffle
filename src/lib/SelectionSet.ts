import type {
  ExcludeNull,
  Indicator,
  Metadata,
  ObjectType,
  OmitUnionBrand,
  ScalarType,
  UnionType,
} from './schemaTypes.js'
import type { TSError } from './TSError.js'

// todo if is a union type then must have each union member become an on_... field
// dprint-ignore
export type SelectionSet<T, $Metadata extends Metadata> =
	T extends ScalarType 	                ? Indicator :
	ExcludeNull<T> extends UnionType 	    ? SelectionSetUnion<ExcludeNull<T>, $Metadata> & { __typename?: Indicator } :
	T extends ObjectType 	                ? SelectionSetObject<T, $Metadata> :
													                TSError<'SelectionSet', 'T is not a SelectableFieldsType',{ T:T }>

// todo an empty selection set should be a static type error
// dprint-ignore
type SelectionSetObject<$ObjectType extends ObjectType, $Metadata extends Metadata> = {
  [Key in keyof $ObjectType]?: SelectionSet<ExcludeNull<$ObjectType[Key]>, $Metadata>
}

// TODO why does $object no get passed to this in a distributed way?
type SelectionSetUnion<$Object extends ObjectType, $Metadata extends Metadata> =
  & {
    [Key in $Object['__typename'] as `on${Capitalize<Key>}`]?: SelectionSet<
      OmitUnionBrand<Extract<$Object, { __typename: Key }>>,
      $Metadata
    >
  }
  & { __typename?: Indicator }
