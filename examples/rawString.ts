import { Graffle } from '../src/entrypoints/alpha/main.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.SocialStudies,
})

const document = /* gql */ `
	{
		countries {
			name
		}
	}	
`

const result = await graffle.rawString({
  document,
})

console.log(result.data)
