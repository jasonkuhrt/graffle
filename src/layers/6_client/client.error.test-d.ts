/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schemas/KitchenSink/graffle/__.js'
import { isError } from '../../../tests/_/schemas/KitchenSink/graffle/modules/Error.js'
import * as Schema from '../../../tests/_/schemas/KitchenSink/schema.js'

const graffle = Graffle.create({ schema: Schema.schema, output: { errors: { schema: false } } })

test('isError utility function narrows for error objects', async () => {
  const result = await graffle.query.result({ $: { case: 'Object1' }, __typename: true })

  if (isError(result)) {
    expectTypeOf(result).toEqualTypeOf<{ __typename: 'ErrorOne' } | { __typename: 'ErrorTwo' }>()
  } else {
    expectTypeOf(result).toEqualTypeOf<null | { __typename: 'Object1' }>()
  }
})
