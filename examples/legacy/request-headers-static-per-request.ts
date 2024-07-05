/**
 * It is possible to pass custom headers for each request. `request()` and `rawRequest()` accept a header object as the third parameter
 */

import { gql, GraphQLClient } from '../../src/entrypoints/main.js'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
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

const requestHeaders = {
  authorization: `Bearer MY_TOKEN_2`,
  'x-custom': `foo`,
}

interface Data {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

const data = await client.request<Data>(query, {}, requestHeaders)
console.log(data)
