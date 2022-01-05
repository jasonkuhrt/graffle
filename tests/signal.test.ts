import { batchRequests, GraphQLClient, rawRequest, request } from '../src'
import { setupTestServer, sleep } from './__helpers'
import 'abort-controller/polyfill'

const ctx = setupTestServer(20)

it('should abort a request when the signal is defined in the GraphQLClient', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  const client = new GraphQLClient(ctx.url, { signal: abortController.signal })

  try {
    await client.request('{ me { id } }')
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort a request when the signal is defined in GraphQLClient and after the request has been sent', async () => {
  const abortController = new AbortController()
  ctx.res({
    body: {
      data: {
        me: {
          id: 'some-id',
        },
      },
    },
  }).spec.body!

  expect.assertions(1)

  const client = new GraphQLClient(ctx.url, { signal: abortController.signal })
  client.request('{ me { id } }').catch((error) => {
    expect((error as Error).message).toEqual('The user aborted a request.')
  })

  await sleep(10)
  abortController.abort()
  await sleep(20)
})

it('should abort a raw request when the signal is defined in the GraphQLClient', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  const client = new GraphQLClient(ctx.url, { signal: abortController.signal })

  try {
    await client.rawRequest(ctx.url, `{ me { id } }`)
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort batch requests when the signal is defined in the GraphQLClient', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  const client = new GraphQLClient(ctx.url, { signal: abortController.signal })

  try {
    await client.batchRequests([{ document: `{ me { id } }` }, { document: `{ me { id } }` }])
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort a request when the signal overrides GraphQLClient settings', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  const client = new GraphQLClient(ctx.url)

  try {
    await client.request({
      document: '{ me { id } }',
      signal: abortController.signal,
    })
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort a raw request when the signal overrides GraphQLClient settings', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  const client = new GraphQLClient(ctx.url)

  try {
    await client.rawRequest({ query: '{ me { id } }', signal: abortController.signal })
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort batch requests when the signal overrides GraphQLClient settings', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  const client = new GraphQLClient(ctx.url)

  try {
    await client.batchRequests({
      documents: [{ document: `{ me { id } }` }, { document: `{ me { id } }` }],
      signal: abortController.signal,
    })
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort a request', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  try {
    await request({
      url: ctx.url,
      document: '{ me { id } }',
      signal: abortController.signal,
    })
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort a request after the request has been sent', async () => {
  const abortController = new AbortController()
  ctx.res({
    body: {
      data: {
        me: {
          id: 'some-id',
        },
      },
    },
  }).spec.body!

  expect.assertions(1)

  request({
    url: ctx.url,
    document: '{ me { id } }',
    signal: abortController.signal,
  }).catch((error) => {
    expect((error as Error).message).toEqual('The user aborted a request.')
  })

  await sleep(10)
  abortController.abort()
  await sleep(20)
})

it('should abort a raw request', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  try {
    await rawRequest({
      url: ctx.url,
      query: '{ me { id } }',
      signal: abortController.signal,
    })
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort a raw request after the request has been sent', async () => {
  const abortController = new AbortController()
  ctx.res({
    body: {
      data: {
        me: {
          id: 'some-id',
        },
      },
    },
  }).spec.body!

  expect.assertions(1)

  rawRequest({
    url: ctx.url,
    query: '{ me { id } }',
    signal: abortController.signal,
  }).catch((error) => {
    expect((error as Error).message).toEqual('The user aborted a request.')
  })

  await sleep(10)
  abortController.abort()
  await sleep(20)
})

it('should abort batch requests', async () => {
  const abortController = new AbortController()
  abortController.abort()
  expect.assertions(1)

  try {
    await batchRequests({
      url: ctx.url,
      documents: [{ document: `{ me { id } }` }, { document: `{ me { id } }` }],
      signal: abortController.signal,
    })
  } catch (error) {
    expect((error as Error).message).toEqual('The user aborted a request.')
  }
})

it('should abort batch requests after a request has been sent', async () => {
  const abortController = new AbortController()
  ctx.res({
    body: {
      data: {
        me: {
          id: 'some-id',
        },
      },
    },
  }).spec.body!

  expect.assertions(1)

  batchRequests({
    url: ctx.url,
    documents: [{ document: `{ me { id } }` }, { document: `{ me { id } }` }],
    signal: abortController.signal,
  }).catch((error) => {
    expect((error as Error).message).toEqual('The user aborted a request.')
  })

  await sleep(10)
  abortController.abort()
  await sleep(20)
})
