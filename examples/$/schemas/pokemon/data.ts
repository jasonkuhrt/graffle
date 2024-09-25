export namespace DatabaseServer {
  export interface Trainer {
    id: number
    name: string
  }

  export interface Pokemon {
    id: number
    name: string
    hp: number
    attack: number
    defense: number
    trainerId: number | null // Nullable, as a Pokémon may not be captured by a trainer
  }

  export interface Database {
    trainers: Trainer[]
    pokemon: Pokemon[]
  }

  const defaultDatabase: Database = {
    trainers: [],
    pokemon: [],
  }

  const databases: Record<string, Database> = {
    $default: defaultDatabase,
  }

  export const tenant = (scope?: string) => {
    if (!scope) {
      return defaultDatabase
    }

    let database = databases[scope]

    if (!database) {
      database = structuredClone(defaultDatabase)
      databases[scope] = database
    }

    return database
  }

  export const seed = (database: Database) => {
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
}
