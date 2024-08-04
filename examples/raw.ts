import { gql, Graffle } from '../src/entrypoints/alpha/main.js'

const graffle = Graffle.create({ schema: `https://countries.trevorblades.com/graphql` })

// todo typed document node
// interface Data {
//   countries: { name }[]
// }
// const { data } = await request<Data>(

const { data } = await graffle.rawOrThrow(
  gql`
		{
			countries {
				name
			}
		}	
	`,
)

console.log(data)
