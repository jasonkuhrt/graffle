import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import { schema } from '../../../../tests/_/schema/schema.js'
import { OrThrow } from './OrThrow.js'

const graffle = Graffle.create({ schema, output: { envelope: false } }).use(OrThrow())

describe(`documentOrThrow(...).run()`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = await graffle.documentOrThrow({ x: { query: { resultNonNull: { __typename: true } } } }).run()
      expectTypeOf(result).toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`without __typename`, async () => {
      const result = await graffle.documentOrThrow({ x: { query: { resultNonNull: {} } } }).run()
      expectTypeOf(result).toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`multiple via alias`, async () => {
      const result = await graffle.documentOrThrow({ x: { query: { resultNonNull: {}, resultNonNull_as_x: {} } } })
        .run()
      expectTypeOf(result).toEqualTypeOf<
        { resultNonNull: { __typename: 'Object1' }; x: { __typename: 'Object1' } }
      >()
    })
  })
})
