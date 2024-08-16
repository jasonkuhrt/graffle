/* eslint-disable */

import * as $ from '../../../src/entrypoints/graffle/schema.js'
import * as $Scalar from './Scalar.js'

export const $defaultSchemaUrl = new URL('https://countries.trevorblades.com/graphql')

export const ContinentFilterInput = $.InputObject(`ContinentFilterInput`, {
  code: $.Input.field(() => $.Input.Nullable(StringQueryOperatorInput)),
})

export const CountryFilterInput = $.InputObject(`CountryFilterInput`, {
  code: $.Input.field(() => $.Input.Nullable(StringQueryOperatorInput)),
  continent: $.Input.field(() => $.Input.Nullable(StringQueryOperatorInput)),
  currency: $.Input.field(() => $.Input.Nullable(StringQueryOperatorInput)),
  name: $.Input.field(() => $.Input.Nullable(StringQueryOperatorInput)),
})

export const LanguageFilterInput = $.InputObject(`LanguageFilterInput`, {
  code: $.Input.field(() => $.Input.Nullable(StringQueryOperatorInput)),
})

export const StringQueryOperatorInput = $.InputObject(`StringQueryOperatorInput`, {
  eq: $.Input.field($.Input.Nullable($Scalar.String)),
  in: $.Input.field($.Input.Nullable($.Input.List($Scalar.String))),
  ne: $.Input.field($.Input.Nullable($Scalar.String)),
  nin: $.Input.field($.Input.Nullable($.Input.List($Scalar.String))),
  regex: $.Input.field($.Input.Nullable($Scalar.String)),
})

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
  name: $.field($Scalar.String, $.Args({ lang: $.Input.Nullable($Scalar.String) })),
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
  continent: $.field($.Output.Nullable(() => Continent), $.Args({ code: $Scalar.ID })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continents: $.field($.Output.List(() => Continent), $.Args({ filter: $.Input.Nullable(ContinentFilterInput) })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  countries: $.field($.Output.List(() => Country), $.Args({ filter: $.Input.Nullable(CountryFilterInput) })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  country: $.field($.Output.Nullable(() => Country), $.Args({ code: $Scalar.ID })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  language: $.field($.Output.Nullable(() => Language), $.Args({ code: $Scalar.ID })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  languages: $.field($.Output.List(() => Language), $.Args({ filter: $.Input.Nullable(LanguageFilterInput) })),
})

export const $Index = {
  name: 'SocialStudies' as const,
  Root: {
    Query,
    Mutation: null,
    Subscription: null,
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
