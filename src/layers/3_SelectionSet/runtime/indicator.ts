import type { ClientIndicatorPositive } from '../types.js'

export type Indicator = 0 | 1 | boolean

export const isIndicator = (v: any): v is Indicator => {
  return String(v) in indicator
}

export const isPositiveIndicator = (v: any): v is ClientIndicatorPositive => {
  return !(String(v) in negativeIndicator)
}

const negativeIndicator = {
  '0': 0,
  'false': false,
  'undefined': undefined,
}

const positiveIndicator = {
  '1': 1,
  'true': true,
}

const indicator = {
  ...negativeIndicator,
  ...positiveIndicator,
}
