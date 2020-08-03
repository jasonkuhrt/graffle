import body from 'body-parser'
import express, { Application, Request } from 'express'
import { createServer, Server } from 'http'
import { JsonObject } from 'type-fest'

type CapturedRequest = Pick<Request, 'headers' | 'method' | 'body'>

type Context = {
  server: Application
  nodeServer: Server
  url: string
  mock: <D extends JsonObject>(data: D) => D & { requests: CapturedRequest[] }
}

export function setupTestServer() {
  const ctx = {} as Context
  beforeAll((done) => {
    ctx.server = express()
    ctx.server.use(body.json())
    ctx.nodeServer = createServer()
    ctx.nodeServer.listen({ port: 3210 })
    ctx.url = 'http://localhost:3210'
    ctx.nodeServer.on('request', ctx.server)
    ctx.nodeServer.once('listening', done)
    ctx.mock = (spec) => {
      const requests: CapturedRequest[] = []
      ctx.server.use('*', function mock(req, res) {
        requests.push({
          method: req.method,
          headers: req.headers,
          body: req.body,
        })
        if (spec.headers) {
          Object.entries(spec.headers).forEach(([name, value]) => {
            res.setHeader(name, value)
          })
        }
        res.send(spec.body ?? {})
      })
      return { ...spec, requests }
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
