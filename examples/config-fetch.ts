/* eslint-disable */
import { SocialStudies } from './generated-clients/SocialStudies/__.js'

const socialStudies = SocialStudies.create()
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
