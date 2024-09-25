export namespace DB {
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

  export const data: Database = {
    trainers: [],
    pokemon: [],
  }

  export const seed = () => {
    const ash = { id: 1, name: `Ash` }
    const misty = { id: 2, name: `Misty` }

    data.trainers.push(ash, misty)

    data.pokemon.push(
      { id: 1, name: `Pikachu`, hp: 35, attack: 55, defense: 40, trainerId: 1 },
      { id: 2, name: `Charizard`, hp: 78, attack: 84, defense: 78, trainerId: 1 },
      { id: 3, name: `Squirtle`, hp: 44, attack: 48, defense: 65, trainerId: 2 },
      { id: 4, name: `Bulbasaur`, hp: 45, attack: 49, defense: 49, trainerId: null },
    )
  }
}
