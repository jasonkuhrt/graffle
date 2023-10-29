import { request } from '../src/index.js'
import { setupMockServer } from './__helpers.js'
import { gql } from 'graphql-tag'
import { describe, expect, it } from 'vitest'

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
