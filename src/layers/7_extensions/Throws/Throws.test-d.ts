import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import { schema } from '../../../../tests/_/schema/schema.js'
import { Throws } from './Throws.js'

const graffle = Graffle.create({ schema }).use(Throws())

describe(`document`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = await graffle.throws().document({ queries: { x: { resultNonNull: { __typename: true } } } }).run()
      expectTypeOf(result).toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`without __typename`, async () => {
      const result = await graffle.throws().document({ queries: { x: { resultNonNull: {} } } }).run()
      expectTypeOf(result).toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`multiple via alias`, async () => {
      const result = await graffle.throws().document({
        queries: { x: { resultNonNull: [[`resultNonNull`, {}], [`x`, {}]] } },
      })
        .run()
      expectTypeOf(result).toEqualTypeOf<
        { resultNonNull: { __typename: 'Object1' }; x: { __typename: 'Object1' } }
      >()
    })
  })
})
