import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'

type Trainer = {
  id: number
  name: string
}

type Pokemon = {
  id: number
  name: string
  hp: number
  attack: number
  defense: number
  trainerId: number | null // Nullable, as a Pokémon may not be captured by a trainer
}

const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [SimpleObjectsPlugin],
})

type Database = {
  trainers: Trainer[]
  pokemon: Pokemon[]
}

const Trainer = builder.objectRef<Trainer>(`Trainer`).implement({
  fields: (t) => ({
    id: t.int({ resolve: (trainer) => trainer.id }),
    name: t.string({ resolve: (trainer) => trainer.name }),
  }),
})

const Pokemon = builder.objectRef<Pokemon>(`Pokemon`).implement({
  fields: (t) => ({
    id: t.int({ resolve: (pokemon) => pokemon.id }),
    name: t.string({ resolve: (pokemon) => pokemon.name }),
    hp: t.int({ resolve: (pokemon) => pokemon.hp }),
    attack: t.int({ resolve: (pokemon) => pokemon.attack }),
    defense: t.int({ resolve: (pokemon) => pokemon.defense }),
    trainer: t.field({
      type: Trainer,
      nullable: true,
      resolve: (pokemon) => database.trainers.find((t) => t.id === pokemon.trainerId) || null,
    }),
  }),
})

builder.objectFields(Trainer, t => ({
  pokemon: t.field({
    type: t.listRef(Pokemon),
    resolve: (trainer) => database.pokemon.filter((p) => p.trainerId === trainer.id),
  }),
}))

builder.queryType()
builder.mutationType()

builder.queryField(`pokemon`, (t) =>
  t.field({
    type: [Pokemon],
    resolve: () => database.pokemon,
  }))

builder.queryField(`pokemonByName`, (t) =>
  t.field({
    type: [Pokemon],
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }) => database.pokemon.filter((p) => p.name.includes(name)),
  }))

builder.queryField(`trainers`, (t) =>
  t.field({
    type: [Trainer],
    resolve: () => database.trainers,
  }))

builder.queryField(`trainerByName`, (t) =>
  t.field({
    type: Trainer,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (_, { name }) => database.trainers.find((t) => t.name.includes(name)) || null,
  }))

builder.mutationField(`addPokemon`, (t) =>
  t.field({
    type: Pokemon,
    args: {
      name: t.arg.string({ required: true }),
      hp: t.arg.int({ required: true }),
      attack: t.arg.int({ required: true }),
      defense: t.arg.int({ required: true }),
    },
    resolve: (_, { name, hp, attack, defense }) => {
      const newPokemon = {
        id: database.pokemon.length + 1,
        name,
        hp,
        attack,
        defense,
        trainerId: null,
      }
      database.pokemon.push(newPokemon)
      return newPokemon
    },
  }))

const schema = builder.toSchema()

const databaseSeedData = (database: Database) => {
  const ash = { id: 1, name: `Ash` }
  const misty = { id: 2, name: `Misty` }

  database.trainers.push(ash, misty)

  database.pokemon.push(
    { id: 1, name: `Pikachu`, hp: 35, attack: 55, defense: 40, trainerId: 1 },
    { id: 2, name: `Charizard`, hp: 78, attack: 84, defense: 78, trainerId: 1 },
    { id: 3, name: `Squirtle`, hp: 44, attack: 48, defense: 65, trainerId: 2 },
    { id: 4, name: `Bulbasaur`, hp: 45, attack: 49, defense: 49, trainerId: null },
  )
}

const database: Database = {
  trainers: [],
  pokemon: [],
}

databaseSeedData(database)

export { database, schema }
