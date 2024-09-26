const day = 1000 * 60 * 60 * 24
const year = day * 365.25

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
    /**
     * Milliseconds since Unix epoch.
     */
    birthday: number
    trainerId: number | null // Nullable, as a Pokémon may not be captured by a trainer
  }

  export interface Database {
    trainers: Trainer[]
    pokemon: Pokemon[]
  }

  const emptyDatabase: Database = {
    trainers: [],
    pokemon: [],
  }

  const newDatabase = (): Database => structuredClone(emptyDatabase)

  const databases: Record<string, Database> = {
    $default: newDatabase(),
  }

  export const tenant = (tenantName?: string): Database => {
    if (!tenantName) {
      return databases['$default']!
    }

    let database = databases[tenantName]

    if (!database) {
      database = newDatabase()
      databases[tenantName] = database
    }

    return database
  }

  export const seed = (database: Database) => {
    const ash = { id: 1, name: `Ash` }
    const misty = { id: 2, name: `Misty` }

    database.trainers.push(ash, misty)

    // dprint-ignore
    database.pokemon.push(
      { id: 1, name: `Pikachu`, hp: 35, attack: 55, defense: 40, trainerId: 1, birthday: new Date('1850').getTime() },
      { id: 2, name: `Charizard`, hp: 78, attack: 84, defense: 78, trainerId: 1, birthday: new Date(Date.now() - day * 5).getTime() },
      { id: 3, name: `Squirtle`, hp: 44, attack: 48, defense: 65, trainerId: 2, birthday: new Date('1910').getTime() },
      { id: 4, name: `Bulbasaur`, hp: 45, attack: 49, defense: 49, trainerId: null, birthday: new Date('2000').getTime() },
    )
  }
}
