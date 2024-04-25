import type { ExecutionResult } from 'graphql'
import type { GraphQLExecutionResultError } from '../lib/graphql.js'
import type { SetProperty } from '../lib/prelude.js'

export type ReturnModeType =
  | ReturnModeTypeGraphQL
  | ReturnModeTypeData
  | ReturnModeTypeDataAndSchemaErrors
  | ReturnModeTypeDataAllErrors

export type ReturnModeTypeBase = ReturnModeTypeGraphQL | ReturnModeTypeData | ReturnModeTypeDataAllErrors

export type ReturnModeTypeGraphQL = 'graphql'

export type ReturnModeTypeData = 'data'

export type ReturnModeTypeDataAllErrors = 'dataAndAllErrors'

export type ReturnModeTypeDataAndSchemaErrors = 'dataAndSchemaErrors'

export type OptionsInput = {
  returnMode: ReturnModeType | undefined
}

export type OptionsInputDefaults = {
  returnMode: 'data'
}

export type Config = {
  returnMode: ReturnModeType
}

export type ApplyInputDefaults<Input extends OptionsInput> = {
  [Key in keyof OptionsInputDefaults]: undefined extends Input[Key] ? OptionsInputDefaults[Key]
    : Exclude<Input[Key], undefined>
}

// dprint-ignore
export type ReturnMode<$Config extends Config, $Data, $DataRaw = undefined> =
  $Config['returnMode'] extends 'graphql'     ? ExecutionResult<$DataRaw extends undefined ? $Data : $DataRaw> :
  $Config['returnMode'] extends 'data'        ? $Data :
                                                $Data | GraphQLExecutionResultError

export type OrThrowifyConfig<$Config extends Config> = $Config['returnMode'] extends 'graphql' ? $Config
  : SetProperty<$Config, 'returnMode', 'data'>
