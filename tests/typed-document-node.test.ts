import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'
import request from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()

test('typed-document-node code should TS compile with variables', async () => {
  ctx.res({ body: { data: { foo: 1 } } })

  const query: TypedDocumentNode<{ echo: string }, { str: string }> = parse(/* GraphQL */ `
    query greetings($str: String!) {
      echo(str: $echo)
    }
  `)

  // variables are mandatory here!

  // @ts-expect-error 'str' is declared here.
  await request(ctx.url, query, {})
  // @ts-expect-error Arguments for the rest parameter '_variablesAndRequestHeaders' were not provided.
  await request(ctx.url, query)

  await request(ctx.url, query, { str: 'Hi' })

  // @ts-expect-error 'variables' is declared here.
  await request({
    url: ctx.url,
    document: query,
  })

  await request({
    url: ctx.url,
    document: query,
    // @ts-expect-error Property 'str' is missing in type '{}' but required in type '{ str: string; }'.
    variables: {},
  })

  await request({
    url: ctx.url,
    document: query,
    // @ts-expect-error Type '{ aaa: string; }' is not assignable to type '{ str: string; }'.
    variables: { aaa: 'aaa' },
  })

  await request({
    url: ctx.url,
    document: query,
    // @ts-expect-error Type 'number' is not assignable to type 'string'.ts(2322)
    variables: { str: 1 },
  })

  await request({
    url: ctx.url,
    document: 'a graphql query',
    variables: { whatever: 'not typed' },
  })

  await request<{ echo: string }, { str: string }>({
    url: ctx.url,
    document: 'a graphql query',
    variables: { str: 'Hi' },
  })

  await request<{ echo: string }, { str: string }>({
    url: ctx.url,
    document: 'a graphql query',
    // @ts-expect-error Type 'number' is not assignable to type 'string'.ts(2322)
    variables: { str: 1 },
  })

  await request<{ echo: string }, { str: string }>({
    url: ctx.url,
    document: 'a graphql query',
    // @ts-expect-error Type '{ aaa: string; }' is not assignable to type '{ str: string; }'.
    variables: { aaa: 'aaa' },
  })

  await request({
    url: ctx.url,
    document: query,
    variables: {
      str: 'foo',
    },
  })

  expect(1).toBe(1)
})

test('typed-document-node code should TS compile without variables', async () => {
  ctx.res({ body: { data: { foo: 1 } } })

  const query: TypedDocumentNode<{ echo: string }> = parse(/* GraphQL */ `
    query greetings {
      echo
    }
  `)

  // variables are not mandatory here!

  await request(ctx.url, query, {})
  await request(ctx.url, query)

  await request({
    url: ctx.url,
    document: query,
  })

  await request({
    url: ctx.url,
    document: query,
    variables: {},
  })

  await request({
    url: ctx.url,
    document: 'a graphql query',
    variables: {},
  })

  await request({
    url: ctx.url,
    document: 'a graphql query',
  })

  expect(1).toBe(1)
})
