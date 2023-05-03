import { GraphQLWebSocketClient } from '../src/graphql-ws.js'
import { makeExecutableSchema } from '@graphql-tools/schema'
import getPort from 'get-port'
import { gql } from 'graphql-tag'
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { afterAll, beforeAll, expect, test } from 'vitest'
import WebSocketImpl, { WebSocketServer } from 'ws'

const createClient = async (url: string) => {
  return new Promise<GraphQLWebSocketClient>((resolve) => {
    const socket = new WebSocketImpl(url, GRAPHQL_TRANSPORT_WS_PROTOCOL) as unknown as WebSocket
    const client: GraphQLWebSocketClient = new GraphQLWebSocketClient(socket, {
      onAcknowledged: (_p) => Promise.resolve(resolve(client)),
    })
  })
}

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Subscription {
    greetings: String
  }
`

const resolvers = {
  Query: {
    hello: () => `world`,
  },
  Subscription: {
    greetings: {
      subscribe: async function* () {
        for (const hi of [`Hi`, `Bonjour`, `Hola`, `Ciao`, `Zdravo`]) {
          yield await Promise.resolve({ greetings: hi })
        }
      },
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

let ctx: { server: WebSocketServer; url: string }

beforeAll(async () => {
  const port = await getPort()
  const server = new WebSocketServer({ path: `/graphql`, host: `localhost`, port })
  useServer({ schema }, server)
  ctx = { server, url: `ws://localhost:${port}/graphql` }
})

afterAll(() => {
  ctx.server.close()
})

test(`graphql-ws request`, async () => {
  const client = await createClient(ctx.url)
  const data = client.request(
    gql`
      query hello {
        hello
      }
    `
  )
  expect(await data).toEqual({ hello: `world` })
  client.close()
})

test(`graphql-ws subscription`, async () => {
  const client = await createClient(ctx.url)
  const result = new Promise<string>((resolve) => {
    let allGreetings = ``
    client.subscribe<{ greetings: string }>(
      gql`
        subscription greetings {
          greetings
        }
      `,
      {
        next: ({ greetings }) =>
          (allGreetings = allGreetings != `` ? `${allGreetings},${greetings}` : greetings),
        complete: () => {
          resolve(allGreetings)
        },
      }
    )
  })
  expect(await result).toEqual(`Hi,Bonjour,Hola,Ciao,Zdravo`)
  client.close()
})
