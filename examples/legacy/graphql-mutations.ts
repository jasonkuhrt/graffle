import { gql, GraphQLClient } from '../../src/entrypoints/main.js'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
})

const mutation = gql`
  mutation AddMovie($title: String!, $releaseDate: Int!) {
    insert_movies_one(object: { title: $title, releaseDate: $releaseDate }) {
      title
      releaseDate
    }
  }
`

const variables = {
  title: `Inception`,
  releaseDate: 2010,
}

const data = await graphQLClient.request(mutation, variables)
console.log(data)
