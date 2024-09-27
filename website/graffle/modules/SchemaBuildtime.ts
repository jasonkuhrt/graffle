import type * as $ from 'graffle/schema'
import type * as $Scalar from './Scalar.js'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //
export namespace Root {
  export type Query = $.Output.ObjectQuery<{
    continent: $.Field<
      $.Output.Nullable<Object.Continent>,
      $.Args<{
        code: $.Input.Field<$Scalar.ID>
      }, false>
    >
    continents: $.Field<
      $.Output.List<Object.Continent>,
      $.Args<{
        filter: $.Input.Field<$.Input.Nullable<InputObject.ContinentFilterInput>>
      }, true>
    >
    countries: $.Field<
      $.Output.List<Object.Country>,
      $.Args<{
        filter: $.Input.Field<$.Input.Nullable<InputObject.CountryFilterInput>>
      }, true>
    >
    country: $.Field<
      $.Output.Nullable<Object.Country>,
      $.Args<{
        code: $.Input.Field<$Scalar.ID>
      }, false>
    >
    language: $.Field<
      $.Output.Nullable<Object.Language>,
      $.Args<{
        code: $.Input.Field<$Scalar.ID>
      }, false>
    >
    languages: $.Field<
      $.Output.List<Object.Language>,
      $.Args<{
        filter: $.Input.Field<$.Input.Nullable<InputObject.LanguageFilterInput>>
      }, true>
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
    code: $.Input.Field<$.Input.Nullable<InputObject.StringQueryOperatorInput>>
  }, true>

  export type CountryFilterInput = $.InputObject<'CountryFilterInput', {
    code: $.Input.Field<$.Input.Nullable<InputObject.StringQueryOperatorInput>>
    continent: $.Input.Field<$.Input.Nullable<InputObject.StringQueryOperatorInput>>
    currency: $.Input.Field<$.Input.Nullable<InputObject.StringQueryOperatorInput>>
    name: $.Input.Field<$.Input.Nullable<InputObject.StringQueryOperatorInput>>
  }, true>

  export type LanguageFilterInput = $.InputObject<'LanguageFilterInput', {
    code: $.Input.Field<$.Input.Nullable<InputObject.StringQueryOperatorInput>>
  }, true>

  export type StringQueryOperatorInput = $.InputObject<'StringQueryOperatorInput', {
    eq: $.Input.Field<$.Input.Nullable<$Scalar.String>>
    in: $.Input.Field<$.Input.Nullable<$.Input.List<$Scalar.String>>>
    ne: $.Input.Field<$.Input.Nullable<$Scalar.String>>
    nin: $.Input.Field<$.Input.Nullable<$.Input.List<$Scalar.String>>>
    regex: $.Input.Field<$.Input.Nullable<$Scalar.String>>
  }, true>
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
        lang: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
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
