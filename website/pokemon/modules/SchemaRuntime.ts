/* eslint-disable */
import * as $ from 'graffle/schema'
import * as Data from './Data.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = new URL('http://localhost:3000/graphql')

export const DateFilter = $.InputObject(`DateFilter`, {
  gte: $.Input.Field($.Input.Nullable($Scalar.Float)),
  lte: $.Input.Field($.Input.Nullable($Scalar.Float)),
}, true)

export const PokemonFilter = $.InputObject(`PokemonFilter`, {
  birthday: $.Input.Field(() => $.Input.Nullable(DateFilter)),
  name: $.Input.Field(() => $.Input.Nullable(StringFilter)),
}, true)

export const StringFilter = $.InputObject(`StringFilter`, {
  contains: $.Input.Field($.Input.Nullable($Scalar.String)),
  in: $.Input.Field($.Input.Nullable($.Input.List($Scalar.String))),
}, true)
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Pokemon = $.Object$(`Pokemon`, {
  attack: $.field($.Output.Nullable($Scalar.Int)),
  birthday: $.field($.Output.Nullable($Scalar.Int)),
  defense: $.field($.Output.Nullable($Scalar.Int)),
  hp: $.field($.Output.Nullable($Scalar.Int)),
  id: $.field($.Output.Nullable($Scalar.Int)),
  name: $.field($.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field($.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Trainer = $.Object$(`Trainer`, {
  id: $.field($.Output.Nullable($Scalar.Int)),
  name: $.field($.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field($.Output.Nullable($.Output.List(() => Pokemon))),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  addPokemon: $.field(
    $.Output.Nullable(() => Pokemon),
    $.Args({
      attack: $.Input.Field($Scalar.Int),
      defense: $.Input.Field($Scalar.Int),
      hp: $.Input.Field($Scalar.Int),
      name: $.Input.Field($Scalar.String),
    }, false),
  ),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field($.Output.Nullable($.Output.List(() => Pokemon))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemonByName: $.field(
    $.Output.Nullable($.Output.List(() => Pokemon)),
    $.Args({ name: $.Input.Field($Scalar.String) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemons: $.field(
    $.Output.Nullable($.Output.List(() => Pokemon)),
    $.Args({ filter: $.Input.Field($.Input.Nullable(PokemonFilter)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainerByName: $.field($.Output.Nullable(() => Trainer), $.Args({ name: $.Input.Field($Scalar.String) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainers: $.field($.Output.Nullable($.Output.List(() => Trainer))),
})
export const $Index: Index = {
  name: Data.Name,
  RootTypesPresent: ['Query', 'Mutation'] as const,
  RootUnion: undefined as any, // Type level only.
  Root: {
    Query,
    Mutation,
    Subscription: null,
  },
  allTypes: {
    Mutation,
    Query,
    Pokemon,
    Trainer,
  },
  objects: {
    Pokemon,
    Trainer,
  },
  unions: {},
  interfaces: {},
  error: {
    objects: {},
    objectsTypename: {},
    rootResultFields: {
      Query: {},
      Mutation: {},
      Subscription: {},
    },
  },
}
