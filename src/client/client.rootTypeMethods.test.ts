import { expect, test } from 'vitest'
import * as Schema from '../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create<Schema.Index>({ schema: Schema.schema, schemaIndex: Schema.$Index })

test(`query`, async () => {
  await expect(client.query.dateObject1({ date1: true })).resolves.toEqual({ date1: new Date(0) })
})
