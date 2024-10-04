import { beforeEach, describe, expect } from 'vitest'
import { test } from '../../../../tests/_/helpers.js'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { createExtension } from '../extension/extension.js'

// todo test with custom scalars

const graffle = Graffle.create({ schema })

describe(`memory transport`, () => {
  let input: object | undefined
  const spyExchangeInput = createExtension({
    name: `spy`,
    onRequest: ({ exchange }) => {
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
      await graffle.use(spyExchangeInput).gql`query { id }`.send()
      expect(input).toMatchObject({ operationName: undefined })
    })
    test(`reflects explicit value`, async () => {
      await graffle.use(spyExchangeInput).gql`query foo { id }`.send(`foo`)
      expect(input).toMatchObject({ operationName: `foo` })
    })
  })
})
