/* eslint-disable */

import { describe, expectTypeOf, test } from 'vitest'
import { Result } from '../../../tests/_/schema/generated/SchemaRuntime.js'
import { ContextualError } from '../errors/ContextualError.js'
import { MaybePromise } from '../prelude.js'
import { Anyware } from './__.js'
import { SomeHook } from './main.js'

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
          a: (input: { input: InputA }) => InputB
          b: (input: { input: InputB }) => Result
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
          a: SomeHook<
            (input?: { input?: InputA }) => MaybePromise<
              Error | {
                b: SomeHook<(input?: { input?: InputB }) => MaybePromise<Error | Result>>
              }
            >
          >
          b: SomeHook<(input?: { input?: InputB }) => MaybePromise<Error | Result>>
        }) => Promise<Result>
        extensions: ((input: {
          a: SomeHook<
            (input?: { input?: InputA }) => MaybePromise<{
              b: SomeHook<(input?: { input?: InputB }) => MaybePromise<Result>>
            }>
          >
          b: SomeHook<(input?: { input?: InputB }) => MaybePromise<Result>>
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
            run: (input: { input: InputA }) => Result
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
        retryingExtension?: (input: {
          a: SomeHook<
            (input?: { input?: InputA; using: { x?: (x: boolean) => number | undefined } }) => MaybePromise<
              Error | Result
            >
          >
        }) => Promise<Result>
        extensions: ((input: {
          a: SomeHook<
            (input?: { input?: InputA }) => MaybePromise<Error | Result>
          >
        }) => Promise<Result>)[]
      }) => Promise<Result | ContextualError>
    >()
  })
})
