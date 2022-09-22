import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'
import request from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer()

test('typed-document-node code should TS compile', async () => {
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

  const document: TypedDocumentNode<{ echo: string }, { str: string }> = parse(/* GraphQL */ `
    query greetings($str: String!) {
      echo(str: $echo)
    }
  `)

  // variables are mandatory here!

  // @ts-expect-error 'variables' is declared here.
  await request({
    url: ctx.url,
    document,
  })

  await request({
    url: ctx.url,
    document,
    // @ts-expect-error Property 'str' is missing in type '{}' but required in type '{ str: string; }'.
    variables: {},
  })

  await request({
    url: ctx.url,
    document,
    // @ts-expect-error Type '{ aaa: string; }' is not assignable to type '{ str: string; }'.
    variables: { aaa: 'aaa' },
  })

  await request({
    url: ctx.url,
    document,
    // @ts-expect-error Type 'number' is not assignable to type 'string'.ts(2322)
    variables: { str: 1 },
  })

  await request({
    url: ctx.url,
    document: 'a graphql query',
    variables: { whatever: 'not typed' },
  })

  await request({
    url: ctx.url,
    document,
    variables: {
      str: 'foo',
    },
  })

  expect(1).toBe(1)
})
