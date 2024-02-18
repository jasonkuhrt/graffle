import type * as Schema from '../demo.js'
import type { TSError } from './TSError.js'

type ScalarType = Schema.$.Scalars[keyof Schema.$.Scalars]
type ObjectType = object
// type SelectableFieldsType = ObjectType

type SelectionIndicator = boolean | 1 | 0

// todo if is a union type then must have each union member become an on_... field
// dprint-ignore
export type SelectionSet<T> =
	T extends ObjectType 	? SelectionSetObject<T> :
	T extends ScalarType 	? SelectionIndicator :
													TSError<'SelectionSet', 'T is not a SelectableFieldsType',{ T:T }>

// todo an empty selection set should be a static type error
type SelectionSetObject<$ObjectType extends ObjectType> =
  & {
    [Key in keyof $ObjectType]?: SelectionSet<Exclude<$ObjectType[Key], null>>
  }
  & {
    __typename?: SelectionIndicator
  }
