import { GraphQLClient } from '../src'
;(async function () {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
  })

  const query = /* GraphQL */ `
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
    authorization: 'Bearer MY_TOKEN_2',
    'x-custom': 'foo',
  }

  interface TData {
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }

  const data = await client.request<TData>(query, {}, requestHeaders)
  console.log(JSON.stringify(data, undefined, 2))
})().catch((error) => console.error(error))
