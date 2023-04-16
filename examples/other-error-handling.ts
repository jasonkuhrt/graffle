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

interface Data {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

try {
  const data = await request<Data>(endpoint, query)
  console.log(data)
} catch (error) {
  console.error(error)
  process.exit(1)
}
