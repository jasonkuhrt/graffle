import type { Extension, ObjectTypeHookParams, OutputFieldHookParams } from './types.js'

export interface Input {
  name: string
  schemaDrivenDataMap?: {
    onObjectType?: (input: ObjectTypeHookParams) => void
    onOutputField?: (input: OutputFieldHookParams) => void
  }
}

export const createExtension = (input: Input): Extension => {
  return input
}
