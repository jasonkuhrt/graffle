import { shallowMergeDefaults } from '../../../lib/prelude.js'
import { Schema } from '../../1_Schema/__.js'
import type { Definition } from './$types.js'

export const Include: Definition = {
  name: `include`,
  type: Schema.Directives.standardDirectivesByName.include,
  normalizeArguments: (input: ArgsInput): Args => {
    return typeof input === `boolean`
      ? expandShortHand(input)
      : shallowMergeDefaults(
        argumentDefaults,
        input,
      )
  },
}

interface Args {
  if: boolean
}

const expandShortHand = (value: ArgsInputShortHand): Args => {
  return {
    if: value,
  }
}

export type ArgsInput = ArgsInputShortHand | ArgsInputLonghand

type ArgsInputShortHand = boolean

type ArgsInputLonghand = {
  if?: boolean
}

export const argumentDefaults: Args = {
  if: true,
}

export interface Field {
  $include?: ArgsInput
}

export namespace FieldStates {
  export interface Positive {
    $include: true | { if: true }
  }
  export interface Negative {
    $include: false | { if: false }
  }
}
