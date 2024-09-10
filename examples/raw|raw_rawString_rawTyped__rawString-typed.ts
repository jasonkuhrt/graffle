import { Graffle, type TypedDocumentString } from '../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from './$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Atlas,
})

/**
 * @remarks Typically this type would come from your code generation tool.
 *
 * @see https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#documentmode
 * @see https://github.com/jasonkuhrt/graffle/issues/997
 */
type Document = TypedDocumentString<
  { countries: { name: string; continent: { name: string } }[] },
  { filter: string[] }
>

const document: Document = /* gql */ `
  query countries ($filter: [String!]) {
    countries (filter: { name: { in: $filter } }) {
      name
      continent {
        name
      }
    }
  }
`

const result = await graffle.rawString({
  document,
  variables: { filter: [`Canada`, `Germany`, `Japan`] },
})

show(result.data?.countries)
