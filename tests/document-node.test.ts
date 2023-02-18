import { gql } from 'graphql-tag'
import { expect, it } from 'vitest'
import { request } from '../src/index.js'
import { setupTestServer } from './__helpers.js'

const ctx = setupTestServer()

it('accepts graphql DocumentNode as alternative to raw string', async () => {
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
