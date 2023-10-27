import { gql, GraphQLClient } from '../src/index.js'
import { expect, test, vitest } from 'vitest'

test(`custom fetch configuration is passed through`, async () => {
  const fetch = vitest.fn().mockResolvedValue({ ok: true, headers: new Headers(), text: () => ``, data: {} })
  const client = new GraphQLClient(`https://foobar`, {
    fetch,
    // @ts-expect-error extended fetch options
    next: {
      revalidate: 1,
    },
  })
  await client.request(gql`foo`).catch(() => {
    /* ignore */
  })
  expect(fetch.mock.calls).toMatchObject([[expect.stringMatching(`.*`), { next: { revalidate: 1 } }]])
})
