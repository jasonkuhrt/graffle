import { ApolloServer } from 'apollo-server-express'
import body from 'body-parser'
import express, { Application, Request } from 'express'
import getPort from 'get-port'
import { graphqlUploadExpress } from 'graphql-upload'
import { createServer, Server } from 'http'
import { JsonObject } from 'type-fest'

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
  errors?: JsonObject
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

export function setupTestServer<T extends MockSpec | MockSpecBatch = MockSpec>(delay?: number): Context<T> {
  const ctx = {} as Context<T>
  beforeAll(async () => {
    const port = await getPort()
    ctx.server = express()
    ctx.server.use(body.json())
    ctx.nodeServer = createServer()
    ctx.nodeServer.listen({ port })
    ctx.nodeServer.on('request', ctx.server)
    await new Promise((res) => {
      ctx.nodeServer.once('listening', res)
    })
    ctx.url = `http://localhost:${port}`
    ctx.res = (spec?: T): MockResult<T> => {
      const requests: CapturedRequest[] = []
      ctx.server.use('*', async function mock(req, res) {
        if (delay) {
          await sleep(delay)
        }

        req.headers.host = 'DYNAMIC'
        requests.push({
          method: req.method,
          headers: req.headers,
          body: req.body,
        })
        if (spec?.headers) {
          Object.entries(spec.headers).forEach(([name, value]) => {
            res.setHeader(name, value)
          })
        }
        res.send(spec?.body ?? { data: {} })
      })

      return { spec, requests: requests } as MockResult<T>
    }
  })

  afterEach(() => {
    // https://stackoverflow.com/questions/10378690/remove-route-mappings-in-nodejs-express/28369539#28369539
    ctx.server._router.stack.forEach((item: any, i: number) => {
      if (item.name === 'mock') ctx.server._router.stack.splice(i, 1)
    })
  })

  afterAll((done) => {
    ctx.nodeServer.close(done)
  })

  return ctx
}

type ApolloServerContextOptions = { typeDefs: string; resolvers: any }

export async function startApolloServer({ typeDefs, resolvers }: ApolloServerContextOptions) {
  const app = express()

  const apolloServer = new ApolloServer({ typeDefs, resolvers })

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  await apolloServer.start()
  apolloServer.applyMiddleware({ app: app as any })

  let server: Server

  await new Promise<void>((resolve) => {
    server = app.listen(0, resolve)
  })

  return server!
}

export function createApolloServerContext({ typeDefs, resolvers }: ApolloServerContextOptions) {
  const ctx: { url: string; server: Server } = {} as any

  beforeEach(async () => {
    ctx.server = await startApolloServer({ typeDefs, resolvers })
    const address = ctx.server.address()
    if (address && typeof address === 'object') {
      ctx.url = `http://localhost:${address.port}/graphql`
    }
  })

  afterEach(async () => {
    await new Promise<void>((res, rej) => {
      ctx.server.close((e) => (e ? rej(e) : res()))
    })
  })

  return ctx
}

export function sleep(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
