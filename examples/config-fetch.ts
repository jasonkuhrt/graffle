import { SocialStudies } from './generated-clients/SocialStudies/__.js'

// todo: if used introspection query to get schema, then default schema to that URL.
// todo: https://github.com/jasonkuhrt/graphql-request/issues/1015
const socialStudies = SocialStudies.create({ schema: `https://countries.trevorblades.com/graphql` })
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

// todo $scalars does not work
// todo intelisense for $ doesn't work
const countries = await socialStudies.query.countries({ name: true })

console.log(countries)
