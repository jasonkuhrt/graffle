/**
 * This example shows how to use the Or Throw extension to throw errors for one-off cases.
 */

import { OrThrow } from '../src/entrypoints/extensions.js'
import { Atlas } from './$/generated-clients/atlas/__.js'
import { show, interceptAndShowUncaughtErrors } from './$/show.js'

interceptAndShowUncaughtErrors()

const atlas = Atlas
  .create({ output: { defaults: { errorChannel: `return` } } })
  .use(OrThrow())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  })

const result = await atlas.query.continents({ name: true })
show(result)

await atlas.query.continentOrThrow({ name: true })
