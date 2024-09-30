import { Schema } from '../../../1_Schema/__.js'
import type { Definition } from './$types.js'

export interface Args {
  if: boolean
}

export const Skip: Definition = {
  name: `skip`,
  type: Schema.Directives.standardDirectivesByName.skip,
  normalizeArgs: (args: ArgsInput): Args => {
    return {
      if: typeof args === `boolean` ? args : args.if === undefined ? true : args.if,
    }
  },
}

export type InputShortHand = boolean

export type InputLonghand = {
  if?: boolean
}

/**
 * https://spec.graphql.org/draft/#sec--skip
 */
export type ArgsInput = InputShortHand | InputLonghand

export const argumentDefaults = {
  if: true,
}

export interface Field {
  /**
   * https://spec.graphql.org/draft/#sec--skip
   */
  $skip?: ArgsInput
}

export namespace FieldStates {
  export interface Positive {
    $skip: true | { if: true }
  }
  export interface Negative {
    $skip: false | { if: false }
  }
}
