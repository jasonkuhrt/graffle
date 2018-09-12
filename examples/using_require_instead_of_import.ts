const { request } = require('../src')

;(async () => {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

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

  const data = await request(endpoint, query)
  console.log(JSON.stringify(data, undefined, 2))
})()
