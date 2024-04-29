import type { RootTypeName } from '../../lib/graphql.js'
import type { Exact } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'

// dprint-ignore
type TypeSelectionSets<$Index extends Schema.Index> =
& {
		[$RootTypeName in RootTypeName as $RootTypeName extends keyof $Index['Root'] ? $Index['Root'][$RootTypeName] extends null ? never : $RootTypeName:never ]:
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

type Create = <$Name extends GlobalRegistry.SchemaNames>(
  name: $Name,
  // eslint-disable-next-line
  // @ts-ignore passes after generation
) => TypeSelectionSets<GlobalRegistry.GetSchemaIndexOrDefault<$Name>>

export const create: Create = (_name) => {
  return idProxy as any
}

const idProxy = new Proxy({}, {
  get: () => (value: unknown) => value,
})

// eslint-disable-next-line
// @ts-ignore generated types
export const select: TypeSelectionSets<GlobalRegistry.SchemaIndexDefault> = idProxy
