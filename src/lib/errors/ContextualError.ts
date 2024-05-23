import type { Cause, Context } from './types.js'

/**
 * Error enhanced with a context object.
 *
 * The library also exports a serializer you can use.
 */
export class ContextualError<
  $Name extends string = string,
  $Context extends Context = object,
  $Cause extends Cause | undefined = Cause | undefined,
> extends Error {
  override name: $Name = `ContextualError` as $Name
  constructor(
    message: string,
    public readonly context: $Context = {} as $Context,
    public override readonly cause: $Cause = undefined as $Cause,
  ) {
    super(message, cause)
  }
}
