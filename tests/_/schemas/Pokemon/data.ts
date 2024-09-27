const day = 1000 * 60 * 60 * 24
// const year = day * 365.25

export namespace DatabaseServer {
  export const TrainerClass = {
    youngster: `youngster`,
    bugCatcher: `bugCatcher`,
    camper: `camper`,
    picnicker: `picnicker`,
    psychic: `psychic`,
    psychicMedium: `psychicMedium`,
    psychicYoungster: `psychicYoungster`,
    sailor: `sailor`,
    superNerd: `superNerd`,
    tamer: `tamer`,
    triathlete: `triathlete`,
    youth: `youth`,
    teamRocketGrunt: `teamRocketGrunt`,
  } as const
  export type TrainerClass = (typeof TrainerClass)[keyof typeof TrainerClass]

  export const PokemonType = {
    electric: `electric`,
    fire: `fire`,
    water: `water`,
    grass: `grass`,
  } as const
  export type PokemonType = typeof PokemonType[keyof typeof PokemonType]

  export interface Being {
    kind: string
    id: number
    name: string
  }

  export interface Patron extends Being {
    kind: `Patron`
    money: number
  }

  export interface Trainer extends Being {
    kind: `Trainer`
    class: TrainerClass
    patronIds: number[]
  }

  export interface Pokemon extends Being {
    kind: `Pokemon`
    type: PokemonType
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
    patrons: Patron[]
  }

  const emptyDatabase: Database = {
    trainers: [],
    pokemon: [],
    patrons: [],
  }

  const newDatabase = (): Database => structuredClone(emptyDatabase)

  const databases: Record<string, Database> = {
    $default: newDatabase(),
  }

  export const tenant = (tenantName?: string): Database => {
    if (!tenantName) {
      return databases[`$default`]!
    }

    let database = databases[tenantName]

    if (!database) {
      database = newDatabase()
      databases[tenantName] = database
    }

    return database
  }

  export const seed = (database: Database) => {
    const sally: Patron = { id: 0, name: `Sally`, kind: `Patron`, money: 1_080_000 }
    const dylan: Patron = { id: 1, name: `Dylan`, kind: `Patron`, money: 3_530_000 }

    database.patrons.push(sally, dylan)

    const ash: Trainer = { id: 1, name: `Ash`, patronIds: [0, 1], kind: `Trainer`, class: TrainerClass.youth }
    const misty: Trainer = { id: 2, name: `Misty`, patronIds: [], kind: `Trainer`, class: TrainerClass.teamRocketGrunt }

    database.trainers.push(ash, misty)

    // dprint-ignore
    database.pokemon.push(
      { id: 1, name: `Pikachu`, type: `electric`, hp: 35, attack: 55, defense: 40, trainerId: 1, birthday: new Date(`1850`).getTime(), kind: `Pokemon` },
      { id: 2, name: `Charizard`, type: `fire`, hp: 78, attack: 84, defense: 78, trainerId: 1, birthday: new Date(Date.now() - day * 5).getTime(), kind: `Pokemon` },
      { id: 3, name: `Squirtle`, type: `water`, hp: 44, attack: 48, defense: 65, trainerId: 2, birthday: new Date(`1910`).getTime(), kind: `Pokemon` },
      { id: 4, name: `Bulbasaur`, type: `grass`, hp: 45, attack: 49, defense: 49, trainerId: null, birthday: new Date(`2000`).getTime(), kind: `Pokemon` },
    )
  }
}
