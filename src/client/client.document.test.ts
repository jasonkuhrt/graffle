import { expect, test } from 'vitest'
import type { Index } from '../../tests/_/schema/generated/Index.js'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
// import { setupMockServer } from '../../tests/raw/__helpers.js'
import { schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'
import { toDocumentExpression } from './document.js'

// const ctx = setupMockServer()
const data = { id: `abc` }

// todo different error now
// @ts-expect-error infinite depth
const client = () => create<Index>({ schema, schemaIndex: $Index })

test(`document`, async () => {
  // const mockRes = ctx.res({ body: { data } }).spec.body!
  console.log(toDocumentExpression({
    $run: `foo`,
    query: { id: true },
    query_foo: { id: true },
  }))
  const result = await client().document({
    // $run: `foo`,
    query: { date: true },
    query_foo: { date: true },
  })
  expect(result).toEqual(data)
})
