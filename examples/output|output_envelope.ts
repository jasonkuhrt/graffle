import { Atlas } from './$/generated-clients/atlas/__.js'
import { show } from './$/helpers.js'

const atlas = Atlas.create({
  output: {
    envelope: true,
  },
})

const result = await atlas.query.continents({ name: true })

show(result)
