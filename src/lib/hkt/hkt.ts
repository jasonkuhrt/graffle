/**
 * A Higher Kinded Type (HKT).
 */
export interface Fn {
  params: unknown
  return: unknown
}

/**
 * Apply a Higher Kinded Type (HKT).
 */
// dprint-ignore
export type Call<$Fn extends Fn, $Arguments> =
	($Fn & { params: $Arguments })['return']

//
// Utilities
//

export type UnFn<$Fn extends Fn> = Omit<$Fn, keyof Fn>
