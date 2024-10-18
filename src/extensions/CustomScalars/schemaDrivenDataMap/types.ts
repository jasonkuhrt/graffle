import { Scalar, type Scalar as SchemaScalar } from '../../../layers/1_Schema/_.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'

declare global {
  namespace GraffleGlobal {
    export interface SchemaDrivenDataMap {
      roots: {
        [Grafaid.Schema.RootTypeName.Mutation]?: SchemaDrivenDataMap.OutputObject
        [Grafaid.Schema.RootTypeName.Query]?: SchemaDrivenDataMap.OutputObject
        [Grafaid.Schema.RootTypeName.Subscription]?: SchemaDrivenDataMap.OutputObject
      }
      types: Record<string, NamedLike>
      directives: Record<string, SchemaDrivenDataMap.ArgumentsOrInputObjectFields>
    }

    namespace SchemaDrivenDataMap {
      export interface Enum {
        k: `enum`
        n: string
      }

      export interface OutputObject {
        /**
         * Fields of this output object.
         */
        f: {
          [key: string]: OutputField
        }
      }

      export interface OutputField {
        /**
         * The field's arguments, if any.
         *
         * Present when one of:
         * - operationVariables is enabled and field has arguments.
         * - customScalars is enabled and field has arguments that contain custom scalars.
         */
        a?: ArgumentsOrInputObjectFields
        /**
         * The field's output type.
         *
         * Present when/as one of:
         * - `CodecString` when customScalars enabled and this field's named type is a custom scalar.
         * - `OutputObject` when customScalars enabled and this field's type contains custom scalars.
         */
        nt?: OutputLike
      }

      export interface ArgumentsOrInputObjectFields {
        [key: string]: ArgumentOrInputField
      }

      export interface ArgumentOrInputField {
        /**
         * Inline types (nullable/non-nullable, list) of this argument or input field. Only present when operationVariables is enabled.
         */
        it?: InlineType
        /**
         * Named type of this argument or input field. Only present when customScalars is enabled.
         */
        nt?: InputLike
      }

      export interface InputObject {
        /**
         * Field names within this input object that are or transitively contain custom scalars.
         *
         * This is only present when operationVariables is enabled, because that feature requires
         * all input object fields to be mapped, thus requiring a meta field to identify the custom scalar ones.
         */
        fcs?: string[]
        /**
         * Name of the input object. Only present when "variables" is enabled.
         */
        n?: string
        /**
         * Fields of the input object.
         */
        f?: {
          [key: string]: ArgumentOrInputField
        }
      }
    }
  }
}

export type SchemaDrivenDataMap = GraffleGlobal.SchemaDrivenDataMap

export type OutputObject = GraffleGlobal.SchemaDrivenDataMap.OutputObject

export type OutputField = GraffleGlobal.SchemaDrivenDataMap.OutputField

export type InputObject = GraffleGlobal.SchemaDrivenDataMap.InputObject

export type Enum = GraffleGlobal.SchemaDrivenDataMap.Enum

export type ArgumentsOrInputObjectFields = GraffleGlobal.SchemaDrivenDataMap.ArgumentsOrInputObjectFields

export type Scalar = SchemaScalar.Scalar

export type ArgumentOrInputField = GraffleGlobal.SchemaDrivenDataMap.ArgumentOrInputField

export const propertyNames = {
  k: `k`,
  n: `n`,
  it: `it`,
  fcs: `fcs`,
  f: `f`,
  a: `a`,
  nt: `nt`,
} as const

/**
 * Inline types for a field-like (directive argument, field argument, input/output field) type.
 *
 * Nested tuple. Each nesting represents a list. First tuple member represents nullability of the list.
 *
 * The outer most tuple represents not a list but the nullability for the named type itself. E.g. `[0]` would indicate
 * that a scalar field is nullable while `[1]` would indicate that it is non-nullable.
 */
export type InlineType = [Nullable | NonNull, InlineType?]

export type Nullable = 0

export type NonNull = 1

export const isEnum = (
  node?: Node,
): node is Enum => {
  return node ? `k` in node && node.k === `enum` : false
}

export const isScalar = Scalar.isScalar

export const isOutputObject = (
  node?: Node,
): node is OutputObject => {
  return node ? propertyNames.f in node : false
}

export const nullabilityFlags = {
  'nullable': 0,
  'nonNull': 1,
} as const

// todo not the best check, type has to limit to input like nodes since the check cannot tell input and output apart
// so it would be unsafe to rely on it if output objects could also be passed in.
// fixing this 1) means branding the data which means more bytes in the sddm
// or 2) means using a different key hint like `if` for "input field".
export const isInputObject = (
  node?: InputLike,
): node is InputObject => {
  return node ? propertyNames.f in node : false
}

export const isOutputField = (
  node?: Node,
): node is GraffleGlobal.SchemaDrivenDataMap.OutputField => {
  return node ? `a` in node : false
}

export type NamedLike = SchemaScalar.Scalar | OutputObject | Enum | InputObject

export type OutputLike = SchemaScalar.Scalar | OutputObject | Enum

export type InputLike = SchemaScalar.Scalar | InputObject | Enum

export type Node =
  | OutputObject
  | InputObject
  | ArgumentsOrInputObjectFields
  | ArgumentOrInputField
  | InlineType
  | SchemaDrivenDataMap
  | Scalar
  | Enum
