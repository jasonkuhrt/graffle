/* eslint-disable */
import { Graffle } from '../src/entrypoints/main.js'
import { showJson } from './$helpers.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.SocialStudies })
  .use({
    name: `CustomFetch`,
    anyware: async ({ exchange }) => {
      return await exchange({
        using: {
          fetch: async () => {
            return new Response(JSON.stringify({ data: { countries: [{ name: `Canada Mocked!` }] } }))
          },
        },
      })
    },
  })

const countries = await graffle.rawString({ document: `{ countries { name } }` })

showJson(countries.data)
