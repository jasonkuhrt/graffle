export const TypeErrorSymbol = Symbol(`TypeError`)

export type TSErrorDescriptive<
  Location extends string,
  Message extends string,
  Context extends Record<string, unknown> = never,
> = {
  [TypeErrorSymbol]: true
  message: `Error (${Location}): ${Message}`
  context: Context
}

export type TSError<
  Location extends string,
  Context extends Record<string, unknown> = never,
> = TSErrorDescriptive<Location, `<no message>`, Context>
