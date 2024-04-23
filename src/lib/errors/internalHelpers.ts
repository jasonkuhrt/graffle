export interface ErrorSerialized<E extends Error> {
  name: E['name']
  message: E['message']
  cause: E['cause'] extends Error ? ErrorSerialized<E['cause']> : undefined
}

/**
 * Transform an error into something that can be sent over the wire
 * without losing information.
 */
// Use conditional type to force function to maintain union of error types each
// wrapped by ContextualErrorSerialized instead of just ContextualErrorSerialized itself taking a union of all error types.
// prettier-ignore
export const serializeError = <E extends Error>(error: E): E extends any ? ErrorSerialized<E> : never => {
  return {
    name: error.name,
    message: error.message,
    cause: error.cause instanceof Error ? serializeError(error.cause) : undefined,
  } as any
}
