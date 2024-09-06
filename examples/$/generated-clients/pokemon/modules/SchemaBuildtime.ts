import type * as $ from '../../../../../src/entrypoints/schema.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Mutation = $.Object$2<'Mutation', {
    addPokemon: $.Field<
      $.Output.Nullable<Object.Pokemon>,
      $.Args<{
        attack: $Scalar.Int
        defense: $Scalar.Int
        hp: $Scalar.Int
        name: $Scalar.String
      }>
    >
  }>

  export type Query = $.Object$2<'Query', {
    pokemon: $.Field<$.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
    pokemonByName: $.Field<
      $.Output.Nullable<$.Output.List<Object.Pokemon>>,
      $.Args<{
        name: $Scalar.String
      }>
    >
    trainerByName: $.Field<
      $.Output.Nullable<Object.Trainer>,
      $.Args<{
        name: $Scalar.String
      }>
    >
    trainers: $.Field<$.Output.Nullable<$.Output.List<Object.Trainer>>, null>
  }>
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
  // -- no types --
}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
  // -- no types --
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
  // -- no types --
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  export type Pokemon = $.Object$2<'Pokemon', {
    attack: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    defense: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    hp: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    id: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    name: $.Field<$.Output.Nullable<$Scalar.String>, null>
    trainer: $.Field<$.Output.Nullable<Object.Trainer>, null>
  }>

  export type Trainer = $.Object$2<'Trainer', {
    id: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    name: $.Field<$.Output.Nullable<$Scalar.String>, null>
    pokemon: $.Field<$.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
  }>
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  // -- no types --
}
