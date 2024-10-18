import type { Extension, ObjectTypeHookParams, OutputFieldHookParams, SchemaHookParams } from './types.js'

export interface Input {
  name: string
  onSchema?: (input: SchemaHookParams) => void
  schemaDrivenDataMap?: {
    onObjectType?: (input: ObjectTypeHookParams) => void
    onOutputField?: (input: OutputFieldHookParams) => void
  }
}

export const createExtension = (input: Input): Extension => {
  return input
}
