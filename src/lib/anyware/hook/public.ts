import type { FindValueAfter, IsLastValue } from '../../prelude.js'
import type { ExtensionOptions } from '../main.js'
import type { HookDefinition, HookDefinitionMap, HookSequence } from './definition.js'

export type InferPublicHooks<
  $HookSequence extends HookSequence,
  $HookMap extends Record<$HookSequence[number], HookDefinition> = Record<$HookSequence[number], HookDefinition>,
  $Result = unknown,
  $Options extends ExtensionOptions = ExtensionOptions,
> = {
  [$HookName in $HookSequence[number]]: InferPublicHook<$HookSequence, $HookMap, $Result, $HookName, $Options>
}

type InferPublicHook<
  $HookSequence extends HookSequence,
  $HookMap extends HookDefinitionMap<$HookSequence> = HookDefinitionMap<$HookSequence>,
  $Result = unknown,
  $Name extends $HookSequence[number] = $HookSequence[number],
  $Options extends ExtensionOptions = ExtensionOptions,
> = PublicHook<
  // (<$$Input extends $HookMap[$Name]['input']>(
  ((
    input?:
      & {
        input?: $HookMap[$Name]['input']
      }
      & (keyof $HookMap[$Name]['slots'] extends never ? {} : { using?: SlotInputify<$HookMap[$Name]['slots']> }),
  ) => InferPublicHookReturn<$HookSequence, $HookMap, $Result, $Name, $Options>),
  $HookMap[$Name]['input']
>

// & (<$$Input extends $HookMap[$Name]['input']>(
//   input?: // InferHookPrivateInput<$HookSequence,$HookMap,$Name>
//     {
//       input?: $$Input
//     } & (keyof $HookMap[$Name]['slots'] extends never ? {} : { using?: SlotInputify<$HookMap[$Name]['slots']> }),
// ) => PublicHookReturn<$HookSequence, $HookMap, $Result, $Name, $Options>)
// & {
//   [hookSymbol]: HookSymbol
//   input: $HookMap[$Name]['input']
// }

// dprint-ignore
type InferPublicHookReturn<
  $HookSequence extends HookSequence,
  $HookMap extends HookDefinitionMap<$HookSequence> = HookDefinitionMap<$HookSequence>,
  $Result = unknown,
  $Name extends $HookSequence[number] = $HookSequence[number],
  $Options extends ExtensionOptions = ExtensionOptions,
> = Promise<
  | ($Options['retrying'] extends true ? Error : never)
  | (IsLastValue<$Name, $HookSequence> extends true
      ? $Result
      : {
          [$NameNext in FindValueAfter<$Name, $HookSequence>]: InferPublicHook<
            $HookSequence,
            $HookMap,
            $Result,
            $NameNext
          >
        }
    )
>

type SlotInputify<$Slots extends Record<string, (...args: any) => any>> = {
  [K in keyof $Slots]?: SlotInput<$Slots[K]>
}

type SlotInput<F extends (...args: any) => any> = (...args: Parameters<F>) => ReturnType<F> | undefined

const hookSymbol = Symbol(`hook`)

type HookSymbol = typeof hookSymbol

export type SomePublicHookEnvelope = {
  [name: string]: PublicHook
}

export const createPublicHook = <$OriginalInput, $Fn extends PublicHookFn>(
  originalInput: $OriginalInput,
  fn: $Fn,
): PublicHook<$Fn> => {
  // ): $Hook & { input: $OriginalInput } => {
  // @ts-expect-error
  fn.input = originalInput
  // @ts-expect-error
  return fn
}

export type PublicHook<
  $Fn extends PublicHookFn = PublicHookFn,
  $OriginalInput extends object = object, // Exclude<Parameters<$Fn>[0], undefined>['input'],
> =
  & $Fn
  & {
    [hookSymbol]: HookSymbol
    // todo the result is unknown, but if we build a EndEnvelope, then we can work with this type more logically and put it here.
    // E.g. adding `| unknown` would destroy the knowledge of hook envelope case
    // todo this is not strictly true, it could also be the final result
    input: $OriginalInput
  }

type PublicHookFn = (input?: HookPublicInput) => any

interface HookPublicInput {
  input?: any
  using?: any
}
