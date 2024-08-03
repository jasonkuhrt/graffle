/* eslint-disable */

import { gql, Graffle } from '../src/entrypoints/alpha/main.js'

const request = Graffle.create({ schema: `https://countries.trevorblades.com/graphql` }).rawOrThrow

// todo typed document node
// interface Data {
//   countries: { name }[]
// }
// const { data } = await request<Data>(

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
