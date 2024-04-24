import type { ExecutionResult } from 'graphql'
import type { GraphQLExecutionResultError } from '../lib/graphql.js'

// todo: dataAndErrors
export type ReturnModeType = ReturnModeTypeGraphQL | ReturnModeTypeData | ReturnModeTypeDataAndSchemaErrors

export type ReturnModeTypeBase = ReturnModeTypeGraphQL | ReturnModeTypeData

export type ReturnModeTypeData = 'data'

export type ReturnModeTypeGraphQL = 'graphql'

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
export type ReturnMode<$Config extends Config, $Data> =
  $Config['returnMode'] extends 'graphql' ? ExecutionResult<$Data> :
                                            $Data | GraphQLExecutionResultError
