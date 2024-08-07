import { beforeEach, describe, expect } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { createExtension } from '../5_createExtension/createExtension.js'

// todo test with custom scalars

const graffle = Graffle.create({ schema })

test(`.rawOrThrow() throws if errors array non-empty`, async () => {
  await expect(graffle.rawStringOrThrow({ document: `query {}` })).rejects.toMatchInlineSnapshot(
    `[ContextualAggregateError: One or more errors in the execution result.]`,
  )
})

test(`.raw() returns errors in array`, async () => {
  await expect(graffle.rawString({ document: `query {}` })).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        [GraphQLError: Syntax Error: Expected Name, found "}".],
      ],
    }
  `)
})

describe(`memory transport`, () => {
  let input: object | undefined
  const peakInput = createExtension({
    name: `peak`,
    anyware: ({ exchange }) => {
      if (exchange.input.transport === `memory`) {
        input = exchange.input
      }
      return exchange()
    },
  })
  beforeEach(() => {
    input = undefined
  })
  describe(`operationName`, () => {
    test(`undefined by default`, async () => {
      await graffle.use(peakInput).rawString({ document: `query { id }` })
      expect(input).toMatchObject({ operationName: undefined })
    })
    test(`reflects explicit value`, async () => {
      await graffle.use(peakInput).rawString({ document: `query { id }`, operationName: `foo` })
      expect(input).toMatchObject({ operationName: `foo` })
    })
  })
})

// todo http transport
