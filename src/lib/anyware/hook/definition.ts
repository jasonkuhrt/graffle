import type { FindValueAfter, IsLastValue } from '../../prelude.js'

import type { MaybePromise } from '../../prelude.js'
import type { HookResultError, InferPrivateHookInput } from './private.js'

export type HookSequence = readonly [string, ...string[]]

export type HookDefinitionMap<$HookSequence extends HookSequence> = Record<
  $HookSequence[number],
  HookDefinition
>

export type HookDefinition = {
  input: any /* object <- type error but more accurate */
  slots?: any /* object <- type error but more accurate */
}

export type HookName = string

export type InferDefinition<
  $HookSequence extends HookSequence = HookSequence,
  $HookMap extends HookDefinitionMap<$HookSequence> = HookDefinitionMap<$HookSequence>,
  $Result = unknown,
> = {
  hookNamesOrderedBySequence: $HookSequence
  // dprint-ignore
  hooks: {
    [$HookName in $HookSequence[number]]:
      keyof $HookMap[$HookName]['slots'] extends never
      ? (input: InferPrivateHookInput<$HookSequence, $HookMap, $HookName>) =>
          MaybePromise<
            IsLastValue<$HookName, $HookSequence> extends true
              ? $Result
              : $HookMap[FindValueAfter<$HookName, $HookSequence>]['input']
          >
      : {
          slots: $HookMap[$HookName]['slots']
          run: (input: InferPrivateHookInput<$HookSequence, $HookMap, $HookName>) =>
            MaybePromise<
              IsLastValue<$HookName, $HookSequence> extends true ? $Result
                : $HookMap[FindValueAfter<$HookName, $HookSequence>]['input']
            >
        }
  }
  /**
   * If a hook results in a thrown error but is an instance of one of these classes then return it as-is
   * rather than wrapping it in a ContextualError.
   *
   * This can be useful when there are known kinds of errors such as Abort Errors from AbortController
   * which are actually a signaling mechanism.
   */
  passthroughErrorInstanceOf?: Function[]
  /**
   * If a hook results in a thrown error but returns true from this function then return the error as-is
   * rather than wrapping it in a ContextualError.
   *
   * This can be useful when there are known kinds of errors such as Abort Errors from AbortController
   * which are actually a signaling mechanism.
   */
  passthroughErrorWith?: (signal: HookResultError) => boolean
}
