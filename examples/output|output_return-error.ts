/**
 * This example shows how to configure output to have errors returned instead of e.g. thrown.
 */

import { Atlas } from './$/generated-clients/atlas/__.js'
import { show } from './$/helpers.js'

// dprint-ignore
const atlas = Atlas
  .create({
    output: {
      envelope: false,
      defaults: {
        errorChannel: `return`,
      },
    },
  })
  // dprint-ignore
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  })

const result = await atlas.query.continents({ name: true })
type _result = typeof result
//   ^?

show(result)
