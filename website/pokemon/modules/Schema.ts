/* eslint-disable */
import type * as Utilities from 'graffle/utilities-for-generated'
import type * as Data from './Data.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as Schema from './SchemaBuildtime.js'

export interface Index extends Utilities.SchemaIndexBase {
  name: Data.Name
  RootTypesPresent: ['Mutation', 'Query']
  RootUnion: Schema.Root.Mutation | Schema.Root.Query
  Root: {
    Query: Schema.Root.Query
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  allTypes: {
    Mutation: Schema.Root.Mutation
    Query: Schema.Root.Query
    BattleWildResult: Schema.Enum.BattleWildResult
    PokemonType: Schema.Enum.PokemonType
    TrainerClass: Schema.Enum.TrainerClass
    BattleRoyale: Schema.Object.BattleRoyale
    BattleTrainer: Schema.Object.BattleTrainer
    BattleWild: Schema.Object.BattleWild
    CombatantMultiPokemon: Schema.Object.CombatantMultiPokemon
    CombatantSinglePokemon: Schema.Object.CombatantSinglePokemon
    Patron: Schema.Object.Patron
    Pokemon: Schema.Object.Pokemon
    Trainer: Schema.Object.Trainer
    Battle: Schema.Union.Battle
    Being: Schema.Interface.Being
  }
  objects: {
    BattleRoyale: Schema.Object.BattleRoyale
    BattleTrainer: Schema.Object.BattleTrainer
    BattleWild: Schema.Object.BattleWild
    CombatantMultiPokemon: Schema.Object.CombatantMultiPokemon
    CombatantSinglePokemon: Schema.Object.CombatantSinglePokemon
    Patron: Schema.Object.Patron
    Pokemon: Schema.Object.Pokemon
    Trainer: Schema.Object.Trainer
  }
  unions: {
    Battle: Schema.Union.Battle
  }
  interfaces: {
    Being: Schema.Interface.Being
  }
  customScalars: Utilities.SchemaIndexBase['customScalars']
  extensions: Utilities.GlobalRegistry.TypeExtensions
}
