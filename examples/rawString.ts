import { Graffle } from '../src/entrypoints/alpha/main.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.SocialStudies,
})

const result = await graffle.rawString(
  /* gql */ `
		{
			countries {
				name
			}
		}	
	`,
)

console.log(result.data)
