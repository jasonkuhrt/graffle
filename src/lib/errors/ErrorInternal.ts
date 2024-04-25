import { ContextualError } from './ContextualError.js'
import type { Cause, Context } from './types.js'

export class ErrorInternal<
  $Name extends string = 'ErrorInternal',
  $Context extends Context = Context,
  $Cause extends Cause | undefined = undefined,
> extends ContextualError<$Name, $Context, $Cause> {
  override name: $Name = `ErrorInternal` as $Name
  constructor(
    message: string = `Something went wrong.`,
    context: $Context = {} as $Context,
    cause: $Cause = undefined as $Cause,
  ) {
    super(message, context, cause)
  }
}
