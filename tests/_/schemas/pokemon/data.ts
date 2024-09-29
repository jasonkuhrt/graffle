const day = 1000 * 60 * 60 * 24
// const year = day * 365.25

export namespace DatabaseServer {
  export const BattleType = {
    wild: `wild`,
    trainer: `trainer`,
    royale: `royale`,
  } as const
  export type BattleType = (typeof BattleType)[keyof typeof BattleType]

  export type Battle = BattleWild | BattleTrainer | BattleRoyale

  export const BattleWildResult = {
    trainerDefeated: `trainerDefeated`,
    pokemonsDefeated: `pokemonsDefeated`,
    pokemonsCaptured: `pokemonsCaptured`,
  }
  export type BattleWildResult = (typeof BattleWildResult)[keyof typeof BattleWildResult]

  export interface BattleWild {
    type: `BattleWild`
    id: string
    date: number
    trainerId: string
    pokemonId: string
    wildPokemonsIds: string[]
    result: BattleWildResult
  }

  export interface BattleTrainer {
    type: `BattleTrainer`
    id: string
    date: number
    combatantOneTrainerId: string
    combatantOnePokemonId: string
    combatantTwoTrainerId: string
    combatantTwoPokemonId: string
    combatantWinnerId: string
  }

  export interface CombatantMultiPokemon {
    trainerId: string
    pokemonIds: string[]
  }

  export interface BattleRoyale {
    type: `BattleRoyale`
    id: string
    date: number
    combatants: CombatantMultiPokemon[]
    combatantWinnerId: string
  }

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
    bug: `bug`,
  } as const
  export type PokemonType = typeof PokemonType[keyof typeof PokemonType]

  export interface Being {
    kind: string
    id: string
    name: string
  }

  export interface Patron extends Being {
    kind: `Patron`
    money: number
  }

  export interface Trainer extends Being {
    kind: `Trainer`
    class: TrainerClass
    patronIds: string[]
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
    trainerId: string | null // Nullable, as a Pokémon may not be captured by a trainer
  }

  export interface Database {
    trainers: Trainer[]
    pokemon: Pokemon[]
    patrons: Patron[]
    battles: Battle[]
  }

  const emptyDatabase: Database = {
    trainers: [],
    pokemon: [],
    patrons: [],
    battles: [],
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
    const sally: Patron = { id: `0`, name: `Sally`, kind: `Patron`, money: 1_080_000 }
    const dylan: Patron = { id: `1`, name: `Dylan`, kind: `Patron`, money: 3_530_000 }

    database.patrons.push(sally, dylan)

    const ash: Trainer = { id: `1`, name: `Ash`, patronIds: [`0`, `1`], kind: `Trainer`, class: TrainerClass.youth }
    const misty: Trainer = {
      id: `2`,
      name: `Misty`,
      patronIds: [],
      kind: `Trainer`,
      class: TrainerClass.teamRocketGrunt,
    }
    const brock: Trainer = { id: `3`, name: `Brock`, patronIds: [], kind: `Trainer`, class: TrainerClass.youth }
    const gary: Trainer = { id: `4`, name: `Gary`, patronIds: [], kind: `Trainer`, class: TrainerClass.youth }

    database.trainers.push(ash, misty, brock, gary)

    // dprint-ignore
    database.pokemon.push(
      { id: `1`, name: `Pikachu`, type: `electric`, hp: 35, attack: 55, defense: 40, trainerId: `1`, birthday: new Date(Date.UTC(1850, 0, 1)).getTime(), kind: `Pokemon` },
      { id: `2`, name: `Charizard`, type: `fire`, hp: 78, attack: 84, defense: 78, trainerId: `1`, birthday: new Date(Date.now() - day * 5).getTime(), kind: `Pokemon` },
      { id: `3`, name: `Squirtle`, type: `water`, hp: 44, attack: 48, defense: 65, trainerId: `2`, birthday: new Date(Date.UTC(1910, 0, 1)).getTime(), kind: `Pokemon` },
      { id: `4`, name: `Bulbasaur`, type: `grass`, hp: 45, attack: 49, defense: 49, trainerId: null, birthday: new Date(Date.UTC(2000, 0, 1)).getTime(), kind: `Pokemon` },
      { id: `5`, name: `Caterpie`, type: `bug`, hp: 45, attack: 30, defense: 35, trainerId: null, birthday: new Date(Date.UTC(2000, 0, 1)).getTime(), kind: `Pokemon` },
      { id: `6`, name: `Weedle`, type: `bug`, hp: 40, attack: 35, defense: 50, trainerId: null, birthday: new Date(Date.UTC(2000, 0, 1)).getTime(), kind: `Pokemon` },
      
    )

    database.battles.push(
      {
        id: `1`,
        type: `BattleWild`,
        date: new Date(Date.UTC(2020, 0, 1)).getTime(),
        trainerId: `1`,
        pokemonId: `1`,
        wildPokemonsIds: [`4`, `3`],
        result: BattleWildResult.pokemonsCaptured,
      },
      {
        id: `2`,
        type: `BattleTrainer`,
        date: new Date(Date.UTC(2003, 0, 1)).getTime(),
        combatantOneTrainerId: `1`,
        combatantOnePokemonId: `1`,
        combatantTwoTrainerId: `2`,
        combatantTwoPokemonId: `4`,
        combatantWinnerId: `2`,
      },
      {
        id: `3`,
        type: `BattleRoyale`,
        date: new Date(Date.UTC(1987, 0, 1)).getTime(),
        combatants: [
          { trainerId: `1`, pokemonIds: [`1`, `2`] },
          { trainerId: `2`, pokemonIds: [`3`, `4`] },
        ],
        combatantWinnerId: `1`,
      },
    )
  }
}
