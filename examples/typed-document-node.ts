import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { parse } from "graphql";

import { request } from '../src'

;(async function () {
  const endpoint = 'https://graphql-yoga.com/api/graphql'

  const query: TypedDocumentNode<{ greetings: string }, never | Record<any, never>> = parse(/* GraphQL */ `
    query greetings {
      greetings
    }
  `)

  const variables = {}

  const data = await request(endpoint, query, variables)
  
  console.log(data.greetings)
})().catch((error) => console.error(error))

/** TypeScript API Tests */

async function _() {
  const endpoint = 'noop'
    
  const query: TypedDocumentNode<{ echo: string }, { str: string }> = parse(/* GraphQL */ `
    query greetings($str: String!) {
      echo(str: $echo)
    }
  `)

  // variables are mandatory here!

  // @ts-expect-error 'str' is declared here.
  const _data = await request(endpoint, query, {})
  // @ts-expect-error Arguments for the rest parameter '_variablesAndRequestHeaders' were not provided.
  const __data = await request(endpoint, query)


  const data = await request(endpoint, query, { str: "Hi" })
  data.echo
}

async function __() {
  const endpoint = 'noop'
      
  const document: TypedDocumentNode<{ echo: string }, { str: string }> = parse(/* GraphQL */ `
    query greetings($str: String!) {
      echo(str: $echo)
    }
  `)
  
  // variables are mandatory here!

  // @ts-expect-error 'variables' is declared here.
  await request({
    url: endpoint,
    document,
  })

  await request({
    url: endpoint,
    document,
    // @ts-expect-error Property 'str' is missing in type '{}' but required in type '{ str: string; }'.
    variables: {}
  })

  await request({
    url: endpoint,
    document,
    // @ts-expect-error Type '{ aaa: string; }' is not assignable to type '{ str: string; }'.
    variables: { aaa: "aaa" }
  })

  await request({
    url: endpoint,
    document,
    // @ts-expect-error Type 'number' is not assignable to type 'string'.ts(2322)
    variables: { str: 1 }
  })

  const data = await request({
    url: endpoint,
    document,
    variables: {
      str: "foo"
    }
  })
  data.echo
}
