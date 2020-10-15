import * as CrossFetch from 'cross-fetch'
import { GraphQLClient } from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()

describe('using class', () => {
  test('.setHeader() sets a header that get sent to server', async () => {
    const client = new GraphQLClient(ctx.url)
    client.setHeader('x-foo', 'bar')
    const mock = ctx.res()
    await client.request(`{ me { id } }`)
    expect(mock.requests[0].headers['x-foo']).toEqual('bar')
  })

  describe('.setHeaders() sets headers that get sent to the server', () => {
    test('with headers instance', async () => {
      const client = new GraphQLClient(ctx.url)
      // Headers not defined globally in Node
      const H = typeof Headers === 'undefined' ? CrossFetch.Headers : Headers
      client.setHeaders(new H({ 'x-foo': 'bar' }))
      const mock = ctx.res()
      await client.request(`{ me { id } }`)
      expect(mock.requests[0].headers['x-foo']).toEqual('bar')
    })
    test('with headers object', async () => {
      const client = new GraphQLClient(ctx.url)
      client.setHeaders({ 'x-foo': 'bar' })
      const mock = ctx.res()
      await client.request(`{ me { id } }`)
      expect(mock.requests[0].headers['x-foo']).toEqual('bar')
    })
    test('with header tuples', async () => {
      const client = new GraphQLClient(ctx.url)
      client.setHeaders([['x-foo', 'bar']])
      const mock = ctx.res()
      await client.request(`{ me { id } }`)
      expect(mock.requests[0].headers['x-foo']).toEqual('bar')
    })
  })
})
