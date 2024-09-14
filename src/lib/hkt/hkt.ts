/**
 * A Higher Kinded Type (HKT).
 */
export interface Fn<$Params = unknown, $Return = unknown> {
  params: $Params
  return: $Return
}

/**
 * Apply a Higher Kinded Type (HKT).
 */
// dprint-ignore
export type Call<$Fn extends Fn, $Params> =
	($Fn & { params: $Params })['return']

//
// Utilities
//
//
//
export type Remove<$Fn extends Fn> = Omit<$Fn, keyof Fn>

/**
 * A function that outputs its input.
 */
export interface IdentityFn<$Params> extends Fn<$Params> {
  return: this['params']
}

/**
 * Work with optional HKTs. If the argument is a `Fn` then call it with teh given arguments. Otherwise, just return the type as was.
 */
// dprint-ignore
export type CallOrReturn<$MaybeFn, $Args> =
	$MaybeFn extends Fn
		? Call<$MaybeFn, $Args>
		: $MaybeFn
