import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'
import { gql, GraphQLClient, request } from '../../src/entrypoints/main.js'

{
  const endpoint = `https://graphql-yoga.com/api/graphql`

  const query: TypedDocumentNode<{ greetings: string }, Record<any, never>> = parse(gql`
    query greetings {
      greetings
    }
  `)

  const variables = {}

  const data = await request(endpoint, query, variables)

  console.log(data.greetings)
}

{
  const endpoint = `https://graphql-yoga.com/api/graphql`

  const client = new GraphQLClient(endpoint)

  const query: TypedDocumentNode<{ greetings: string }> = parse(gql`
    query greetings {
      greetings
    }
  `)

  const data = await client.request({ document: query })
  // const variables = {}
  // const data = await client.request({ document: query, variables: { a: 1 } })

  console.log(data.greetings)
}
