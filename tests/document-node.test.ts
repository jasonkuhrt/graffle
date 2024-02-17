import { request } from '../src/entrypoints/main.js'
import { setupMockServer } from './__helpers.js'
import { gql } from 'graphql-tag'
import { expect, it } from 'vitest'

const ctx = setupMockServer()

it(`accepts graphql DocumentNode as alternative to raw string`, async () => {
  const mock = ctx.res({ body: { data: { foo: 1 } } })
  await request(
    ctx.url,
    gql`
      {
        query {
          users
        }
      }
    `,
  )
  expect(mock).toMatchSnapshot()
})
