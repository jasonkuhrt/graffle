import { GraphQLClient, request } from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()

describe('using class', () => {
  describe('post', () => {
    test('without extensions set', async () => {
      const mock = ctx.res()
      const client = new GraphQLClient(ctx.url)
      await client.request({ document: `{ me { id } }` })

      expect(mock.requests[0].body).toEqual({ query: `{ me { id } }` })
    })

    test('with extensions set', async () => {
      const mock = ctx.res()
      const client = new GraphQLClient(ctx.url)
      await client.request({ document: `{ me { id } }`, extensions: { ext1: { value: 'yes' } } })

      expect(mock.requests[0].body).toEqual({
        query: `{ me { id } }`,
        extensions: { ext1: { value: 'yes' } },
      })
    })
  })

  describe('get', () => {
    test('without extensions set', async () => {
      const mock = ctx.res()
      const client = new GraphQLClient(ctx.url, { method: 'GET' })
      await client.request({ document: `{ me { id } }` })

      expect(mock.requests[0].url).toEqual(`/?query=${encodeURIComponent(`{ me { id } }`)}`)
    })

    test('with extensions set', async () => {
      const mock = ctx.res()
      const client = new GraphQLClient(ctx.url, { method: 'GET' })
      await client.request({ document: `{ me { id } }`, extensions: { ext1: { value: 'yes' } } })

      expect(mock.requests[0].url).toEqual(
        `/?query=${encodeURIComponent(`{ me { id } }`)}&extensions=${encodeURIComponent(
          JSON.stringify({ ext1: { value: 'yes' } })
        )}`
      )
    })
  })
})

describe('using request function', () => {
  test('without extensions set', async () => {
    const mock = ctx.res()
    await request({ url: ctx.url, document: `{ me { id } }` })

    expect(mock.requests[0].body).toEqual({ query: `{ me { id } }` })
  })

  test('with extensions set', async () => {
    const mock = ctx.res()
    await request({ url: ctx.url, document: `{ me { id } }`, extensions: { ext1: { value: 'yes' } } })

    expect(mock.requests[0].body).toEqual({ query: `{ me { id } }`, extensions: { ext1: { value: 'yes' } } })
  })
})
