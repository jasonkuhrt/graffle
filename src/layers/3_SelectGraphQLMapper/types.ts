import type { Grafaid } from '../../lib/grafaid/__.js'
import type { Select } from '../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../7_extensions/CustomScalars/schemaDrivenDataMap/types.js'
import type { ValueMapper } from './nodes/Value.js'

export interface Context {
  /**
   * Should variables be used for arguments?
   */
  variablesEnabled: boolean
  sddm?: SchemaDrivenDataMap
  captures: Captures
  captureVariableForArgument: (input: {
    name: string
    value: any
    sddmArgument: SchemaDrivenDataMap.ArgumentOrInputField
  }) => Grafaid.Document.ArgumentNode
  hooks?: {
    value?: ValueMapper
  }
}

export interface Parsed {
  document: string
  captures: Captures
}

export interface Captures {
  variables: CapturedVariable[]
}

export interface CapturedVariable {
  name: string
  typeName: string
  value: unknown
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

// todo remove location stuff
export type Location = LocationStep[]

export type LocationStep = LocationStepRootType | LocationDirectiveArgument | LocationStepField | LocationStepArgument

export type LocationStepRootType = { type: 'rootType'; name: string }

export type LocationStepField = { type: 'field'; name: string }

export type LocationStepArgument = { type: 'argument'; name: string }

export type GraphQLPreOperationMapper<
  $SDDMNode extends SchemaDrivenDataMap.Node,
  $Return,
  $Args extends [...any[]] = [],
> = (
  ...args: [
    sddmNode: undefined | $SDDMNode,
    ...$Args,
  ]
) => $Return

export type GraphQLPostOperationMapper<
  $SDDMNode extends SchemaDrivenDataMap.Node,
  $Return,
  $Args extends [...any[]] = [],
  $ContextExtension extends object = {},
> = (
  ...args: [
    context: Context & $ContextExtension,
    sddmNode: undefined | $SDDMNode,
    ...$Args,
  ]
) => $Return

export interface Field {
  name: string
  alias: string | null
  value: Select.SelectionSet.Any
}
