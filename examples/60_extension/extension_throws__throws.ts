/**
 * This example shows how to use the Or Throw extension to throw errors for one-off cases.
 */

import { Throws } from '../../src/entrypoints/extensions.js'
import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { interceptAndShowUncaughtErrors, show } from '../$/show.js'

interceptAndShowUncaughtErrors()

const pokemon = Pokemon
  .create({ output: { defaults: { errorChannel: `return` } } })
  .use(Throws())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  })

const result1 = await pokemon.query.pokemons({ name: true })
show(result1)

const result2 = await pokemon.throws().query.pokemons({ name: true })
//                                          ^^^^^^^
result2 // This line will never be reached because of thrown error.
