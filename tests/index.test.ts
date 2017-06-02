import test from 'ava'
import * as fetchMock from 'fetch-mock'
import { ClientError, request } from '../src/index'

test('minimal query', async (t) => {
  const data = {
    viewer: {
      id: 'some-id',
    },
  }

  await mock({data}, async () => {
    t.deepEqual(await request('https://mock-api.com/graphql', `{ viewer { id } }`), data)
  })
})

test('basic error', async (t) => {
  const errors = {
    message: "Syntax Error GraphQL request (1:1) Unexpected Name \"x\"\n\n1: x\n   ^\n",
    locations: [
      {
        line: 1,
        column: 1
      }
    ]
  }

  await mock({errors}, async () => {
    const err: ClientError = await t.throws(request('https://mock-api.com/graphql', `x`))
    t.deepEqual<any>(err.response.errors, errors)
  })
})

async function mock(response: any, testFn: () => Promise<void>) {
  fetchMock.mock({
    matcher: '*',
    response: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    },
  })

  await testFn()

  fetchMock.restore()
}
