import type { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../1_Schema/__.js'
import type { Any } from '../nodes/selectionSet.js'

export interface Context {
  schema: Schema.Index
  captures: Captures
}

export interface Parsed {
  document: string
  captures: Captures
}

export interface Captures {
  variables: CapturedVariable[]
  customScalarOutputs: CapturedCustomScalarOutput[]
}

export interface CapturedVariable {
  name: string
  type: unknown
  value: unknown
  location: VariableLocation
}

export interface CapturedCustomScalarOutput {
  type: unknown
  location: OutputLocation
}

export type LocationDirectiveArgument = {
  type: 'directiveArgument'
  argumentName: string
  directiveName: string
}

export type VariableLocation = Location

export type OutputLocation = LocationStepField[]

export type Location = LocationStep[]

export type LocationStep = LocationStepRootType | LocationDirectiveArgument | LocationStepField | LocationStepArgument

export type LocationStepRootType = { type: 'rootType'; name: string }

export type LocationStepField = { type: 'field'; name: string }

export type LocationStepArgument = { type: 'argument'; name: string }

export type GraphQLNodeMapper<$Return extends Nodes.$Any, $Args extends [...any[]] = []> = (
  ...args: [
    context: Context,
    location: Location,
    ...$Args,
  ]
) => $Return

export interface Field {
  name: string
  alias: string | null
  value: Any
}
