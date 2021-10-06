import { GraphQLClient } from '../src'
import { setupTestServer } from './__helpers'

const ctx_0 = setupTestServer()
const ctx_1 = setupTestServer()

describe('using class', () => {
  test('.setEndpoint that send request to new server', async () => {
    expect(ctx_0.url === ctx_1.url).toEqual(false)
    const client = new GraphQLClient(ctx_0.url)
    const mock_0 = ctx_0.res()
    const mock_1 = ctx_1.res()
    await client.request(`{ me { id } }`)
    expect(mock_0.requests.length).toEqual(1)
    expect(mock_1.requests.length).toEqual(0)
    client.setEndpoint(ctx_1.url)
    await client.request(`{ test }`)
    expect(mock_0.requests.length).toEqual(1)
    expect(mock_1.requests.length).toEqual(1)
    await client.request(`{ test }`)
    expect(mock_0.requests.length).toEqual(1)
    expect(mock_1.requests.length).toEqual(2)
  })
})
