import { describe, expect, test } from 'vitest'
import { Graffle } from '../../entrypoints/alpha/main.js'

describe(`without schemaIndex only raw is available`, () => {
  const schema = new URL(`https://foo.io/api/graphql`)
  const graffle = Graffle.create({ schema })

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
    expect(graffle.raw).toBeTypeOf(`function`)
    expect(graffle.rawOrThrow).toBeTypeOf(`function`)
  })
})
