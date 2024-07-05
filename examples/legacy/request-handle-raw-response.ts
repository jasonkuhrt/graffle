/**
 * The `request` method will return the `data` or `errors` key from the response.
 * If you need to access the `extensions` key you can use the `rawRequest` method:
 */

import { gql, rawRequest } from '../../src/entrypoints/main.js'

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

interface Data {
  Movie: { releaseDate: string; actors: Array<{ name: string }> }
}

const { data, errors, extensions, headers, status } = await rawRequest<Data>(endpoint, query)
console.log({ data, errors, extensions, headers, status })
