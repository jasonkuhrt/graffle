import type { RequireProperties, StringKeyof } from '../../../lib/prelude.js'
import type { Schema } from '../../1_Schema/__.js'
import type { Select } from '../../2_Select/__.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { Transport } from '../../5_core/types.js'
import type { ConfigGetOutputError } from '../handleOutput.js'
import type { TransportHttpInput } from '../transportHttp/request.js'
import type { InputStatic } from './Input.js'

export type OutputChannel = 'throw' | 'return'

export type OutputChannelConfig = 'throw' | 'return' | 'default'

export type ErrorCategory = 'execution' | 'other' | 'schema'

export const readConfigErrorCategoryOutputChannel = (
  config: Config,
  errorCategory: ErrorCategory,
): OutputChannel | false => {
  if (config.output.errors[errorCategory] === `default`) {
    return config.output.defaults.errorChannel
  }
  return config.output.errors[errorCategory]
}

export const traditionalGraphqlOutput = {
  defaults: { errorChannel: `throw` },
  envelope: { enabled: true, errors: { execution: true, other: false, schema: false } },
  errors: { execution: `default`, other: `default`, schema: false },
} satisfies OutputConfig

export const traditionalGraphqlOutputThrowing: OutputConfig = {
  ...traditionalGraphqlOutput,
  envelope: {
    ...traditionalGraphqlOutput.envelope,
    errors: {
      ...traditionalGraphqlOutput.envelope.errors,
      execution: false,
    },
  },
}

export const isContextConfigTraditionalGraphQLOutput = (config: Config) => {
  return config.output.envelope.enabled && config.output.envelope.errors.execution
    && !config.output.envelope.errors.other && !config.output.envelope.errors.schema
}

export type OutputConfig = {
  defaults: {
    errorChannel: OutputChannel
  }
  envelope: {
    enabled: boolean
    errors: {
      execution: boolean
      other: boolean
      schema: boolean
    }
  }
  errors: {
    execution: OutputChannelConfig
    other: OutputChannelConfig
    schema: false | OutputChannelConfig
  }
}

export const outputConfigDefault: OutputConfigDefault = {
  defaults: {
    errorChannel: `throw`,
  },
  envelope: {
    enabled: false,
    errors: {
      execution: true,
      other: false,
      schema: false,
    },
  },
  errors: {
    execution: `default`,
    other: `default`,
    schema: false,
  },
}

export type OutputConfigDefault = {
  defaults: {
    errorChannel: 'throw'
  }
  envelope: {
    enabled: false
    errors: {
      execution: true
      other: false
      schema: false
    }
  }
  errors: {
    execution: 'default'
    other: 'default'
    schema: false
  }
}

export type Config = {
  /**
   * The initial input that was given to derive this config.
   */
  initialInput: InputStatic<any> // InputStatic<GlobalRegistry.SchemaUnion>
  name: GlobalRegistry.SchemaNames
  output: OutputConfig
  transport: {
    type: Transport
    config: RequireProperties<TransportHttpInput, 'methodMode'>
  }
}

/**
 * We inject __typename select when:
 * 1. using schema errors
 * 2. using return mode dataSuccess
 */

type TypenameSelection = { __typename: true }

// dprint-ignore
export type AddTypenameToSelectedRootTypeResultFields<
  $Config extends Config,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $Selection,
> = IsNeedSelectionTypename<$Config, $Index> extends true
  ? {
      [$RootFieldName in StringKeyof<$Selection>]:
        IsResultField<$Index, $RootTypeName, $RootFieldName> extends false
        ? $Selection[$RootFieldName]
        : $Selection[$RootFieldName] extends Select.SelectAlias.SelectAlias
          ? AddTypenameToAliasInput<$Selection[$RootFieldName]>
          : $Selection[$RootFieldName] & TypenameSelection
    }
  : $Selection

// dprint-ignore
type AddTypenameToAliasInput<$AliasInput extends Select.SelectAlias.SelectAlias> = {
  [$Index in keyof $AliasInput]:
    $AliasInput[$Index] extends Select.SelectAlias.SelectAlias
      ? [$AliasInput[$Index][0], $AliasInput[$Index][1] & TypenameSelection]
      : $AliasInput[$Index]
}

type IsResultField<
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $FieldName extends string,
> = $FieldName & $Index['error']['rootResultFields'][$RootTypeName] extends never ? false
  : true

// dprint-ignore
export type IsNeedSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  ConfigGetOutputError<$Config, 'schema'> extends 'throw'
    ? GlobalRegistry.HasSchemaErrorsViaName<$Index['name']> extends true
      ? true
      : false
    : false
