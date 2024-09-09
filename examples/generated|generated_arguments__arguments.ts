import { Atlas } from './$/generated-clients/atlas/__.js'
import { showJson } from './$/helpers.js'

const atlas = Atlas.create()

const countries = await atlas.query.countries({
  $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
  name: true,
  continent: { name: true },
})

showJson(countries)
