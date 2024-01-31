import { gql, request } from '../src/entrypoints/main.js'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

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

interface Data {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

const data = await request<Data>(endpoint, query, variables)
console.log(data)
