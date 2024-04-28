import { expect, test } from 'vitest'
import { $Index } from '../../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { create } from './client.js'

// todo test with custom scalars

const client = create({ schema, schemaIndex: $Index })

test(`.rawOrThrow() throws if errors array non-empty`, async () => {
  await expect(client.rawOrThrow(`query {}`)).rejects.toMatchInlineSnapshot(
    `[ContextualAggregateError: One or more errors in the execution result.]`,
  )
})

test(`.raw() returns errors in array`, async () => {
  await expect(client.raw(`query {}`)).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        [GraphQLError: Syntax Error: Expected Name, found "}".],
      ],
    }
  `)
})
