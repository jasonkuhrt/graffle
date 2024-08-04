import type { Exact, IsSomePropertiesRequired } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import { type Client, create } from './client.js'
import type { InputRaw, InputToConfig } from './Settings/Input.js'

// dprint-ignore
export type CreatePrefilled = <$Name extends GlobalRegistry.SchemaNames>(name: $Name, schemaIndex: Schema.Index, schemaUrl?: URL) => <
	// eslint-disable-next-line
	// @ts-ignore passes after generation
	$Input extends InputPrefilled<GlobalRegistry.Schemas[$Name]>,
>(...args:
	IsSomePropertiesRequired<InputPrefilled<GlobalRegistry.Schemas[$Name]>> extends true
		// eslint-disable-next-line
		// @ts-ignore passes after generation
		? [input: Exact<$Input, InputPrefilled<GlobalRegistry.Schemas[$Name]>>]
		// TODO test that input optional when no required properties
		// eslint-disable-next-line
		// @ts-ignore passes after generation
		: ([input: Exact<$Input, InputPrefilled<GlobalRegistry.Schemas[$Name]>>] | [])
) =>
Client<
	// eslint-disable-next-line
	// @ts-ignore passes after generation
	GlobalRegistry.GetSchemaIndexOrDefault<$Name>,
	InputToConfig<$Input>
>

/**
 * Create a constructor with some fields prefilled. Fields that can be prefilled are:
 * - `name`
 * - `schemaIndex`
 * - `schema` (URL, if introspection was used for code generation)
 */
export const createPrefilled: CreatePrefilled = (name, schemaIndex, schemaUrl) => {
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  return ((input) => create({ schema: schemaUrl, ...input, name, schemaIndex })) as any
}

// dprint-ignore
export type InputPrefilled<$Schema extends GlobalRegistry.SchemaList> =
  $Schema extends any
    ? InputRaw<$Schema>
    : never
