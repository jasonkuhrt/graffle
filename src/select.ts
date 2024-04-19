import type { ResultSet } from './client/ResultSet/__.js'
import type { SelectionSet } from './client/SelectionSet/__.js'
import type { Exact } from './lib/prelude.js'
import type { Schema } from './Schema/__.js'

// todo test
// dprint-ignore
type TypeSelectionSets<$Index extends Schema.Index> =
& {
		[$RootTypeName in Schema.RootTypeName]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
				$SelectionSet
	}
& {
		[$Name in keyof $Index['objects']]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Object<$Index['objects'][$Name], $Index>>) =>
				$SelectionSet
	}
& {
		[$Name in keyof $Index['unions']]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Union<$Index['unions'][$Name], $Index>>) =>
				$SelectionSet
	}
& {
		[$Name in keyof Schema.Index['interfaces']]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Interface<$Index['interfaces'][$Name], $Index>>) =>
				$SelectionSet
	}

// todo test
// dprint-ignore
type TypeResultSets<$Index extends Schema.Index> =
& {
		[$RootTypeName in Schema.RootTypeName]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
				ResultSet.Root<$SelectionSet, $Index, $RootTypeName>
	}
& {
		[$Name in keyof $Index['objects']]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Object<$Index['objects'][$Name], $Index>>) =>
				ResultSet.Object$<$SelectionSet, $Index['objects'][$Name], $Index>
	}
& {
		[$Name in keyof $Index['unions']]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Union<$Index['unions'][$Name], $Index>>) =>
				ResultSet.Union<$SelectionSet, $Index['unions'][$Name], $Index>
	}
& {
		[$Name in keyof Schema.Index['interfaces']]:
			<$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Interface<$Index['interfaces'][$Name], $Index>>) =>
				ResultSet.Interface<$SelectionSet, $Index['interfaces'][$Name], $Index>
	}
	
export const create = <$Index extends Schema.Index>(): TypeSelectionSets<$Index> => {
  return idProxy as any
}

const idProxy = new Proxy({}, {
  get: () => (value: unknown) => value,
})
