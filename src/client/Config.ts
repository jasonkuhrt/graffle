import type { ExecutionResult } from 'graphql'

// todo: dataAndErrors | dataAndSchemaErrors
export type ReturnModeType = 'graphql' | 'data'

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
  [Key in keyof OptionsInputDefaults]: undefined extends Input[Key] ? OptionsInputDefaults[Key] : Input[Key]
}

// dprint-ignore
export type ReturnMode<$Config extends Config, $Data> =
  $Config['returnMode'] extends 'graphql' ? ExecutionResult<$Data> : $Data
