import { CountriesClient } from './generated-clients/countries/__.js'

const request = CountriesClient.create({
  schema: `https://countries.trevorblades.com/graphql`,
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
})

const continents = await request.query.continents({ name: true })

console.log(continents)
