import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'

const G = Graffle.create

const resultFieldSelect =
  Graffle.Select.Query({ resultNonNull: { $: { $case: `Object1` }, __typename: true } })[`resultNonNull`]

describe(`.errors.schema`, () => {
  describe(`throw`, () => {
    const g = G({ schema, output: { errors: { schema: `throw` } } })
    test(`query.<resultFieldMethod>`, async () => {
      const x = await g.query.resultNonNull(resultFieldSelect)
      expectTypeOf(await g.query.resultNonNull(resultFieldSelect)).toEqualTypeOf<{ __typename: 'Object1' }>()
    })
  })
  describe(`return`, () => {
    const g = G({ schema, output: { errors: { schema: `return` } } })
    test(`query.<resultFieldMethod>`, () => {
      expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<{ __typename: 'Object1' } | Error>()
    })
  })
  describe(`envelope.schema`, () => {
    const g = G({ schema, output: { envelope: { errors: { schema: true } }, errors: { schema: `return` } } })
    // todo bring back:
    // type Config = typeof g._.config
    // test('query.<resultFieldMethod>', async () => {
    //   // todo: once we have execution result with type variable errors, then enhance this test to assert that the result errors come through in the errors field.
    //   expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<
    //     Envelope<Config, { resultNonNull: { __typename: 'Object1' } }>
    //   >()
    // })
  })
})
