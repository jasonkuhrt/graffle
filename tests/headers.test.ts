import * as CrossFetch from 'cross-fetch'
import * as Dom from '../src/types.dom'
import { GraphQLClient, request } from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()
// Headers not defined globally in Node
const H = typeof Headers === 'undefined' ? CrossFetch.Headers : Headers

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

  describe('custom header in the request', () => {
    describe.each([
      [new H({ 'x-request-foo': 'request-bar' })],
      [{ 'x-request-foo': 'request-bar' }],
      [[['x-request-foo', 'request-bar']]]
    ])('request unique header with request', (headerCase: Dom.RequestInit['headers']) => {
      
      test('with request method', async () => {
        const client = new GraphQLClient(ctx.url)

        client.setHeaders(new H({ 'x-foo': 'bar' }))
        const mock = ctx.res()
        await client.request(`{ me { id } }`, {}, headerCase)
  
        expect(mock.requests[0].headers['x-foo']).toEqual('bar')
        expect(mock.requests[0].headers['x-request-foo']).toEqual('request-bar')
      })

      test('with rawRequest method', async () => {
        const client = new GraphQLClient(ctx.url)

        client.setHeaders(new H({ 'x-foo': 'bar' }))
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`, {}, headerCase)
  
        expect(mock.requests[0].headers['x-foo']).toEqual('bar')
        expect(mock.requests[0].headers['x-request-foo']).toEqual('request-bar')
      })
    })
  
    describe.each([
      [new H({ 'x-foo': 'request-bar' })],
      [{ 'x-foo': 'request-bar' }],
      [[['x-foo', 'request-bar']]]
    ])('request header overriding the client header', (headerCase: Dom.RequestInit['headers']) => {
      test('with request method', async () => {
        const client = new GraphQLClient(ctx.url)
        client.setHeader('x-foo', 'bar')
        const mock = ctx.res()
        await client.request(`{ me { id } }`, {}, headerCase);
        expect(mock.requests[0].headers['x-foo']).toEqual('request-bar')
      });

      test('with rawRequest method', async () => {
        const client = new GraphQLClient(ctx.url)
        client.setHeader('x-foo', 'bar')
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`, {}, headerCase);
        expect(mock.requests[0].headers['x-foo']).toEqual('request-bar')
      });

    })

    describe('gets fresh dynamic headers before each request', () => {
      test('with request method', async () => {
        const objectChangedThroughReference = { 'x-foo': 'old' }
        const client = new GraphQLClient(ctx.url, { headers: () => objectChangedThroughReference });
        objectChangedThroughReference['x-foo'] = 'new';
        const mock = ctx.res()
        await client.request(`{ me { id } }`);
        expect(mock.requests[0].headers['x-foo']).toEqual('new')
      })

      test('with rawRequest method', async () => {
        const objectChangedThroughReference = { 'x-foo': 'old' }
        const client = new GraphQLClient(ctx.url, { headers: () => objectChangedThroughReference });
        objectChangedThroughReference['x-foo'] = 'new';
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`);
        expect(mock.requests[0].headers['x-foo']).toEqual('new')
      })
    })
  })
})

describe('using request function', () => {
  describe.each([
    [new H({ 'x-request-foo': 'request-bar' })],
    [{ 'x-request-foo': 'request-bar' }],
    [[['x-request-foo', 'request-bar']]]
  ])('request unique header with request', (headerCase: Dom.RequestInit['headers']) => {
    test('sets header', async () => {
      const mock = ctx.res()
      await request(ctx.url, `{ me { id } }`, {}, headerCase)

      expect(mock.requests[0].headers['x-request-foo']).toEqual('request-bar')
    });
  })
})
