import type { ArgsObject } from './arguments.js'
import type { Directive } from './Directive/__.js'
import type { Indicator } from './Indicator/__.js'
import { type SelectAlias } from './SelectAlias.js'

export type RootType = AnySelectionSet

export type AnySelectionSet = {
  [k: string]: FieldValue | ArgsObject
} // & SpecialFields

// interface SpecialFields extends Directive.$Fields {
//   // todo - this requires having the schema at runtime to know which fields to select.
//   // $scalars?: SelectionSet.Indicator
//   // $?: any // ArgsObject
// }

export type FieldValue = AnySelectionSet | Indicator.Indicator

export const isSelectionSet = (value: unknown): value is AnySelectionSet => {
  return typeof value === `object` && value !== null
}

export type Any = AnyExceptAlias | SelectAlias

export type AnyExceptAlias = AnySelectionSet | Indicator.Indicator

export namespace Bases {
  export interface Base extends Directive.$Fields {}

  export interface ObjectLike extends Base {
    /**
     * Special property to select all scalars.
     */
    $scalars?: Indicator.Indicator
  }
}

// dprint-ignore

export type TypenameSelection = { __typename: true }
