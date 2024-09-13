import { describe, expect, expectTypeOf } from 'vitest'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle as Graffle2 } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { Graffle } from '../../entrypoints/main.js'
import { OrThrow } from '../7_extensions/OrThrow/OrThrow.js'

const endpoint = new URL(`https://foo.io/api/graphql`)

describe(`without schemaIndex only raw is available`, () => {
  const graffle = Graffle.create({ schema: endpoint }).use(OrThrow())

  test(`unavailable methods`, () => {
    // @ts-expect-error
    expect(graffle.document).toBeUndefined()
    // @ts-expect-error
    expect(graffle.query).toBeUndefined()
    // @ts-expect-error
    expect(graffle.subscription).toBeUndefined()
    // @ts-expect-error
    expect(graffle.mutation).toBeUndefined()
  })

  test(`available methods`, () => {
    expect(graffle.raw).toBeTypeOf(`function`) // eslint-disable-line
    expect(graffle.rawOrThrow).toBeTypeOf(`function`)
  })
})

describe(`output`, () => {
  test(`when using envelope and transport is http, response property is available`, async ({ fetch }) => {
    fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { id: `abc` } })))
    const graffle = Graffle2.create({ schema: endpoint, output: { envelope: true } })
    const result = await graffle.query.id()
    expectTypeOf(result.response).toEqualTypeOf<Response>()
    expect(result.response.status).toEqual(200)
    // sanity check
    expect(result.data).toEqual({ 'id': `abc` })
  })
  test(`when using envelope and transport is memory, response property is NOT available`, async () => {
    const graffle = Graffle2.create({ schema, output: { envelope: true } })
    const result = await graffle.query.id()
    // @ts-expect-error not present
    expectTypeOf(result.response).toEqualTypeOf<Response>()
    // @ts-expect-error not present
    expect(result.response).toEqual(undefined)
    // sanity check
    expect(result.data).toEqual({ 'id': `abc` })
  })
})
