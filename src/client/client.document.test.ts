import { expect, test } from 'vitest'
import type { Index } from '../../tests/_/schema/generated/Index.js'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { db, schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

// todo different error now
// @ts-expect-error infinite depth
const client = create<Index>({ schema, schemaIndex: $Index })

test(`document`, async () => {
  const result = await client.document({
    foo: {
      query: { id: true },
    },
    bar: {
      query: { id: true },
    },
  }).run(`foo`)
  expect(result).toEqual({ data: { id: db.id1 } })
})
