/**
 * This example shows how to configure output to throw errors even when using the envelope.
 */

import { Atlas } from './$/generated-clients/atlas/__.js'

// dprint-ignore
const atlas = Atlas.create({
  output: {
    envelope: {
      errors: {
        execution: false,
        other: false, // default
      }
    },
  },
}).use(({ encode: _ }) => {
  throw new Error(`Something went wrong.`)
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
})

await atlas.query.continents({ name: true })
