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

const Trainer = builder.objectRef<DatabaseServer.Trainer>(`Trainer`).implement({
  fields: (t) => ({
    id: t.int({ resolve: (trainer) => trainer.id }),
    name: t.string({ resolve: (trainer) => trainer.name }),
  }),
})

const Pokemon = builder.objectRef<DatabaseServer.Pokemon>(`Pokemon`).implement({
  fields: (t) => ({
    id: t.int({ resolve: (pokemon) => pokemon.id }),
    name: t.string({ resolve: (pokemon) => pokemon.name }),
    hp: t.int({ resolve: (pokemon) => pokemon.hp }),
    attack: t.int({ resolve: (pokemon) => pokemon.attack }),
    defense: t.int({ resolve: (pokemon) => pokemon.defense }),
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
        return true
      }),
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

builder.queryField(`trainerByName`, (t) =>
  t.field({
    type: Trainer,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }, ctx) =>
      DatabaseServer.tenant(ctx.tenant).trainers.find((t) => t.name.includes(name)) || null,
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
        id: DatabaseServer.tenant().pokemon.length + 1,
        name,
        hp,
        attack,
        defense,
        trainerId: null,
      }
      DatabaseServer.tenant().pokemon.push(newPokemon)
      return newPokemon
    },
  }))

const schema = builder.toSchema()

DatabaseServer.seed(DatabaseServer.tenant())

export { DatabaseServer } from './data.js'

export { schema }
