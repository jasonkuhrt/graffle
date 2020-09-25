import { GraphQLClient } from '../src'
import { setupTestServer } from './__helpers'
import fetch from 'cross-fetch';

const ctx = setupTestServer()

test('with custom fetch', async () => {
    let touched = false;
    // wrap fetch in a custom method
    const customFetch = function(input: RequestInfo, init?: RequestInit) {
        touched = true
        return fetch(input, init)
    }
    const client = new GraphQLClient(ctx.url, { fetch: customFetch })
    const mock = ctx.res()
    await client.request(`{ me { id } }`)
    expect(touched).toEqual(true)
})
