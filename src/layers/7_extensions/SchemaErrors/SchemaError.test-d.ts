import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { type Extension } from '../../6_client/extension/extension.js'
import { SchemaErrors } from './SchemaErrors.js'

const g = Graffle.create({ schema }).use(SchemaErrors())

// todo move test to test suite for .use method
test(`config type is augmented with type hook`, () => {
  expectTypeOf<typeof g._.config.typeHooks.onRequestResult>().toMatchTypeOf<[Extension.Hooks.OnRequestResult]>()
})
test(`config type is augmented with type hook after "with"`, () => {
  const g2 = g.with({ output: { defaults: { errorChannel: `throw` } } })
  g2._.config.typeHooks.onRequestResult
  expectTypeOf<typeof g2._.config.typeHooks.onRequestResult>().toMatchTypeOf<[Extension.Hooks.OnRequestResult]>()
})

const resultFieldSelect =
  Graffle.Select.Query({ resultNonNull: { $: { $case: `Object1` }, __typename: true } })[`resultNonNull`]

describe(`.errors.schema`, () => {
  describe(`throw`, () => {
    test(`query.<resultFieldMethod>`, async () => {
      expectTypeOf(await g.query.resultNonNull(resultFieldSelect)).toEqualTypeOf<{ __typename: 'Object1' }>()
    })
  })
  describe(`return`, () => {
    test(`query.<resultFieldMethod>`, async () => {
      const g2 = g.with({ output: { envelope: false, defaults: { errorChannel: `return` } } })
      const result = await g2.query.resultNonNull(resultFieldSelect)
      expectTypeOf(result).toMatchTypeOf<{ __typename: 'Object1' } | Error>()
    })
  })
  // describe(`envelope.schema`, () => {
  //   const g2 = g.with({ schema, output: { envelope: { errors: { schema: true } }, errors: { schema: `return` } } })
  //   // todo bring back:
  //   // type Config = typeof g._.config
  //   // test('query.<resultFieldMethod>', async () => {
  //   //   // todo: once we have execution result with type variable errors, then enhance this test to assert that the result errors come through in the errors field.
  //   //   expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<
  //   //     Envelope<Config, { resultNonNull: { __typename: 'Object1' } }>
  //   //   >()
  //   // })
  // })
})
