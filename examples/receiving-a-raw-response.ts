import { gql, rawRequest } from '../src/index.js'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

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

const { data, errors, extensions, headers, status } = await rawRequest<TData>(endpoint, query)
console.log(JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2))
