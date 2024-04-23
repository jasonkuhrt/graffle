import type { ErrorSerialized } from './internalHelpers.js'
import { serializeError } from './internalHelpers.js'
import type { Cause, Context } from './types.js'

/**
 * Error enhanced with a context object.
 *
 * The library also exports a serializer you can use.
 */
export class ContextualError<
  $Name extends string = string,
  $Context extends Context = object,
  $Cause extends Cause | undefined = undefined,
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

export type SomeContextualError = ContextualError<string, object, Cause | undefined>

export type SerializeIfContextualError<E> = E extends ContextualError ? ContextualErrorSerialized<E> : E

/**
 * Transform a contextual error into something that can be sent over the wire
 * without losing information.
 */
// Use conditional type to force function to maintain union of error types each
// wrapped by ContextualErrorSerialized instead of just ContextualErrorSerialized itself taking a union of all error types.
export const serializeContextualError = <CE extends SomeContextualError>(
  error: CE,
): CE extends any ? ContextualErrorSerialized<CE> : never => {
  return {
    name: error.name,
    message: error.message,
    context: error.context,
    cause:
      error.cause instanceof ContextualError
        ? serializeContextualError(error.cause)
        : error.cause instanceof Error
          ? serializeError(error.cause)
          : undefined,
  } as any
}

/**
 * Serialized representation of a contextual error.
 */
export interface ContextualErrorSerialized<CE extends ContextualError<any, object, any>> {
  name: CE['name']
  message: CE['message']
  context: CE['context']
  cause: CE['context'] extends ContextualError<any, object, any>
    ? ContextualErrorSerialized<CE['context']>
    : CE['context'] extends Error
      ? ErrorSerialized<CE['context']>
      : CE['context'] extends undefined
        ? undefined
        : never
}
