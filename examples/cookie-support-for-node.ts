// tslint:disable-next-line
;(global as any).fetch = require('fetch-cookie/node-fetch')(require('node-fetch'))

import { GraphQLClient } from '../src'
;(async function () {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
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

  interface TData {
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }

  const data = await graphQLClient.rawRequest<TData>(query)
  console.log(JSON.stringify(data, undefined, 2))
})().catch((error) => console.error(error))
