/**
 * This example shows how to configure output to embed errors into the envelope.
 */

import { Atlas } from '../$/generated-clients/atlas/__.js'
import { show } from '../$/helpers.js'

// dprint-ignore
const atlas = Atlas
  .create({
    output: {
      envelope: {
        errors: {
  //    ^^^^^^
          execution: true, // default
          other: true,
        },
      },
    },
  })
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

const result = await atlas.query.continents({ name: true })

show(result)
