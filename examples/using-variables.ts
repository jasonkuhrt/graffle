import { request } from '../src'

;(async function() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = /* GraphQL */ `
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
    title: 'Inception',
  }

  const data = await request<{
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }>(endpoint, query, variables)
  console.log(JSON.stringify(data, undefined, 2))
})().catch(error => console.error(error))
