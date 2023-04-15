;(global as any).fetch = require(`fetch-cookie/node-fetch`)(require(`node-fetch`)) //eslint-disable-line

import { gql, GraphQLClient } from '../src/index.js'

const client = new GraphQLClient(`https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`, {
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

interface TData {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

const data = await client.rawRequest<TData>(query)
console.log(data)
