import { describe, expect } from 'vitest'
import { test } from '../../../../tests/_/helpers.js'
import { Spy } from '../../../../tests/_/SpyExtension.js'

// todo test with custom scalars

describe(`memory transport`, () => {
  describe(`operationName`, () => {
    test(`undefined by default`, async ({ kitchenSink }) => {
      await kitchenSink.use(Spy()).gql`query { id }`.send()
      expect(Spy.input).toMatchObject({ operationName: undefined })
    })
    test(`reflects explicit value`, async ({ kitchenSink }) => {
      await kitchenSink.use(Spy()).gql`query foo { id }`.send(`foo`)
      expect(Spy.input).toMatchObject({ operationName: `foo` })
    })
  })
})
