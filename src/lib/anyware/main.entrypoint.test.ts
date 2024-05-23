/* eslint-disable */

import { describe, expect, test } from 'vitest'
import type { ContextualAggregateError } from '../errors/ContextualAggregateError.js'
import { run } from './specHelpers.js'

describe(`invalid destructuring cases`, () => {
  test(`noParameters`, async () => {
    const result = await run(() => 1) as ContextualAggregateError
    expect({
      result,
      errors: result.errors,
      context: result.errors[0]?.context,
    }).toMatchInlineSnapshot(`
      {
        "context": {
          "issue": "noParameters",
        },
        "errors": [
          [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
        ],
        "result": [ContextualAggregateError: One or more extensions are invalid.],
      }
    `)
  })
  test(`destructuredWithoutEntryHook`, async () => {
    const result = await run(async ({ x }) => {}) as ContextualAggregateError
    expect({
      result,
      errors: result.errors,
      context: result.errors[0]?.context,
    }).toMatchInlineSnapshot(
      `
      {
        "context": {
          "issue": "destructuredWithoutEntryHook",
        },
        "errors": [
          [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
        ],
        "result": [ContextualAggregateError: One or more extensions are invalid.],
      }
    `,
    )
  })
  test(`multipleParameters`, async () => {
    // @ts-expect-error two parameters is invalid
    const result = await run(async ({ x }, y) => {}) as ContextualAggregateError
    expect({
      result,
      errors: result.errors,
      context: result.errors[0]?.context,
    }).toMatchInlineSnapshot(
      `
      {
        "context": {
          "issue": "multipleParameters",
        },
        "errors": [
          [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
        ],
        "result": [ContextualAggregateError: One or more extensions are invalid.],
      }
    `,
    )
  })
  test(`notDestructured`, async () => {
    const result = await run(async (_) => {}) as ContextualAggregateError
    expect({
      result,
      errors: result.errors,
      context: result.errors[0]?.context,
    }).toMatchInlineSnapshot(`
      {
        "context": {
          "issue": "notDestructured",
        },
        "errors": [
          [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
        ],
        "result": [ContextualAggregateError: One or more extensions are invalid.],
      }
    `)
  })
  test(`multipleDestructuredHookNames`, async () => {
    const result = await run(async ({ a, b }) => {}) as ContextualAggregateError
    expect({
      result,
      errors: result.errors,
      context: result.errors[0]?.context,
    }).toMatchInlineSnapshot(`
      {
        "context": {
          "issue": "multipleDestructuredHookNames",
        },
        "errors": [
          [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
        ],
        "result": [ContextualAggregateError: One or more extensions are invalid.],
      }
    `)
  })
})
