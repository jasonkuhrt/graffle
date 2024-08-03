/* eslint-disable */

import { gql, Graffle } from '../src/entrypoints/alpha/main.js'

const request = Graffle.create({ schema: `https://countries.trevorblades.com/graphql` }).use({
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
}).rawOrThrow

const { data } = await request(
  gql`
		{
			countries {
				name
			}
		}	
	`,
)

console.log(data)
