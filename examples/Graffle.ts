import { Graffle } from '../src/entrypoints/alpha/__Graffle.js'

const request = Graffle.create({ schema: `https://countries.trevorblades.com/graphql` }).rawOrThrow

const result = await request(
  `
		{
			countries {
				name
			}
		}	
	`,
)

console.log(result.data)
