/**
 * Queries can be sent as an HTTP GET request:
 */
import { gql, GraphQLClient } from 'graphql-request'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

const graphQLClient = new GraphQLClient(endpoint, {
  method: `GET`,
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
})

const query = gql`
  query getMovie($title: String!) {
    Movie(title: $title) {
      releaseDate
      actors {
        name
      }
    }
  }
`

const variables = {
  title: `Inception`,
}

const data = await graphQLClient.request(query, variables)
console.log(data)
