/**
 * This example shows how to configure output to have only certain kinds of errors returned while others thrown.
 */

import { Pokemon } from './$/generated-clients/pokemon/__.js'
import { serveSchema, show } from './$/helpers.js'
import { schema } from './$/schemas/pokemon/schema.js'

const server = await serveSchema({ schema: schema })

const pokemon = Pokemon
  .create({
    schema: server.url,
    output: {
      envelope: false,
      errors: {
        execution: `return`,
        other: `throw`,
      },
    },
  })

// 1. The __execution__ error of an empty Pokemon name will be ***returned***.

type _result = typeof result
const result = await pokemon.mutation.addPokemon({
  $: { name: ``, hp: 1, defense: 0, attack: 0 },
  name: true,
})
show(result)

// 2. The __other__ error, in this case from the inline extension, will be ***thrown***.

try {
  await pokemon
    .anyware(({ encode: _ }) => {
      throw new Error(`Something went wrong.`)
    })
    .query
    .pokemon({ name: true })
} catch (error) {
  show(error)
}

await server.stop()
