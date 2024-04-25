import { ContextualError } from './ContextualError.js'
import type { Cause } from './types.js'

/**
 * Aggregation Error enhanced with a context object and types members.
 *
 * The library also exports a serializer you can use.
 */
export class ContextualAggregateError<
  $Errors extends Error | ContextualError<string, object, Cause | undefined> = ContextualError<
    string,
    object,
    Cause | undefined
  >,
  $Name extends string = `ContextualAggregateError`,
  $Context extends object = object,
> extends ContextualError<$Name, $Context> {
  override name: $Name = `ContextualAggregateError` as $Name
  constructor(
    message: string,
    context: $Context,
    public readonly errors: readonly $Errors[],
  ) {
    super(message, context, undefined)
  }
}
