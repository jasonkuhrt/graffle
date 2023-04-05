import { gql, request } from '../src/index.js'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

const query = gql`
  {
    Movie(title: "Inception") {
      releaseDate
      actors {
        fullname # "Cannot query field 'fullname' on type 'Actor'. Did you mean 'name'?"
      }
    }
  }
`

interface TData {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

try {
  const data = await request<TData>(endpoint, query)
  console.log(JSON.stringify(data, undefined, 2))
} catch (error) {
  console.error(JSON.stringify(error, undefined, 2))
  process.exit(1)
}
