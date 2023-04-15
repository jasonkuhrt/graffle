import { gql, GraphQLClient } from '../src/index.js'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

const graphQLClient = new GraphQLClient(endpoint, {
  credentials: `include`,
  mode: `cors`,
})

const query = gql`
  {
    Movie(title: "Inception") {
      releaseDate
      actors {
        name
      }
    }
  }
`

interface TData {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

const data = await graphQLClient.request<TData>(query)
console.log(data)
