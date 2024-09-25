import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import ZodPlugin from '@pothos/plugin-zod'
import { DB } from './data.js'

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [SimpleObjectsPlugin, ZodPlugin],
})

const Trainer = builder.objectRef<DB.Trainer>(`Trainer`).implement({
  fields: (t) => ({
    id: t.int({ resolve: (trainer) => trainer.id }),
    name: t.string({ resolve: (trainer) => trainer.name }),
  }),
})

const Pokemon = builder.objectRef<DB.Pokemon>(`Pokemon`).implement({
  fields: (t) => ({
    id: t.int({ resolve: (pokemon) => pokemon.id }),
    name: t.string({ resolve: (pokemon) => pokemon.name }),
    hp: t.int({ resolve: (pokemon) => pokemon.hp }),
    attack: t.int({ resolve: (pokemon) => pokemon.attack }),
    defense: t.int({ resolve: (pokemon) => pokemon.defense }),
    trainer: t.field({
      type: Trainer,
      nullable: true,
      resolve: (pokemon) => DB.data.trainers.find((t) => t.id === pokemon.trainerId) || null,
    }),
  }),
})

builder.objectFields(Trainer, t => ({
  pokemon: t.field({
    type: t.listRef(Pokemon),
    resolve: (trainer) => DB.data.pokemon.filter((p) => p.trainerId === trainer.id),
  }),
}))

builder.queryType()
builder.mutationType()

const StringFilter = builder.inputType(`StringFilter`, {
  // todo refactor using oneOf
  fields: (t) => ({
    contains: t.string(),
    in: t.stringList(),
  }),
})

const PokemonFilter = builder.inputType(`PokemonFilter`, {
  fields: (t) => ({
    name: t.field({ type: StringFilter }),
  }),
})

builder.queryField(`pokemons`, (t) =>
  t.field({
    args: {
      filter: t.arg({ type: PokemonFilter, required: false }),
    },
    type: [Pokemon],
    resolve: (_, args) =>
      DB.data.pokemon.filter((p) => {
        if (args.filter?.name) {
          if (args.filter.name.contains) {
            return p.name.includes(args.filter.name.contains)
          }
          if (args.filter.name.in) {
            return args.filter.name.in.includes(p.name)
          }
        }
        return true
      }),
  }))

builder.queryField(`pokemon`, (t) =>
  t.field({
    type: [Pokemon],
    resolve: () => DB.data.pokemon,
  }))

builder.queryField(`pokemonByName`, (t) =>
  t.field({
    type: [Pokemon],
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }) => DB.data.pokemon.filter((p) => p.name.includes(name)),
  }))

builder.queryField(`trainers`, (t) =>
  t.field({
    type: [Trainer],
    resolve: () => DB.data.trainers,
  }))

builder.queryField(`trainerByName`, (t) =>
  t.field({
    type: Trainer,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }) => DB.data.trainers.find((t) => t.name.includes(name)) || null,
  }))

builder.mutationField(`addPokemon`, (t) =>
  t.field({
    type: Pokemon,
    args: {
      name: t.arg.string({
        required: true,
        validate: { minLength: [1, { message: 'Pokemon name cannot be empty.' }] },
      }),
      hp: t.arg.int({ required: true }),
      attack: t.arg.int({ required: true }),
      defense: t.arg.int({ required: true }),
    },
    resolve: (_, { name, hp, attack, defense }) => {
      const newPokemon = {
        id: DB.data.pokemon.length + 1,
        name,
        hp,
        attack,
        defense,
        trainerId: null,
      }
      DB.data.pokemon.push(newPokemon)
      return newPokemon
    },
  }))

const schema = builder.toSchema()

DB.seed()

export { DB } from './data.js'

export { schema }
