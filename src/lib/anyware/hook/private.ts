import type { Errors } from '../../errors/__.js'
import type { Deferred, MaybePromise, SomeFunction, TakeValuesBefore } from '../../prelude.js'
import type { Extension } from '../main.js'
import type { HookDefinitionMap, HookSequence } from './definition.js'

export type InferPrivateHookInput<
  $HookSequence extends HookSequence,
  $HookMap extends HookDefinitionMap<$HookSequence>,
  $HookName extends string,
> = HookPrivateInput<
  $HookMap[$HookName]['input'],
  $HookMap[$HookName]['slots'],
  {
    [$PreviousHookName in TakeValuesBefore<$HookName, $HookSequence>[number]]: {
      input: $HookMap[$PreviousHookName]['input']
    }
  }
>

export type PrivateHook<$Slots extends Slots, $Input extends HookPrivateInput, $Return> = {
  slots: $Slots
  run: (input: $Input) => MaybePromise<$Return>
}

export type HookPrivateInput<
  $Input extends object | undefined = object | undefined,
  $Slots extends Slots | undefined = Slots | undefined,
  $Previous extends object = object,
> = {
  input: $Input
  slots: $Slots
  previous: $Previous
}

export type Slots = Record<string, SomeFunction>

export type HookResult =
  | HookResultCompleted
  | HookResultShortCircuited
  | HookResultErrorUser
  | HookResultErrorImplementation
  | HookResultErrorExtension

export interface HookResultShortCircuited {
  type: 'shortCircuited'
  result: unknown
}

export interface HookResultCompleted {
  type: 'completed'
  effectiveInput: object
  result: unknown
  nextExtensionsStack: readonly Extension[]
}

export type HookResultError = HookResultErrorExtension | HookResultErrorImplementation | HookResultErrorUser

export interface HookResultErrorUser {
  type: 'error'
  hookName: string
  source: 'user'
  error: Errors.ContextualError
  extensionName: string
}

export interface HookResultErrorExtension {
  type: 'error'
  hookName: string
  source: 'extension'
  error: Error
  extensionName: string
}

export interface HookResultErrorImplementation {
  type: 'error'
  hookName: string
  source: 'implementation'
  error: Error
}

export type HookResultErrorAsync = Deferred<HookResultErrorExtension>
