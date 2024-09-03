import { Graffle } from '../src/entrypoints/main.js'
import { show } from './$helpers.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle
  .create({
    schema: publicGraphQLSchemaEndpoints.SocialStudies,
    request: {
      headers: {
        authorization: `Bearer MY_TOKEN`,
      },
      mode: `cors`,
    },
  })
  .use(async ({ exchange }) => {
    show(exchange.input.request)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
