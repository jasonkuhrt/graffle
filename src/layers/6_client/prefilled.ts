import type { HasRequiredKeys } from 'type-fest'
import type { SchemaDrivenDataMap } from '../../extensions/CustomScalars/schemaDrivenDataMap/__.js'
import type { Exact } from '../../lib/prelude.js'
import type { GlobalRegistry } from '../4_generator/globalRegistry.js'
import { type Client, create } from './client.js'
import type { InputBase } from './Settings/Input.js'
import type { NormalizeInput } from './Settings/InputToConfig.js'

/**
 * Create a constructor with some fields prefilled. Fields that can be prefilled are:
 * - `name`
 * - `schemaIndex`
 * - `schema` (If introspection was used for code generation, then is prefilled to the URL that was used.)
 */
export const createPrefilled: CreatePrefilled = (name, schemaMap, schemaUrl) => {
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  return ((input) => create({ schema: schemaUrl, ...input, name, schemaMap })) as any
}

// dprint-ignore
export type CreatePrefilled =
<const $Name extends GlobalRegistry.SchemaNames>(name: $Name, sddm: SchemaDrivenDataMap, schemaUrl?: URL) =>
	<
		// eslint-disable-next-line
		// @ts-ignore passes after generation
		$Input extends InputPrefilled<GlobalRegistry.Clients[$Name]>,
	>(...args:
		// eslint-disable-next-line
		// @ts-ignore passes after generation
		HasRequiredKeys<InputPrefilled<GlobalRegistry.Clients[$Name]>> extends true
			// eslint-disable-next-line
			// @ts-ignore passes after generation
			? [input: Exact<$Input, InputPrefilled<GlobalRegistry.Clients[$Name]>>]
			// TODO test that input optional when no required properties
			// eslint-disable-next-line
			// @ts-ignore passes after generation
			: ([input: Exact<$Input, InputPrefilled<GlobalRegistry.Clients[$Name]>>] | [])
	) =>
		// eslint-disable-next-line
		// @ts-ignore passes after generation
 		Client<{
			// @ts-expect-error fixme - TS cannot figure out that name input meets constraint
			config: NormalizeInput<$Input & { name: $Name, schemaMap: SchemaDrivenDataMap }>,
		}>

// dprint-ignore
export type InputPrefilled<$Schema extends GlobalRegistry.ClientUnion> =
	$Schema extends any
		? InputBase<$Schema>
		: never
