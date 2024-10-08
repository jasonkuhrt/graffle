import type { Nodes } from '../../lib/grafaid/_Nodes.js'
import type { Codec } from '../1_Schema/Hybrid/types/Scalar/codec.js'
import type { Select } from '../2_Select/__.js'
import type { CustomScalarsIndex } from '../4_generator/generators/SchemaIndex.js'
import type { ValueMapper } from './nodes/Value.js'

export interface Context {
  captures: Captures
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

export type CodecString = Codec<any, string>

export const isCodec = (value: unknown): value is CodecString =>
  typeof value === `object` && value !== null && `encode` in value && typeof value.encode === `function`

type RootIndexPointer =
  | CustomScalarsIndex
  | IndexPointer

type IndexPointer =
  | CustomScalarsIndex
  | CustomScalarsIndex.OutputObject
  | CustomScalarsIndex.InputObject
  | CustomScalarsIndex.InputField
  | null

export const advanceIndex = (pointer: RootIndexPointer, rootTypeOrSomeKey: string): IndexPointer => {
  if (pointer === null) return pointer
  if (isCodec(pointer)) return pointer
  return (pointer as any)[rootTypeOrSomeKey] ?? null
}

export type GraphQLNodeMapper<
  $Return extends Nodes.$Any,
  $Args extends [...any[]] = [],
  $ContextExtension extends object = {},
> = (
  ...args: [
    context: Context & $ContextExtension,
    customScalarsIndexPointer: IndexPointer,
    ...$Args,
  ]
) => $Return

export interface Field {
  name: string
  alias: string | null
  value: Select.SelectionSet.Any
}
