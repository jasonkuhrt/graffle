import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'

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
})().catch(console.error)
