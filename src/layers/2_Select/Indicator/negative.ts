import type { UnionExpanded, Values } from '../../../lib/prelude.js'

export const negativeIndicatorEnum = {
  false: false,
  undefined: undefined,
} as const

export type Negative = UnionExpanded<Values<typeof negativeIndicatorEnum>>

export const isNegativeIndicator = (v: any): v is Negative => {
  return v === negativeIndicatorEnum.false || v === negativeIndicatorEnum.undefined
}
