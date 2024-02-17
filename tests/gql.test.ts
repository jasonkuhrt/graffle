import { gql } from 'graphql-tag'
import { describe, expect, it } from 'vitest'
import { request } from '../src/entrypoints/main.js'
import { setupMockServer } from './__helpers.js'

const ctx = setupMockServer()

describe(`gql`, () => {
  it(`passthrough allowing benefits of tooling for gql template tag`, async () => {
    const mock = ctx.res({ body: { data: { foo: 1 } } })
    await request(
      ctx.url,
      gql`
        query allUsers {
          users
        }
      `,
    )
    expect(mock).toMatchSnapshot()
  })
})
