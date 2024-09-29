import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import ZodPlugin from '@pothos/plugin-zod'
import { DatabaseServer } from './data.js'

export const builder = new SchemaBuilder<{
  Context: {
    tenant?: string
  }
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [SimpleObjectsPlugin, ZodPlugin],
})

const TrainerClass = builder.enumType(`TrainerClass`, { values: Object.values(DatabaseServer.TrainerClass) })

const Being = builder.interfaceRef<DatabaseServer.Being>(`Being`).implement({
  resolveType: (value) => {
    return value.kind
  },
  fields: (t) => ({
    id: t.id({ resolve: (being) => being.id }),
    name: t.string({ resolve: (being) => being.name }),
  }),
})

const Patron = builder.objectRef<DatabaseServer.Patron>(`Patron`).implement({
  interfaces: [Being],
  fields: (t) => ({
    id: t.id({ resolve: (fan) => fan.id }),
    money: t.int({ resolve: (fan) => fan.money }),
    name: t.string({ resolve: (fan) => fan.name }),
  }),
})

const Trainer = builder.objectRef<DatabaseServer.Trainer>(`Trainer`).implement({
  interfaces: [Being],
  fields: (t) => ({
    id: t.id({ resolve: (trainer) => trainer.id }),
    name: t.string({ resolve: (trainer) => trainer.name }),
    class: t.field({ type: TrainerClass, resolve: (trainer) => trainer.class }),
    fans: t.field({
      type: t.listRef(Patron),
      resolve: (trainer, _, ctx) =>
        DatabaseServer.tenant(ctx.tenant).patrons.filter((f) => trainer.patronIds.includes(f.id)),
    }),
  }),
})

const Pokemon = builder.objectRef<DatabaseServer.Pokemon>(`Pokemon`).implement({
  interfaces: [Being],
  fields: (t) => ({
    id: t.id({ resolve: (pokemon) => pokemon.id }),
    type: t.field({ type: PokemonType, resolve: (pokemon) => pokemon.type }),
    name: t.string({ resolve: (pokemon) => pokemon.name }),
    hp: t.int({ resolve: (pokemon) => pokemon.hp }),
    attack: t.int({ resolve: (pokemon) => pokemon.attack }),
    defense: t.int({ resolve: (pokemon) => pokemon.defense }),
    birthday: t.int({ resolve: (pokemon) => pokemon.birthday }),
    trainer: t.field({
      type: Trainer,
      nullable: true,
      resolve: (pokemon, _, ctx) =>
        DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.id === pokemon.trainerId) || null,
    }),
  }),
})

builder.objectFields(Trainer, t => ({
  pokemon: t.field({
    type: t.listRef(Pokemon),
    resolve: (trainer, _, ctx) => DatabaseServer.tenant(ctx.tenant).pokemon.filter((p) => p.trainerId === trainer.id),
  }),
}))

const CombatantSinglePokemon = builder.objectRef<{ trainerId: string; pokemonId: string }>(`CombatantSinglePokemon`)
  .implement({
    fields: (t) => ({
      trainer: t.field({
        type: Trainer,
        resolve: (combatant, _, ctx) => {
          return DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.id === combatant.trainerId)
        },
      }),
      pokemon: t.field({
        type: Pokemon,
        resolve: (combatant, _, ctx) => {
          return DatabaseServer.tenant(ctx.tenant).pokemon.find((p) => p.id === combatant.pokemonId)
        },
      }),
    }),
  })

const CombatantMultiPokemon = builder.objectRef<{ trainerId: string; pokemonIds: string[] }>(`CombatantMultiPokemon`)
  .implement({
    fields: (t) => ({
      trainer: t.field({
        type: Trainer,
        resolve: (combatant, _, ctx) => {
          return DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.id === combatant.trainerId)
        },
      }),
      pokemons: t.field({
        type: t.listRef(Pokemon),
        resolve: (combatant, _, ctx) => {
          return DatabaseServer.tenant(ctx.tenant).pokemon.filter((p) => combatant.pokemonIds.includes(p.id))
        },
      }),
    }),
  })

const BattleWildResult = builder.enumType(`BattleWildResult`, {
  values: Object.values(DatabaseServer.BattleWildResult),
})

const BattleWild = builder.objectRef<DatabaseServer.BattleWild>(`BattleWild`).implement({
  fields: (t) => ({
    id: t.id({ resolve: (battle) => battle.id }),
    date: t.float({ resolve: (battle) => battle.date }),
    trainer: t.field({
      type: Trainer,
      resolve: (battle, _, ctx) => {
        return DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.id === battle.trainerId)
      },
    }),
    pokemon: t.field({
      type: Pokemon,
      resolve: (battle, _, ctx) => {
        return DatabaseServer.tenant(ctx.tenant).pokemon.find((p) => p.id === battle.pokemonId)
      },
    }),
    wildPokemons: t.field({
      type: t.listRef(Pokemon),
      resolve: (battle, _, ctx) => {
        return DatabaseServer.tenant(ctx.tenant).pokemon.filter((p) => battle.wildPokemonsIds.includes(p.id))
      },
    }),
    result: t.field({
      type: BattleWildResult,
      resolve: (battle) => {
        return battle.result
      },
    }),
  }),
})

const BattleTrainer = builder.objectRef<DatabaseServer.BattleTrainer>(`BattleTrainer`).implement({
  fields: (t) => ({
    id: t.id({ resolve: (battle) => battle.id }),
    date: t.float({ resolve: (battle) => battle.date }),
    combatant1: t.field({
      type: CombatantSinglePokemon,
      resolve: (battle) => {
        return {
          trainerId: battle.combatantOneTrainerId,
          pokemonId: battle.combatantOnePokemonId,
        }
      },
    }),
    combatant2: t.field({
      type: CombatantSinglePokemon,
      resolve: (battle) => {
        return {
          trainerId: battle.combatantTwoTrainerId,
          pokemonId: battle.combatantTwoPokemonId,
        }
      },
    }),
    winner: t.field({
      type: Trainer,
      resolve: (battle, _, ctx) => {
        return DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.id === battle.combatantWinnerId)
      },
    }),
  }),
})

const BattleRoyale = builder.objectRef<DatabaseServer.BattleRoyale>(`BattleRoyale`).implement({
  fields: (t) => ({
    id: t.id({ resolve: (battle) => battle.id }),
    date: t.float({ resolve: (battle) => battle.date }),
    combatants: t.field({
      type: t.listRef(CombatantMultiPokemon),
      resolve: (battle) => {
        return battle.combatants
      },
    }),
    winner: t.field({
      type: Trainer,
      resolve: (battle, _, ctx) => {
        return DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.id === battle.combatantWinnerId)
      },
    }),
  }),
})

const Battle = builder.unionType(`Battle`, {
  types: [BattleWild, BattleTrainer, BattleRoyale],
  resolveType: (value) => {
    return value.type
  },
})

// Inputs

const StringFilter = builder.inputType(`StringFilter`, {
  // todo refactor using oneOf
  fields: (t) => ({
    contains: t.string(),
    in: t.stringList(),
  }),
})

const DateFilter = builder.inputType(`DateFilter`, {
  fields: (t) => ({
    lte: t.float(),
    gte: t.float(),
  }),
})

const PokemonFilter = builder.inputType(`PokemonFilter`, {
  fields: (t) => ({
    name: t.field({ type: StringFilter }),
    birthday: t.field({ type: DateFilter }),
  }),
})

// Root Types

builder.queryType()

builder.mutationType()

builder.queryField(`pokemons`, (t) =>
  t.field({
    args: {
      filter: t.arg({ type: PokemonFilter, required: false }),
    },
    type: [Pokemon],
    resolve: (_, args, ctx) =>
      DatabaseServer.tenant(ctx.tenant).pokemon.filter((p) => {
        if (args.filter?.name) {
          if (args.filter.name.contains) {
            return p.name.includes(args.filter.name.contains)
          }
          if (args.filter.name.in) {
            return args.filter.name.in.includes(p.name)
          }
        }
        if (args.filter?.birthday) {
          if (args.filter.birthday.lte) {
            return p.birthday <= args.filter.birthday.lte
          }
          if (args.filter.birthday.gte) {
            return p.birthday >= args.filter.birthday.gte
          }
        }
        return true
      }),
  }))

builder.queryField(`battles`, (t) =>
  t.field({
    nullable: false,
    type: [Battle],
    resolve: (_, __, ctx) => DatabaseServer.tenant(ctx.tenant).battles,
  }))

builder.queryField(`pokemon`, (t) =>
  t.field({
    type: [Pokemon],
    resolve: (_, __, ctx) => DatabaseServer.tenant(ctx.tenant).pokemon,
  }))

builder.queryField(`pokemonByName`, (t) =>
  t.field({
    type: [Pokemon],
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }, ctx) => DatabaseServer.tenant(ctx.tenant).pokemon.filter((p) => p.name.includes(name)),
  }))

builder.queryField(`trainers`, (t) =>
  t.field({
    type: [Trainer],
    resolve: (_, __, ctx) => DatabaseServer.tenant(ctx.tenant).trainers,
  }))

builder.queryField(`beings`, (t) =>
  t.field({
    nullable: false,
    type: t.listRef(Being),
    resolve: (_, __, ctx) => {
      const db = DatabaseServer.tenant(ctx.tenant)
      return [
        ...db.patrons,
        ...db.trainers,
        ...db.pokemon,
      ]
    },
  }))

builder.queryField(`trainerByName`, (t) =>
  t.field({
    type: Trainer,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }, ctx) =>
      DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.name.includes(name)) || null,
  }))

const PokemonType = builder.enumType(`PokemonType`, { values: Object.values(DatabaseServer.PokemonType) })

builder.mutationField(`addPokemon`, (t) =>
  t.field({
    type: Pokemon,
    args: {
      name: t.arg.string({
        required: true,
        validate: { minLength: [1, { message: `Pokemon name cannot be empty.` }] },
      }),
      type: t.arg({ type: PokemonType, required: true }),
      hp: t.arg.int({ required: false }),
      attack: t.arg.int({ required: false }),
      defense: t.arg.int({ required: false }),
    },
    resolve: (_, { name, type, hp, attack, defense }, ctx) => {
      const newPokemon: DatabaseServer.Pokemon = {
        kind: `Pokemon`,
        type,
        id: String(DatabaseServer.tenant(ctx.tenant).pokemon.length + 1),
        name,
        hp: hp || 1,
        attack: attack || 0,
        defense: defense || 0,
        trainerId: null,
        birthday: new Date().getTime(),
      }
      DatabaseServer.tenant(ctx.tenant).pokemon.push(newPokemon)
      return newPokemon
    },
  }))

const schema = builder.toSchema()

DatabaseServer.seed(DatabaseServer.tenant())

export { DatabaseServer } from './data.js'

export { schema }
