import { Schema } from '../../1_Schema/__.js'
import type { Definition } from './$types.js'

export const Skip: Definition = {
  name: `skip`,
  type: Schema.Directives.standardDirectivesByName.skip,
  normalizeArguments: (args: ArgsInput): Args => {
    return {
      if: typeof args === `boolean` ? args : args.if === undefined ? true : args.if,
    }
  },
}

interface Args {
  if: boolean
}

export type ArgsInput = InputShortHand | InputLonghand

type InputShortHand = boolean

type InputLonghand = {
  if?: boolean
}

export interface Field {
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
