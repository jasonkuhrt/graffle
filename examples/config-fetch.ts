/* eslint-disable */

import { CountriesClient } from './generated-clients/countries/__.js'

// todo: if used introspection query to get schema, then default schema to that URL.
const countriesClient = CountriesClient.create({ schema: `https://countries.trevorblades.com/graphql` })
  .use({
    name: `CustomFetch`,
    anyware: async ({ exchange }) => {
      return await exchange({
        using: {
          fetch: async () => {
            return new Response(JSON.stringify({ data: { countries: [{ name: `USA` }] } }))
          },
        },
      })
    },
  })

const countries = await countriesClient.query.countries({ name: true })

console.log(countries)
