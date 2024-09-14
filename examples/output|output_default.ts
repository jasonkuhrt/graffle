/**
 * This example shows the default output behavior.
 */

import { Atlas } from './$/generated-clients/atlas/__.js'
import { show } from './$/helpers.js'

const atlas = Atlas.create()

const continents = await atlas.query.continents({ name: true })

show(continents)
