import type { ExecutionResult } from 'graphql'
import type { GlobalRegistry } from '../globalRegistry.js'
import type { GraphQLExecutionResultError } from '../lib/graphql.js'
import type { SetProperty } from '../lib/prelude.js'
import type { Schema } from '../Schema/__.js'

export type ReturnModeType =
  | ReturnModeTypeGraphQL
  | ReturnModeTypeSuccessData
  | ReturnModeTypeData
  | ReturnModeTypeDataAndErrors

export type ReturnModeTypeBase = ReturnModeTypeGraphQL | ReturnModeTypeDataAndErrors | ReturnModeTypeData

export type ReturnModeTypeGraphQL = 'graphql'

export type ReturnModeTypeData = 'data'

export type ReturnModeTypeDataAndErrors = 'dataAndErrors'

export type ReturnModeTypeSuccessData = 'successData'

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
export type ReturnModeRootType<$Config extends Config, $Index extends Schema.Index, $Data extends object> =
  $Config['returnMode'] extends 'graphql'     ? ExecutionResult<$Data> :
  $Config['returnMode'] extends 'data'        ? $Data :
  $Config['returnMode'] extends 'successData' ? { [$Key in keyof $Data]: ExcludeSchemaErrors<$Index, $Data[$Key]> }  :
                                                $Data | GraphQLExecutionResultError

// dprint-ignore
export type ReturnModeRootField<$Config extends Config, $Index extends Schema.Index, $Data, $DataRaw = undefined> =
  $Config['returnMode'] extends 'graphql'     ? ExecutionResult<$DataRaw extends undefined ? $Data : $DataRaw> :
  $Config['returnMode'] extends 'data'        ? $Data :
  $Config['returnMode'] extends 'successData' ? ExcludeSchemaErrors<$Index, $Data> :
                                                $Data | GraphQLExecutionResultError

export type ExcludeSchemaErrors<$Index extends Schema.Index, $Data> = Exclude<
  $Data,
  $Index['error']['objectsTypename'][keyof $Index['error']['objectsTypename']]
>

export type OrThrowifyConfig<$Config extends Config> = $Config['returnMode'] extends 'graphql' ? $Config
  : SetProperty<$Config, 'returnMode', 'successData'>

/**
 * We inject __typename select when:
 * 1. using schema errors
 * 2. using return mode successData
 */

type TypenameSelection = { __typename: true }

// dprint-ignore
export type CreateSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  IsNeedSelectionTypename<$Config, $Index> extends true ? TypenameSelection : {} // eslint-disable-line

// dprint-ignore
export type IsNeedSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  $Config['returnMode'] extends 'successData' ?   GlobalRegistry.HasSchemaErrors<$Index['name']> extends true ?   true :
                                                                                                                  false :
                                                  false
export type AugmentRootTypeSelectionWithTypename<
  $Config extends Config,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $Selection extends object,
> = IsNeedSelectionTypename<$Config, $Index> extends true ? {
    [$Key in keyof $Selection]:
      & $Selection[$Key]
      & ($Key extends keyof $Index['error']['rootResultFields'][$RootTypeName] ? TypenameSelection : {}) // eslint-disable-line
  }
  : $Selection
