import type { Indicator } from './_.js'

export const key = `$scalars`

export type SelectScalarsWildcard = {
  $scalars: Indicator.Positive
}

export type IsSelectScalarsWildcard<T> = T extends SelectScalarsWildcard ? true : false
