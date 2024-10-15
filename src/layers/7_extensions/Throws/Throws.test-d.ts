import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { Throws } from './Throws.js'

const graffle = Graffle.create({ schema }).use(Throws())

// todo tests that don't rely on schema errors
// describe(`document`, () => {
//   describe(`query result field`, () => {
//     test(`with __typename`, async () => {
//       const result = await graffle.throws().document({ query: { x: { resultNonNull: { __typename: true } } } }).run()
//       expectTypeOf(result).toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
//     })
//     test(`without __typename`, async () => {
//       const result = await graffle.throws().document({ query: { x: { resultNonNull: {} } } }).run()
//       expectTypeOf(result).toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
//     })
//     test(`multiple via alias`, async () => {
//       const result = await graffle.throws().document({
//         query: { x: { resultNonNull: [[`resultNonNull`, {}], [`x`, {}]] } },
//       })
//         .run()
//       expectTypeOf(result).toEqualTypeOf<
//         { resultNonNull: { __typename: 'Object1' }; x: { __typename: 'Object1' } }
//       >()
//     })
//   })
// })
