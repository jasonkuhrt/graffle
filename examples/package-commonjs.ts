/* eslint-disable */

const { request, gql } = require(`graphql-request`)

main()

async function main() {
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

  const data = await request(endpoint, query)
  console.log(data)
}
