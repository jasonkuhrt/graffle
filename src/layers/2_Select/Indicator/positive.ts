import type { Values } from '../../../lib/prelude.js'

export const positiveIndicatorEnum = {
  true: true,
} as const

export type Positive = Values<typeof positiveIndicatorEnum>

export const isPositiveIndicator = (v: any): v is Positive => {
  return v === positiveIndicatorEnum.true
}
