/* eslint-disable */
import { describe, describe, expect, expectTypeOf } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { ErrorAnywareExtensionEntrypoint } from '../../lib/anyware/getEntrypoint.js'
import { Extension, NetworkRequestHook } from './extension/types.js'

const client = Graffle.create({ schema: 'https://foo', returnMode: 'dataAndErrors' })
const headers = { 'x-foo': 'bar' }

describe('invalid destructuring cases', () => {
  const make = async (extension: Extension) =>
    (await client.extend(extension).query.id()) as any as ErrorAnywareExtensionEntrypoint

  test('noParameters', async () => {
    const result = await make(async ({}) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualError: Extension must destructure the input object and select an entry hook to use.]`,
    )
    expect(result.context).toMatchInlineSnapshot(`
      {
        "issue": "noParameters",
      }
    `)
  })
  test('noParameters', async () => {
    const result = await make(async () => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualError: Extension must destructure the input object and select an entry hook to use.]`,
    )
    expect(result.context).toMatchInlineSnapshot(`
      {
        "issue": "noParameters",
      }
    `)
  })
  test('destructuredWithoutEntryHook', async () => {
    // @ts-expect-error
    const result = await make(async ({ request2 }) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualError: Extension must destructure the input object and select an entry hook to use.]`,
    )
    expect(result.context).toMatchInlineSnapshot(`
        {
          "issue": "destructuredWithoutEntryHook",
        }
      `)
  })
  test('multipleParameters', async () => {
    // @ts-expect-error
    const result = await make(async ({ request }, two) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualError: Extension must destructure the input object and select an entry hook to use.]`,
    )
    expect(result.context).toMatchInlineSnapshot(`
        {
          "issue": "multipleParameters",
        }
      `)
  })
  test('notDestructured', async () => {
    const result = await make(async (_) => {})
    expect(result).toMatchInlineSnapshot(
      `[ContextualError: Extension must destructure the input object and select an entry hook to use.]`,
    )
    expect(result.context).toMatchInlineSnapshot(`
        {
          "issue": "notDestructured",
        }
      `)
  })
  // todo once we have multiple hooks test this case:
  // multipleDestructuredHookNames
})

// todo each extension added should copy, not mutate the client

describe(`entrypoint request`, () => {
  test(`can add header to request`, async ({ fetch }) => {
    const client2 = client.extend(async ({ request }) => {
      // todo should be raw input types but rather resolved
      // todo should be URL instance?
      expectTypeOf(request).toEqualTypeOf<NetworkRequestHook>()
      expect(request.input).toEqual({ url: 'https://foo', document: `query  { id \n }` })
      return await request({ ...request.input, headers })
      // todo expose fetch hook
    })
    fetch.mockImplementationOnce(async (input: Request) => {
      expect(input.headers.get('x-foo')).toEqual(headers['x-foo'])
      return createResponse({ data: { id: db.id } })
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
  test.only('can chain into fetch', async () => {
    const client2 = client.extend(async ({ request }) => {
      console.log(1)
      const { fetch } = await request({ ...request.input, headers })
      console.log(2)
      console.log(fetch)
      return await fetch(fetch.input)
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
})

describe.todo(`entrypoint fetch`, () => {
})

// todo test a throw from an extension
