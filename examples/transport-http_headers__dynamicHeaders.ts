import { Graffle } from '../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from './$helpers.js'

const graffle = Graffle
  .create({
    schema: publicGraphQLSchemaEndpoints.SocialStudies,
  })
  .use(async ({ pack }) => {
    return await pack({
      input: {
        ...pack.input,
        headers: {
          'X-Sent-At-Time': Date.now().toString(),
        },
      },
    })
  })
  .use(async ({ exchange }) => {
    show(exchange.input.request)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
