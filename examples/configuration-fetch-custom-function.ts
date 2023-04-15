import { gql, GraphQLClient } from '../src/index.js'
import crossFetch from 'cross-fetch'
import fetchCookie from 'fetch-cookie'

const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`

/**
 * Fetch with a cookie jar scoped to the client object.
 */
const fetch = fetchCookie(crossFetch)

const graphQLClient = new GraphQLClient(endpoint, { fetch })

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

const data = await graphQLClient.rawRequest<TData>(query)
console.log(data)
