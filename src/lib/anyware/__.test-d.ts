/* eslint-disable */

import { run } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { Result } from '../../../tests/_/schema/generated/SchemaRuntime.js'
import { ContextualError } from '../errors/ContextualError.js'
import { MaybePromise } from '../prelude.js'
import { Anyware } from './__.js'
import { ResultEnvelop, SomeHook } from './main.js'

type InputA = { valueA: string }
type InputB = { valueB: string }
type Result = { return: string }

const create = Anyware.create<['a', 'b'], { a: InputA; b: InputB }, Result>

test('create', () => {
  expectTypeOf(create).toMatchTypeOf<
    (input: {
      hookNamesOrderedBySequence: ['a', 'b']
      hooks: {
        a: (input: InputA) => InputB
        b: (input: InputB) => Result
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
          (input?: InputA) => MaybePromise<
            Error | {
              b: SomeHook<(input?: InputB) => MaybePromise<Error | Result>>
            }
          >
        >
        b: SomeHook<(input?: InputB) => MaybePromise<Error | Result>>
      }) => Promise<Result>
      extensions: ((input: {
        a: SomeHook<
          (input?: InputA) => MaybePromise<{
            b: SomeHook<(input?: InputB) => MaybePromise<Result>>
          }>
        >
        b: SomeHook<(input?: InputB) => MaybePromise<Result>>
      }) => Promise<Result>)[]
    }) => Promise<Result | ContextualError>
  >()
})
