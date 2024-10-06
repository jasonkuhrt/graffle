import { beforeEach } from 'vitest'
import { createExtension } from '../../src/entrypoints/main.js'

export const Spy = () =>
  createExtension({
    name: `spy`,
    onRequest: ({ exchange }) => {
      if (exchange.input.transport === `memory`) {
        Spy.input = exchange.input
      }
      return exchange()
    },
  })

Spy.input = undefined as object | undefined

beforeEach(() => {
  Spy.input = undefined
})
