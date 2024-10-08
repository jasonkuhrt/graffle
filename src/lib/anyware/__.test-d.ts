/* eslint-disable */

import { describe, expectTypeOf, test } from 'vitest'
import { Result } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaRuntime.js'
import { ContextualError } from '../errors/ContextualError.js'
import { type MaybePromise } from '../prelude.js'
import { Anyware } from './__.js'
import type { PublicHook } from './hook/public.js'

type InputA = { valueA: string }
type InputB = { valueB: string }
type Result = { return: string }

const create = Anyware.create<['a', 'b'], { a: { input: InputA }; b: { input: InputB } }, Result>

describe('without slots', () => {
  test('create', () => {
    expectTypeOf(create).toMatchTypeOf<
      (input: {
        hookNamesOrderedBySequence: ['a', 'b']
        hooks: {
          a: (input: { input: InputA; previous: {} }) => InputB
          b: (input: { input: InputB; previous: { a: { input: InputA } } }) => Result
        }
      }) => any
    >()
  })

  test('run', () => {
    type run = ReturnType<typeof create>['run']

    expectTypeOf<run>().toMatchTypeOf<
      (input: {
        initialInput: InputA
        options?: Anyware.Options
        retryingExtension?: (input: {
          a: PublicHook<
            (params?: { input?: InputA }) => MaybePromise<
              Error | {
                b: PublicHook<
                  (params?: { input?: InputB }) => MaybePromise<Error | Result>
                >
              }
            >
          >
          b: PublicHook<(params?: { input?: InputB }) => MaybePromise<Error | Result>>
        }) => Promise<Result>
        extensions: ((input: {
          a: PublicHook<
            (params?: { input?: InputA }) => MaybePromise<{
              b: PublicHook<(params?: { input?: InputB }) => MaybePromise<Result>>
            }>
          >
          b: PublicHook<(params?: { input?: InputB }) => MaybePromise<Result>>
        }) => Promise<Result>)[]
      }) => Promise<Result | ContextualError>
    >()
  })
})

describe('withSlots', () => {
  const create = Anyware.create<['a'], { a: { input: InputA; slots: { x: (x: boolean) => number } } }, Result>

  test('create', () => {
    expectTypeOf(create).toMatchTypeOf<
      (input: {
        hookNamesOrderedBySequence: ['a']
        hooks: {
          a: {
            run: (input: { input: InputA; previous: {} }) => Result
            slots: {
              x: (x: boolean) => number
            }
          }
        }
      }) => any
    >()
  })

  test('run', () => {
    type run = ReturnType<typeof create>['run']

    expectTypeOf<run>().toMatchTypeOf<
      (input: {
        initialInput: InputA
        options?: Anyware.Options
        extensions: ((input: {
          a: PublicHook<
            (
              input?: { input?: InputA; using?: { x?: (x: boolean) => number | undefined } },
            ) => MaybePromise<Error | Result>
          >
        }) => Promise<Result>)[]
        retryingExtension?: (input: {
          a: PublicHook<
            (input?: { input?: InputA; using?: { x?: (x: boolean) => number | undefined } }) => MaybePromise<
              Error | Result
            >
          >
        }) => Promise<Result>
      }) => Promise<Result | ContextualError>
    >()
  })
})
