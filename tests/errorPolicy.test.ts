import { GraphQLClient } from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()
const errors = {
  message: 'Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n',
  locations: [
    {
      line: 1,
      column: 1,
    },
  ],
}

test('should throw error when error policy not set', async () => {
  ctx.res({
    body: {
      data: {},
      errors,
    },
  })

  expect(async () => await new GraphQLClient(ctx.url).rawRequest(`x`)).rejects.toThrow('GraphQL Error')
})

test('should throw error when error policy set to "none"', async () => {
  ctx.res({
    body: {
      data: {},
      errors,
    },
  })

  expect(async () => await new GraphQLClient(ctx.url).rawRequest(`x`)).rejects.toThrow('GraphQL Error')
})

test('should not throw error when error policy set to "ignore" and return only data', async () => {
  ctx.res({
    body: {
      data: { test: {} },
      errors,
    },
  })

  const res = await new GraphQLClient(ctx.url, { errorPolicy: 'ignore' }).rawRequest(`x`)

  expect(res).toEqual(expect.objectContaining({ data: { test: {} } }))
  expect(res).toEqual(expect.not.objectContaining({ errors }))
})

test('should not throw error when error policy set to "all" and return both data and error', async () => {
  ctx.res({
    body: {
      data: { test: {} },
      errors,
    },
  })

  const res = await new GraphQLClient(ctx.url, { errorPolicy: 'all' }).rawRequest(`x`)

  expect(res).toEqual(expect.objectContaining({ data: { test: {} }, errors }))
})
