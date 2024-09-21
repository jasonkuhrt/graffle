/* eslint-disable */
import * as $ from '../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = undefined

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Pokemon = $.Object$(`Pokemon`, {
  attack: $.field($.Output.Nullable($Scalar.Int)),
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
