/* eslint-disable */
import { describe, expect, expectTypeOf } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { ErrorGraffleExtensionEntryHook } from './extension/getEntryHook.js'
import { Extension, NetworkRequestHook } from './extension/types.js'

const client = Graffle.create({ schema: 'https://foo', returnMode: 'dataAndErrors' })

describe('invalid destructuring cases', () => {
  const make = async (extension: Extension) =>
    (await client.extend(extension).query.id()) as any as ErrorGraffleExtensionEntryHook

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
    const result = await make(async ({ send2 }) => {})
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
    const result = await make(async ({ send }, two) => {})
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

describe(`request`, () => {
  test(`can add header to request`, async ({ fetch }) => {
    const headers = {
      'x-foo': 'bar',
    }
    const client2 = client.extend(async ({ send }) => {
      // todo should be URL instance?
      expectTypeOf(send).toEqualTypeOf<NetworkRequestHook>()
      expect(send.input).toEqual({ url: 'https://foo', document: `query  { id \n }` })
      return await send({
        ...send.input,
        headers,
      })
    })
    fetch.mockImplementationOnce(async (input: Request) => {
      expect(input.headers.get('x-foo')).toEqual(headers['x-foo'])
      return createResponse({ data: { id: db.id } })
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
})
