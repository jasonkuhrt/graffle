import { SocialStudies } from './generated-clients/SocialStudies/__.js'

const socialStudies = SocialStudies.create({
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
})

const continents = await socialStudies.query.continents({ name: true })

console.log(continents)
