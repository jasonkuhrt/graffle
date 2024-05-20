import { describe, expect, test } from 'vitest'
import { run } from './specHelpers.js'

describe(`invalid destructuring cases`, () => {
  test(`noParameters`, async () => {
    const result = await run(() => 1)
    expect(result).toMatchInlineSnapshot(
      `[ContextualAggregateError: One or more extensions are invalid.]`,
    )
    expect(result.errors).toMatchInlineSnapshot(`
      [
        [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
      ]
    `)
    expect(result.errors[0].context).toMatchInlineSnapshot(`
      {
        "issue": "noParameters",
      }
    `)
  })
  test(`destructuredWithoutEntryHook`, async () => {
    const result = await run(async ({ request2 }) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualAggregateError: One or more extensions are invalid.]`,
    )
    expect(result.errors).toMatchInlineSnapshot(`
      [
        [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
      ]
    `)
    expect(result.errors[0].context).toMatchInlineSnapshot(`
        {
          "issue": "destructuredWithoutEntryHook",
        }
      `)
  })
  test(`multipleParameters`, async () => {
    const result = await run(async ({ request }, two) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualAggregateError: One or more extensions are invalid.]`,
    )
    expect(result.errors).toMatchInlineSnapshot(`
      [
        [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
      ]
    `)
    expect(result.errors[0].context).toMatchInlineSnapshot(`
        {
          "issue": "multipleParameters",
        }
      `)
  })
  test(`notDestructured`, async () => {
    const result = await run(async (_) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualAggregateError: One or more extensions are invalid.]`,
    )
    expect(result.errors).toMatchInlineSnapshot(`
      [
        [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
      ]
    `)
    expect(result.errors[0].context).toMatchInlineSnapshot(`
        {
          "issue": "notDestructured",
        }
      `)
  })
  test(`multipleDestructuredHookNames`, async () => {
    const result = await run(async ({ a, b }) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualAggregateError: One or more extensions are invalid.]`,
    )
    expect(result.errors).toMatchInlineSnapshot(`
      [
        [ContextualError: Extension must destructure the first parameter passed to it and select exactly one entrypoint.],
      ]
    `)
    expect(result.errors[0].context).toMatchInlineSnapshot(`
      {
        "issue": "multipleDestructuredHookNames",
      }
    `)
  })
})
