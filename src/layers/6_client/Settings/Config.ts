import type { ExecutionResult } from 'graphql'
import type { Simplify } from 'type-fest'
import type { GraphQLExecutionResultError } from '../../../lib/graphql.js'
import type { ConfigManager, StringKeyof } from '../../../lib/prelude.js'
import type { Schema } from '../../1_Schema/__.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import type { SelectionSet } from '../../3_SelectionSet/__.js'

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

export const traditionalGraphqlOutput: OutputConfig = {
  defaults: { errorChannel: `throw` },
  envelope: { enabled: true, errors: { execution: true, other: false, schema: false } },
  errors: { execution: `default`, other: `default`, schema: false },
}
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

// export type ReturnModeType =
//   | ReturnModeTypeGraphQL
//   | ReturnModeTypeGraphQLSuccess
//   | ReturnModeTypeDataSuccess
//   | ReturnModeTypeData
//   | ReturnModeTypeDataAndErrors

export type ReturnModeTypeBase =
  | ReturnModeTypeGraphQLSuccess
  | ReturnModeTypeGraphQL
  | ReturnModeTypeDataAndErrors
  | ReturnModeTypeData

export type ReturnModeTypeGraphQLSuccess = 'graphqlSuccess'

export type ReturnModeTypeGraphQL = 'graphql'

export type ReturnModeTypeData = 'data'

export type ReturnModeTypeDataAndErrors = 'dataAndErrors'

export type ReturnModeTypeDataSuccess = 'dataSuccess'

// export type OptionsInput = {
//   returnMode: ReturnModeType | undefined
// }

export type OptionsInputDefaults = {
  returnMode: 'data'
}

export type Config = {
  output: OutputConfig
}

// export type ApplyInputDefaults<$Input extends OptionsInput> = {
//   [Key in keyof OptionsInputDefaults]: undefined extends $Input[Key] ? OptionsInputDefaults[Key]
//     : Exclude<$Input[Key], undefined>
// }

// dprint-ignore
export type ResolveOutputReturnRootType<$Config extends Config, $Index extends Schema.Index, $Data extends object> =
 | IfConfiguredGetOutputErrorReturns<$Config>
 | (
      $Config['output']['envelope']['enabled'] extends true
        ? ExecutionResult<IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data>>
        : Simplify<IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, $Data>>
   )

// dprint-ignore
export type ResolveOutputReturnRootField<$Config extends Config, $Index extends Schema.Index, $Data, $DataRaw = undefined> =
  | IfConfiguredGetOutputErrorReturns<$Config>
  | (
      $Config['output']['envelope']['enabled'] extends true
        // todo: a typed execution result that allows for additional error types.
        // currently it is always graphql execution error however envelope configuration can put more errors into that.
        ? ExecutionResult<IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, $DataRaw extends undefined ? $Data : $DataRaw>>
        : Simplify<IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data>>
    )

type ConfigResolveOutputErrorChannel<$Config extends Config, $Channel extends OutputChannelConfig | false> =
  $Channel extends 'default' ? $Config['output']['defaults']['errorChannel']
    : $Channel extends false ? false
    : $Channel

// dprint-ignore
type ConfigGetOutputEnvelopeErrorChannel<$Config extends Config, $ErrorCategory extends ErrorCategory> =
  $Config['output']['envelope']['errors'][$ErrorCategory] extends true
    ? false
    : ConfigResolveOutputErrorChannel<$Config, $Config['output']['errors'][$ErrorCategory]>

// dprint-ignore
type ConfigGetOutputError<$Config extends Config, $ErrorCategory extends ErrorCategory> =
  $Config['output']['envelope']['enabled'] extends true
    ? ConfigGetOutputEnvelopeErrorChannel<$Config, $ErrorCategory>
    : ConfigResolveOutputErrorChannel<$Config, $Config['output']['errors'][$ErrorCategory]>

// dprint-ignore
type IfConfiguredGetOutputErrorReturns<$Config extends Config> =
  | (ConfigGetOutputError<$Config, 'execution'>  extends 'return'  ? GraphQLExecutionResultError  : never)
  | (ConfigGetOutputError<$Config, 'other'>      extends 'return'  ? Error                        : never)
  | (ConfigGetOutputError<$Config, 'schema'>      extends 'return' ? Error                        : never)

// dprint-ignore
type IfConfiguredStripSchemaErrorsFromDataRootType<$Config extends Config, $Index extends Schema.Index, $Data> =
  { [$RootFieldName in keyof $Data]: IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data[$RootFieldName]> }

// dprint-ignore
type IfConfiguredStripSchemaErrorsFromDataRootField<$Config extends Config, $Index extends Schema.Index, $Data> =
  $Config['output']['errors']['schema'] extends false
    ? $Data
    : ExcludeSchemaErrors<$Index, $Data>

// dprint-ignore
export type ExcludeSchemaErrors<$Index extends Schema.Index, $Data> =
  Exclude<
    $Data,
    $Index['error']['objectsTypename'][keyof $Index['error']['objectsTypename']]
  >

// todo this changed, check tests, add new tests as needed.
// dprint-ignore
export type OrThrowifyConfig<$Config extends Config> =
  ConfigManager.Set<$Config, ['output', 'errors'], { other: 'throw', execution: 'throw', schema: 'throw' }>

/**
 * We inject __typename select when:
 * 1. using schema errors
 * 2. using return mode dataSuccess
 */

type TypenameSelection = { __typename: true }

// dprint-ignore
export type CreateSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  IsNeedSelectionTypename<$Config, $Index> extends true ? TypenameSelection : {} // eslint-disable-line

// dprint-ignore
export type IsNeedSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  ConfigGetOutputError<$Config, 'schema'> extends 'throw'
    ? GlobalRegistry.HasSchemaErrorsViaName<$Index['name']> extends true
      ? true
      : false
    : false

export type AugmentRootTypeSelectionWithTypename<
  $Config extends Config,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $Selection extends object,
> = IsNeedSelectionTypename<$Config, $Index> extends true ? {
    [$Key in StringKeyof<$Selection>]:
      & $Selection[$Key]
      & (IsRootFieldNameAResultField<$Index, $RootTypeName, $Key> extends true ? TypenameSelection : {}) // eslint-disable-line
  }
  : $Selection

type IsRootFieldNameAResultField<
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $FieldName extends string,
> = SelectionSet.AliasNameOrigin<$FieldName> extends keyof $Index['error']['rootResultFields'][$RootTypeName] ? true
  : false
