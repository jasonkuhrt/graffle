import type * as $ from '../../../../../src/entrypoints/schema.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //
export namespace Root {
  export type Mutation = $.Output.ObjectMutation<{
    addPokemon: $.Field<
      $.Output.Nullable<Object.Pokemon>,
      $.Args<{
        attack: $.Input.Field<$Scalar.Int>
        defense: $.Input.Field<$Scalar.Int>
        hp: $.Input.Field<$Scalar.Int>
        name: $.Input.Field<$Scalar.String>
      }, false>
    >
  }>

  export type Query = $.Output.ObjectQuery<{
    pokemon: $.Field<$.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
    pokemonByName: $.Field<
      $.Output.Nullable<$.Output.List<Object.Pokemon>>,
      $.Args<{
        name: $.Input.Field<$Scalar.String>
      }, false>
    >
    trainerByName: $.Field<
      $.Output.Nullable<Object.Trainer>,
      $.Args<{
        name: $.Input.Field<$Scalar.String>
      }, false>
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
