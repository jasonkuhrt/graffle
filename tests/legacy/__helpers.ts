import type { ApolloServerExpressConfig } from 'apollo-server-express'
import { ApolloServer } from 'apollo-server-express'
import body from 'body-parser'
import type { Application, Request } from 'express'
import express from 'express'
import getPort from 'get-port'
import type { Server } from 'http'
import { createServer } from 'http'
import type { JsonArray, JsonObject } from 'type-fest'
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest'

export const errors = {
  message: `Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n`,
  locations: [
    {
      line: 1,
      column: 1,
    },
  ],
}

type CapturedRequest = Pick<Request, 'headers' | 'method' | 'body'>

type Context<S extends MockSpec | MockSpecBatch = MockSpec> = {
  server: Application
  nodeServer: Server
  url: string
  /**
   * Setup a response that will be sent to requests
   */
  res: (spec?: S) => MockResult<S>
}

type MockSpecBody = {
  data?: JsonObject
  extensions?: JsonObject
  errors?: JsonObject | JsonArray
}

type MockSpec = {
  headers?: Record<string, string>
  body?: MockSpecBody
}

export type MockSpecBatch = {
  headers?: Record<string, string>
  body?: MockSpecBody[]
}

type MockResult<Spec extends MockSpec | MockSpecBatch = MockSpec> = {
  spec: Spec
  requests: {
    method: string
    headers: Record<string, string>
    body: JsonObject
  }[]
}

export const setupMockServer = <T extends MockSpec | MockSpecBatch = MockSpec>(
  delay?: number,
): Context<T> => {
  const ctx = {} as Context<T>
  beforeAll(async () => {
    const port = await getPort()
    ctx.server = express()
    ctx.server.use(body.json())
    ctx.nodeServer = createServer()
    ctx.nodeServer.listen({ port })
    ctx.nodeServer.on(`request`, ctx.server)
    await new Promise((res) => {
      ctx.nodeServer.once(`listening`, res)
    })
    ctx.url = `http://localhost:${String(port)}`
    ctx.res = (spec?: T): MockResult<T> => {
      const requests: CapturedRequest[] = []
      // eslint-disable-next-line
      ctx.server.use(`*`, function mock(req, res) {
        void new Promise((res) => {
          delay ? setTimeout(res, delay) : res(undefined)
        }).then(() => {
          req.headers.host = `DYNAMIC`
          req.headers[`user-agent`] = `DYNAMIC` // todo undici on machine, node in CI
          requests.push({
            method: req.method,
            headers: req.headers,
            body: req.body, // eslint-disable-line
          })
          if (spec?.headers) {
            Object.entries(spec.headers).forEach(([name, value]) => {
              res.setHeader(name, value)
            })
          }
          res.send(spec?.body ?? { data: {} })
        })
      })

      return { spec, requests: requests } as MockResult<T>
    }
  })

  afterEach(() => {
    // https://stackoverflow.com/questions/10378690/remove-route-mappings-in-nodejs-express/28369539#28369539
    // eslint-disable-next-line
    ctx.server._router.stack.forEach((item: any, i: number) => {
      // eslint-disable-next-line
      if (item.name === `mock`) ctx.server._router.stack.splice(i, 1)
    })
  })

  afterAll(async () => {
    await new Promise((resolve) => {
      ctx.nodeServer.close(() => {
        resolve(undefined)
      })
    })
  })

  return ctx
}

type ApolloServerContextOptions = {
  typeDefs: string
  resolvers: ApolloServerExpressConfig['resolvers']
}

export const startApolloServer = async ({ typeDefs, resolvers }: ApolloServerContextOptions) => {
  const app = express()

  const apolloServer = new ApolloServer({ typeDefs, resolvers })

  await apolloServer.start()
  // @ts-expect-error todo
  apolloServer.applyMiddleware({ app })

  let server: Server

  await new Promise<void>((resolve) => {
    server = app.listen(0, resolve)
  })

  return server!
}

export const createApolloServerContext = ({ typeDefs, resolvers }: ApolloServerContextOptions) => {
  const ctx: { url: string; server: Server } = {} as any // eslint-disable-line

  beforeEach(async () => {
    ctx.server = await startApolloServer({ typeDefs, resolvers })
    const address = ctx.server.address()
    if (address && typeof address === `object`) {
      ctx.url = `http://localhost:${String(address.port)}/graphql`
    }
  })

  afterEach(async () => {
    await new Promise((res) => {
      ctx.server.close(() => {
        res(undefined)
      })
    })
  })

  return ctx
}

export const sleep = (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
