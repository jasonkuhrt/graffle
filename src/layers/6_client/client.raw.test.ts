import { beforeEach, describe, expect } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { createExtension } from '../5_createExtension/createExtension.js'

// todo test with custom scalars

const graffle = Graffle.create({ schema })

describe(`memory transport`, () => {
  let input: object | undefined
  const spyExchangeInput = createExtension({
    name: `spy`,
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
      await graffle.use(spyExchangeInput).rawString({ document: `query { id }` })
      expect(input).toMatchObject({ operationName: undefined })
    })
    test(`reflects explicit value`, async () => {
      await graffle.use(spyExchangeInput).rawString({ document: `query foo { id }`, operationName: `foo` })
      expect(input).toMatchObject({ operationName: `foo` })
    })
  })
})
