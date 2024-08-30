import { SocialStudies } from './$generated-clients/SocialStudies/__.js'
import { showJson } from './$helpers.js'

const socialStudies = SocialStudies.create({
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
})

const continents = await socialStudies.query.continents({ name: true })

showJson(continents)
