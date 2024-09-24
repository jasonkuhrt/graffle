/* eslint-disable */
import * as $ from 'graffle/schema'
import * as Data from './Data.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = new URL('https://countries.trevorblades.com/graphql')

export const ContinentFilterInput = $.InputObject(`ContinentFilterInput`, {
  code: $.Input.Field(() => $.Input.Nullable(StringQueryOperatorInput)),
}, true)

export const CountryFilterInput = $.InputObject(`CountryFilterInput`, {
  code: $.Input.Field(() => $.Input.Nullable(StringQueryOperatorInput)),
  continent: $.Input.Field(() => $.Input.Nullable(StringQueryOperatorInput)),
  currency: $.Input.Field(() => $.Input.Nullable(StringQueryOperatorInput)),
  name: $.Input.Field(() => $.Input.Nullable(StringQueryOperatorInput)),
}, true)

export const LanguageFilterInput = $.InputObject(`LanguageFilterInput`, {
  code: $.Input.Field(() => $.Input.Nullable(StringQueryOperatorInput)),
}, true)

export const StringQueryOperatorInput = $.InputObject(`StringQueryOperatorInput`, {
  eq: $.Input.Field($.Input.Nullable($Scalar.String)),
  in: $.Input.Field($.Input.Nullable($.Input.List($Scalar.String))),
  ne: $.Input.Field($.Input.Nullable($Scalar.String)),
  nin: $.Input.Field($.Input.Nullable($.Input.List($Scalar.String))),
  regex: $.Input.Field($.Input.Nullable($Scalar.String)),
}, true)
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Continent = $.Object$(`Continent`, {
  code: $.field($Scalar.ID),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  countries: $.field($.Output.List(() => Country)),
  name: $.field($Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Country = $.Object$(`Country`, {
  awsRegion: $.field($Scalar.String),
  capital: $.field($.Output.Nullable($Scalar.String)),
  code: $.field($Scalar.ID),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continent: $.field(() => Continent),
  currencies: $.field($.Output.List($Scalar.String)),
  currency: $.field($.Output.Nullable($Scalar.String)),
  emoji: $.field($Scalar.String),
  emojiU: $.field($Scalar.String),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  languages: $.field($.Output.List(() => Language)),
  name: $.field($Scalar.String, $.Args({ lang: $.Input.Field($.Input.Nullable($Scalar.String)) }, true)),
  native: $.field($Scalar.String),
  phone: $.field($Scalar.String),
  phones: $.field($.Output.List($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  states: $.field($.Output.List(() => State)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  subdivisions: $.field($.Output.List(() => Subdivision)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Language = $.Object$(`Language`, {
  code: $.field($Scalar.ID),
  name: $.field($Scalar.String),
  native: $.field($Scalar.String),
  rtl: $.field($Scalar.Boolean),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const State = $.Object$(`State`, {
  code: $.field($.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  country: $.field(() => Country),
  name: $.field($Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Subdivision = $.Object$(`Subdivision`, {
  code: $.field($Scalar.ID),
  emoji: $.field($.Output.Nullable($Scalar.String)),
  name: $.field($Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continent: $.field($.Output.Nullable(() => Continent), $.Args({ code: $.Input.Field($Scalar.ID) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continents: $.field(
    $.Output.List(() => Continent),
    $.Args({ filter: $.Input.Field($.Input.Nullable(ContinentFilterInput)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  countries: $.field(
    $.Output.List(() => Country),
    $.Args({ filter: $.Input.Field($.Input.Nullable(CountryFilterInput)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  country: $.field($.Output.Nullable(() => Country), $.Args({ code: $.Input.Field($Scalar.ID) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  language: $.field($.Output.Nullable(() => Language), $.Args({ code: $.Input.Field($Scalar.ID) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  languages: $.field(
    $.Output.List(() => Language),
    $.Args({ filter: $.Input.Field($.Input.Nullable(LanguageFilterInput)) }, true),
  ),
})
export const $Index: Index = {
  name: Data.Name,
  RootTypesPresent: ['Query'] as const,
  RootUnion: undefined as any, // Type level only.
  Root: {
    Query,
    Mutation: null,
    Subscription: null,
  },
  allTypes: {
    Query,
    Continent,
    Country,
    Language,
    State,
    Subdivision,
  },
  objects: {
    Continent,
    Country,
    Language,
    State,
    Subdivision,
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
