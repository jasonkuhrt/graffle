import type { HasRequiredKeys } from 'type-fest'
import type { Exact } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import type { GlobalRegistry } from '../4_generator/globalRegistry.js'
import { type Client, create } from './client.js'
import type { InputBase } from './Settings/Input.js'
import type { InputToConfig } from './Settings/InputToConfig.js'

/**
 * Create a constructor with some fields prefilled. Fields that can be prefilled are:
 * - `name`
 * - `schemaIndex`
 * - `schema` (If introspection was used for code generation, then is prefilled to the URL that was used.)
 */
export const createPrefilled: CreatePrefilled = (name, schemaIndex, schemaUrl) => {
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  return ((input) => create({ schema: schemaUrl, ...input, name, schemaIndex })) as any
}

// dprint-ignore
export type CreatePrefilled =
<const $Name extends GlobalRegistry.SchemaNames>(name: $Name, schemaIndex: Schema.Index, schemaUrl?: URL) =>
	<
		// eslint-disable-next-line
		// @ts-ignore passes after generation
		$Input extends InputPrefilled<GlobalRegistry.Schemas[$Name]>,
	>(...args:
		// eslint-disable-next-line
		// @ts-ignore passes after generation
		HasRequiredKeys<InputPrefilled<GlobalRegistry.Schemas[$Name]>> extends true
			// eslint-disable-next-line
			// @ts-ignore passes after generation
			? [input: Exact<$Input, InputPrefilled<GlobalRegistry.Schemas[$Name]>>]
			// TODO test that input optional when no required properties
			// eslint-disable-next-line
			// @ts-ignore passes after generation
			: ([input: Exact<$Input, InputPrefilled<GlobalRegistry.Schemas[$Name]>>] | [])
	) =>
		// eslint-disable-next-line
		// @ts-ignore passes after generation
 		Client<{
			// @ts-expect-error fixme - TS cannot figure out that name input meets constraint
			config: InputToConfig<$Input & { name: $Name }>,
			schemaIndex: GlobalRegistry.GetSchemaIndexOrDefault<$Name>
		}>

// dprint-ignore
export type InputPrefilled<$Schema extends GlobalRegistry.SchemaUnion> =
	$Schema extends any
		? InputBase<$Schema>
		: never
