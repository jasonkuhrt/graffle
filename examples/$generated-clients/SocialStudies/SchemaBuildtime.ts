import type * as $ from '../../../src/entrypoints/schema.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Query = $.Object$2<'Query', {
    continent: $.Field<
      $.Output.Nullable<Object.Continent>,
      $.Args<{
        code: $Scalar.ID
      }>
    >
    continents: $.Field<
      $.Output.List<Object.Continent>,
      $.Args<{
        filter: $.Input.Nullable<InputObject.ContinentFilterInput>
      }>
    >
    countries: $.Field<
      $.Output.List<Object.Country>,
      $.Args<{
        filter: $.Input.Nullable<InputObject.CountryFilterInput>
      }>
    >
    country: $.Field<
      $.Output.Nullable<Object.Country>,
      $.Args<{
        code: $Scalar.ID
      }>
    >
    language: $.Field<
      $.Output.Nullable<Object.Language>,
      $.Args<{
        code: $Scalar.ID
      }>
    >
    languages: $.Field<
      $.Output.List<Object.Language>,
      $.Args<{
        filter: $.Input.Nullable<InputObject.LanguageFilterInput>
      }>
    >
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
  export type ContinentFilterInput = $.InputObject<'ContinentFilterInput', {
    code: $.Input.Nullable<InputObject.StringQueryOperatorInput>
  }>

  export type CountryFilterInput = $.InputObject<'CountryFilterInput', {
    code: $.Input.Nullable<InputObject.StringQueryOperatorInput>
    continent: $.Input.Nullable<InputObject.StringQueryOperatorInput>
    currency: $.Input.Nullable<InputObject.StringQueryOperatorInput>
    name: $.Input.Nullable<InputObject.StringQueryOperatorInput>
  }>

  export type LanguageFilterInput = $.InputObject<'LanguageFilterInput', {
    code: $.Input.Nullable<InputObject.StringQueryOperatorInput>
  }>

  export type StringQueryOperatorInput = $.InputObject<'StringQueryOperatorInput', {
    eq: $.Input.Nullable<$Scalar.String>
    in: $.Input.Nullable<$.Input.List<$Scalar.String>>
    ne: $.Input.Nullable<$Scalar.String>
    nin: $.Input.Nullable<$.Input.List<$Scalar.String>>
    regex: $.Input.Nullable<$Scalar.String>
  }>
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
  export type Continent = $.Object$2<'Continent', {
    code: $.Field<$Scalar.ID, null>
    countries: $.Field<$.Output.List<Object.Country>, null>
    name: $.Field<$Scalar.String, null>
  }>

  export type Country = $.Object$2<'Country', {
    awsRegion: $.Field<$Scalar.String, null>
    capital: $.Field<$.Output.Nullable<$Scalar.String>, null>
    code: $.Field<$Scalar.ID, null>
    continent: $.Field<Object.Continent, null>
    currencies: $.Field<$.Output.List<$Scalar.String>, null>
    currency: $.Field<$.Output.Nullable<$Scalar.String>, null>
    emoji: $.Field<$Scalar.String, null>
    emojiU: $.Field<$Scalar.String, null>
    languages: $.Field<$.Output.List<Object.Language>, null>
    name: $.Field<
      $Scalar.String,
      $.Args<{
        lang: $.Input.Nullable<$Scalar.String>
      }>
    >
    native: $.Field<$Scalar.String, null>
    phone: $.Field<$Scalar.String, null>
    phones: $.Field<$.Output.List<$Scalar.String>, null>
    states: $.Field<$.Output.List<Object.State>, null>
    subdivisions: $.Field<$.Output.List<Object.Subdivision>, null>
  }>

  export type Language = $.Object$2<'Language', {
    code: $.Field<$Scalar.ID, null>
    name: $.Field<$Scalar.String, null>
    native: $.Field<$Scalar.String, null>
    rtl: $.Field<$Scalar.Boolean, null>
  }>

  export type State = $.Object$2<'State', {
    code: $.Field<$.Output.Nullable<$Scalar.String>, null>
    country: $.Field<Object.Country, null>
    name: $.Field<$Scalar.String, null>
  }>

  export type Subdivision = $.Object$2<'Subdivision', {
    code: $.Field<$Scalar.ID, null>
    emoji: $.Field<$.Output.Nullable<$Scalar.String>, null>
    name: $.Field<$Scalar.String, null>
  }>
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  // -- no types --
}
