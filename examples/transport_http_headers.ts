import { Graffle } from '../src/entrypoints/graffle/main.js'
import { showJson } from './$helpers.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.SocialStudies,
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
}).use(async ({ exchange }) => {
  showJson([...new Headers(exchange.input.request.headers).entries()])
  return exchange()
})

await graffle.rawString({ document: `{ languages { code } }` })
