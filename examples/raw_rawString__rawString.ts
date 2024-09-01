import { Graffle } from '../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from './$helpers.js'

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

show(result.data)
