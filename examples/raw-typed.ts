import { gql, Graffle } from '../src/entrypoints/alpha/main.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.SocialStudies,
})

// TODO test that when variables are typed, then sender must supply assignable variable data.
// TODO test that when variables are typed as no variables, then variables input is removed.
// TODO test that when variables have any required properties, then sender must supply a variables object with them.
// TODO test that when variables have no required properties, then sender can supply no variables object.
const document = gql<{ countries: { name: string; continent: { name: string } }[] }, { filter: string[] }>`
  query countries ($filter: [String!]) {
    countries (filter: { name: { in: $filter } }) {
      name
      continent {
        name
      }
    }
  }
`

const result = await graffle.raw({ document, variables: { filter: [`Canada`, `Germany`, `Japan`] } })

console.log(result.data?.countries)
