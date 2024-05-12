import { expect, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'

// todo test with custom scalars

const graffle = Graffle.create({ schema })

test(`.rawOrThrow() throws if errors array non-empty`, async () => {
  await expect(graffle.rawOrThrow({ document: `query {}` })).rejects.toMatchInlineSnapshot(
    `[ContextualAggregateError: One or more errors in the execution result.]`,
  )
})

test(`.raw() returns errors in array`, async () => {
  await expect(graffle.raw({ document: `query {}` })).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        [GraphQLError: Syntax Error: Expected Name, found "}".],
      ],
    }
  `)
})
