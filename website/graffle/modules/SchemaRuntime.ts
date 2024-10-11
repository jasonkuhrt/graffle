/* eslint-disable */
import * as $ from 'graffle/schema'
import * as Data from './Data.js'
import * as $Scalar from './Scalar.js'
import { $index as $customScalarsIndex } from './SchemaDrivenDataMa'
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
  code: $.field('code', $Scalar.ID),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  countries: $.field('countries', $.Output.List(() => Country)),
  name: $.field('name', $Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Country = $.Object$(`Country`, {
  awsRegion: $.field('awsRegion', $Scalar.String),
  capital: $.field('capital', $.Output.Nullable($Scalar.String)),
  code: $.field('code', $Scalar.ID),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continent: $.field('continent', () => Continent),
  currencies: $.field('currencies', $.Output.List($Scalar.String)),
  currency: $.field('currency', $.Output.Nullable($Scalar.String)),
  emoji: $.field('emoji', $Scalar.String),
  emojiU: $.field('emojiU', $Scalar.String),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  languages: $.field('languages', $.Output.List(() => Language)),
  name: $.field('name', $Scalar.String, $.Args({ lang: $.Input.Field($.Input.Nullable($Scalar.String)) }, true)),
  native: $.field('native', $Scalar.String),
  phone: $.field('phone', $Scalar.String),
  phones: $.field('phones', $.Output.List($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  states: $.field('states', $.Output.List(() => State)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  subdivisions: $.field('subdivisions', $.Output.List(() => Subdivision)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Language = $.Object$(`Language`, {
  code: $.field('code', $Scalar.ID),
  name: $.field('name', $Scalar.String),
  native: $.field('native', $Scalar.String),
  rtl: $.field('rtl', $Scalar.Boolean),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const State = $.Object$(`State`, {
  code: $.field('code', $.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  country: $.field('country', () => Country),
  name: $.field('name', $Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Subdivision = $.Object$(`Subdivision`, {
  code: $.field('code', $Scalar.ID),
  emoji: $.field('emoji', $.Output.Nullable($Scalar.String)),
  name: $.field('name', $Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continent: $.field(
    'continent',
    $.Output.Nullable(() => Continent),
    $.Args({ code: $.Input.Field($Scalar.ID) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  continents: $.field(
    'continents',
    $.Output.List(() => Continent),
    $.Args({ filter: $.Input.Field($.Input.Nullable(ContinentFilterInput)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  countries: $.field(
    'countries',
    $.Output.List(() => Country),
    $.Args({ filter: $.Input.Field($.Input.Nullable(CountryFilterInput)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  country: $.field('country', $.Output.Nullable(() => Country), $.Args({ code: $.Input.Field($Scalar.ID) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  language: $.field('language', $.Output.Nullable(() => Language), $.Args({ code: $.Input.Field($Scalar.ID) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  languages: $.field(
    'languages',
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
  customScalars: {
    input: $customScalarsIndex,
  },
  error: {
    objects: {},
    objectsTypename: {},
    rootResultFields: {
      Mutation: {},
      Subscription: {},
      Query: {},
    },
  },
}
