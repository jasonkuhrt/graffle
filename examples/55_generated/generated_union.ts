/**
 * This example shows how to work with GraphQL union types in the TypeScript interface.
 */

import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { show } from '../$/helpers.js'

const pokemon = Pokemon.create()

// dprint-ignore
const battles = await pokemon.query.battles({
  __typename: true,
  ___on_BattleRoyale: {
    date: true,
    combatants: {
      trainer: {
        name: true,
      },
      pokemons: {
        name: true,
      }
    },
    winner: {
      name: true,
    },
  },
  ___on_BattleTrainer: {
    date: true,
    combatant1: {
      trainer: {
        name: true,
      },
      pokemon: {
        name: true,
      },
    },
    combatant2: {
      trainer: {
        name: true,
      },
      pokemon: {
        name: true,
      },
    },
    winner: {
      name: true,
    },
  },
  ___on_BattleWild: {
    date: true,
    trainer: {
      name: true,
    },
    pokemon: {
      name: true,
    },
    wildPokemons: {
      name: true,
    },
    result: true,
  },
})

// The following contrived switch shows how the returned type is a discriminated union.
// After checking the __typename, the type is known to be one of the possible battle types
// and TypeScript narrows accordingly.

const dateFormatter = new Intl.DateTimeFormat(`en-US`, { timeZone: `UTC` })

for (const battle of battles) {
  switch (battle.__typename) {
    case `BattleRoyale`: {
      // eslint-disable-next-line
      // @ts-ignore-error fixme
      const trainers = battle.combatants?.map(_ => _.trainer?.name)
      let info = ``
      info += `${battle.__typename} on ${dateFormatter.format(new Date(battle.date ?? 0))}\n`
      info += `combatants: ${trainers?.join(`, `) ?? `null`}\n`
      info += `winner: ${battle.winner?.name ?? `null`}`
      show(info)
      break
    }
    case `BattleTrainer`: {
      let info = ``
      info += `${battle.__typename} on ${dateFormatter.format(new Date(battle.date ?? 0))}\n`
      info += `${battle.combatant1?.trainer?.name ?? `null`} vs ${battle.combatant2?.trainer?.name ?? `null`}\n`
      info += `winner: ${battle.winner?.name ?? `null`}`
      show(info)
      break
    }
    case `BattleWild`: {
      let info = ``
      info += `${battle.__typename} on ${dateFormatter.format(new Date(battle.date ?? 0))}\n`
      info += `trainer: ${battle.trainer?.name ?? `null`} with ${battle.pokemon?.name ?? `null`}\n`
      info += `vs wild pokemons: ${battle.wildPokemons?.map(_ => _.name).join(`, `) ?? `null`}\n`
      info += `result: ${battle.result ?? `null`}`
      show(info)
      break
    }
  }
}
