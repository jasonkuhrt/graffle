export const TypeErrorSymbol = Symbol(`TypeError`)

export type TSError<
  Location extends string,
  Message extends string,
  Context extends Record<string, unknown> = never,
> = {
  [TypeErrorSymbol]: true
  message: `Error (${Location}): ${Message}`
  context: Context
}
