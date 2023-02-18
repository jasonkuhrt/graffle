import { batchRequests } from '../src/index.js'
import type { MockSpecBatch } from './__helpers.js'
import { setupMockServer } from './__helpers.js'
import { expect, test } from 'vitest'

const mockServer = setupMockServer<MockSpecBatch>()

test(`minimal double query`, async () => {
  const firstResult = { me: { id: `some-id` } }
  const secondResult = { me: { id: `another-id` } }
  mockServer.res({
    body: [{ data: firstResult }, { data: secondResult }],
  })
  const [firstResponse, secondResponse] = await batchRequests(mockServer.url, [
    { document: `{ me { id } }` },
    { document: `{ me { id } }` },
  ])

  expect(firstResponse.data).toEqual(firstResult)
  expect(secondResponse.data).toEqual(secondResult)
})

test(`basic error`, async () => {
  mockServer.res({
    body: [
      {
        errors: {
          message: `Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n`,
          locations: [
            {
              line: 1,
              column: 1,
            },
          ],
        },
      },
    ],
  })

  await expect(batchRequests(mockServer.url, [{ document: `x` }])).rejects.toMatchInlineSnapshot(
    `[Error: GraphQL Error (Code: 200): {"response":{"0":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]}},"status":200,"headers":{}},"request":{"query":["x"],"variables":[null]}}]`
  )
})

test(`successful query with another which make an error`, async () => {
  const firstResult = { data: { me: { id: `some-id` } } }
  const secondResult = {
    errors: {
      message: `Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n`,
      locations: [
        {
          line: 1,
          column: 1,
        },
      ],
    },
  }

  mockServer.res({
    body: [firstResult, secondResult],
  })

  await expect(
    batchRequests(mockServer.url, [{ document: `{ me { id } }` }, { document: `x` }])
  ).rejects.toMatchInlineSnapshot(
    `[Error: GraphQL Error (Code: 200): {"response":{"0":{"data":{"me":{"id":"some-id"}}},"1":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]}},"status":200,"headers":{}},"request":{"query":["{ me { id } }","x"],"variables":[null,null]}}]`
  )
})

// test('basic error with raw request', async () => {
//   ctx.res({
//     body: {
//       errors: {
//         message: 'Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n',
//         locations: [
//           {
//             line: 1,
//             column: 1,
//           },
//         ],
//       },
//     },
//   })
//   const res = await rawRequest(ctx.url, `x`).catch((x) => x)
//   expect(res).toMatchInlineSnapshot(
//     `[Error: GraphQL Error (Code: 200): {"response":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]},"status":200,"headers":{}},"request":{"query":"x"}}]`
//   )
// })
