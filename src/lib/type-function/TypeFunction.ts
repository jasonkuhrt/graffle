/**
 * A type function (aka. callable type).
 */
export interface Fn {
  params: unknown
  return: unknown
}

/**
 * A composed set of type functions.
 */
type FnPipeline = [...Fn[]]

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

/**
 * Execute a pipeline of type functions.
 */
// dprint-ignore
export type CallPipeline<$Pipeline extends FnPipeline, $Value> =
  $Pipeline extends [infer $Fn extends Fn, ...infer $Rest extends FnPipeline]
    ? CallPipeline<$Rest, Call<$Fn, $Value>>
    : $Value
