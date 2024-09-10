import getPort from 'get-port'
import type { GraphQLSchema } from 'graphql'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { inspect } from 'node:util'

export const documentQueryContinents = {
  document: `query { continents { name } }`,
}

export const publicGraphQLSchemaEndpoints = {
  Atlas: `https://countries.trevorblades.com/graphql`,
}

export const showPartition = `---------------------------------------- SHOW ----------------------------------------`

export const show = (value: unknown) => {
  console.log(showPartition)
  console.log(inspect(value, { depth: null, colors: true }))
}

export const showJson = (value: unknown) => {
  console.log(showPartition)
  console.log(JSON.stringify(value, null, 2))
}

export const serveSchema = async (input: { schema: GraphQLSchema }) => {
  const { schema } = input
  const yoga = createYoga({ schema, logging: false, maskedErrors: false })
  const server = createServer(yoga) // eslint-disable-line
  const port = await getPort({ port: [3000, 3001, 3002, 3003, 3004] })
  const url = new URL(`http://localhost:${String(port)}/graphql`)
  let runState = true
  server.listen(port)
  await new Promise((resolve) =>
    server.once(`listening`, () => {
      resolve(undefined)
    })
  )
  const stop = async () => {
    if (!runState) return
    runState = false
    await new Promise((resolve) => {
      server.close(resolve)
      setImmediate(() => {
        server.emit(`close`)
      })
    })
  }

  process.once('beforeExit', stop)

  return {
    yoga,
    server,
    port,
    url,
    stop,
  }
}

export type SchemaServer = Awaited<ReturnType<typeof serveSchema>>

export const dynamicValue = `DYNAMIC_VALUE`
