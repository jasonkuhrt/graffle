/* eslint-disable */

import { gql, Graffle } from '../src/entrypoints/alpha/main.js'

const request = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
  headers: {
    authorization: `Bearer MY_TOKEN`,
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
