import gql from 'graphql-tag'
import { request } from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()

describe('gql', () => {
  it('passthrough allowing benefits of tooling for gql template tag', async () => {
    const mock = ctx.res({ body: { data: { foo: 1 } } })
    await request(
      ctx.url,
      gql`
        {
          query {
            users
          }
        }
      `
    )
    expect(mock).toMatchSnapshot()
  })
})
