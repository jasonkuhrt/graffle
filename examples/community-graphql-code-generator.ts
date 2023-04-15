/**
 * `graphql-request@^5` supports `TypedDocumentNode`, the typed counterpart of `graphql`'s `DocumentNode`.
 *
 * Installing and configuring GraphQL Code Generator requires a few steps in order to get end-to-end typed GraphQL operations using the provided `graphql()`.
 *
 * The complete example is available in the GraphQL Code Generator repository:
 *
 * @see https://github.com/dotansimha/graphql-code-generator/tree/master/examples/front-end/react/graphql-request
 *
 * Visit GraphQL Code Generator's dedicated guide to get started:
 *
 * @see https://www.the-guild.dev/graphql/codegen/docs/guides/react-vue.
 */

import request, { gql } from '../src/index.js'
// @ts-expect-error todo make this actually work
import { graphql } from './gql/gql'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

const document = graphql(gql`
  query getMovie($title: String!) {
    Movie(title: $title) {
      releaseDate
      actors {
        name
      }
    }
  }
`)

// Variables are typed!
const data = await request(endpoint, document, { title: `Inception` })

// @ts-expect-error todo make this actually work
console.log(data.Movie) // typed!
