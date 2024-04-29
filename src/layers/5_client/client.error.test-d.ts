/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { isError } from '../../../tests/_/schema/generated/Error.js'
import * as Schema from '../../../tests/_/schema/schema.js'

const client = Graffle.create({ schema: Schema.schema })

test('isError utility function narrows for error objects', async () => {
  const result = await client.query.result({ $: { case: 'Object1' }, __typename: true })

  if (isError(result)) {
    expectTypeOf(result).toEqualTypeOf<{ __typename: 'ErrorOne' } | { __typename: 'ErrorTwo' }>()
  } else {
    expectTypeOf(result).toEqualTypeOf<null | { __typename: 'Object1' }>()
  }
})
