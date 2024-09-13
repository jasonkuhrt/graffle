/**
 * This example shows how to configure output to throw errors even when using the envelope.
 */

import { OrThrow } from '../src/entrypoints/extensions.js'
import { Atlas } from './$/generated-clients/atlas/__.js'

// dprint-ignore
const atlas = Atlas
  .create({
    output: {
      envelope: {
        errors: {
          execution: false,
          other: false, // default
        }
      },
    },
  })
  .use(OrThrow())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

await atlas.query.continentsOrThrow({ name: true })
