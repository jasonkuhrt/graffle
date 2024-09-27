/**
 * This example shows how to work with interface types.
 */

import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { show } from '../$/helpers.js'

const pokemon = Pokemon.create()

// dprint-ignore
const beings = await pokemon.query.beings({
  __typename: true,
  id: true,
  name: true,
  ___on_Patron: {
//^^^^^^^^^^^^
    money: true,
  },
  ___on_Trainer: {
//^^^^^^^^^^^^^
    class: true,
  },
  ___on_Pokemon: {
//^^^^^^^^^^^^^
    type: true,
  },
})

// The following contrived switch shows how the returned type is a discriminated union.
// After checking the __typename, the type is known to be one of the three possible types
// and TypeScript narrows accordingly.

for (const being of beings) {
  show(being.name)
  switch (being.__typename) {
    case `Patron`:
      show(being.money)
      break
    case `Trainer`:
      show(being.class)
      break
    case `Pokemon`:
      show(being.type)
      break
  }
}
