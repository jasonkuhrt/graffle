import { rawRequest } from '../src/index'

;(async () => {
  const query = /* GraphQL */ `{
    Movie(title: "Inception") {
      releaseDate
      actors {
        name
      }
    }
  }`

  const { data, errors, extensions, headers, status } = await rawRequest(
    'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr',
    query
  )

  console.log(
    JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2)
  )
})()
