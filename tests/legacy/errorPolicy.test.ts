import { describe, expect, test } from 'vitest'
import { GraphQLClient } from '../../src/entrypoints/main.js'
import { errors, setupMockServer } from './__helpers.js'

const ctx = setupMockServer()

const data = { test: {} }

describe(`"none"`, () => {
  test(`throws error`, async () => {
    ctx.res({ body: { data: {}, errors } })
    await expect(() => new GraphQLClient(ctx.url).rawRequest(`x`)).rejects.toThrow(`GraphQL Error`)
  })
  test(`is the default`, async () => {
    ctx.res({ body: { data: {}, errors } })
    await expect(() => new GraphQLClient(ctx.url).rawRequest(`x`)).rejects.toThrow(`GraphQL Error`)
  })
})

describe(`"ignore"`, () => {
  test(`does not throw error, returns only data`, async () => {
    ctx.res({ body: { data, errors } })
    const res = await new GraphQLClient(ctx.url, { errorPolicy: `ignore` }).rawRequest(`x`)
    expect(res).toEqual(expect.objectContaining({ data }))
    expect(res).toEqual(expect.not.objectContaining({ errors }))
  })
})

describe(`"all"`, () => {
  test(`does not throw, returns both data and error`, async () => {
    ctx.res({ body: { data, errors } })
    const res = await new GraphQLClient(ctx.url, { errorPolicy: `all` }).rawRequest(`x`)
    expect(res).toEqual(expect.objectContaining({ data, errors }))
  })
})
