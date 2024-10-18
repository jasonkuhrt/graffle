import type * as $ from 'graffle/schema'
import type * as $Scalar from './Scalar.js'

export namespace Schema {
  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                                Root
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Root {
    export type Query = $.Output.ObjectQuery<{
      continent: $.Field<
        'continent',
        $.Output.Nullable<Object.Continent>,
        $.Args<{
          code: $.Input.Field<$Scalar.ID>
        }, false>
      >
      continents: $.Field<
        'continents',
        $.Output.List<Object.Continent>,
        $.Args<{
          filter: $.Input.Field<$.Input.Nullable<InputObject.ContinentFilterInput>>
        }, true>
      >
      countries: $.Field<
        'countries',
        $.Output.List<Object.Country>,
        $.Args<{
          filter: $.Input.Field<$.Input.Nullable<InputObject.CountryFilterInput>>
        }, true>
      >
      country: $.Field<
        'country',
        $.Output.Nullable<Object.Country>,
        $.Args<{
          code: $.Input.Field<$Scalar.ID>
        }, false>
      >
      language: $.Field<
        'language',
        $.Output.Nullable<Object.Language>,
        $.Args<{
          code: $.Input.Field<$Scalar.ID>
        }, false>
      >
      languages: $.Field<
        'languages',
        $.Output.List<Object.Language>,
        $.Args<{
          filter: $.Input.Field<$.Input.Nullable<InputObject.LanguageFilterInput>>
        }, true>
      >
    }>
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                                Enum
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Enum {
    // -- no types --
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                            InputObject
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

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

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                             Interface
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Interface {
    // -- no types --
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                               Object
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Object {
    export type Continent = $.Object$2<'Continent', {
      code: $.Field<'code', $Scalar.ID, null>
      countries: $.Field<'countries', $.Output.List<Object.Country>, null>
      name: $.Field<'name', $Scalar.String, null>
    }>

    export type Country = $.Object$2<'Country', {
      awsRegion: $.Field<'awsRegion', $Scalar.String, null>
      capital: $.Field<'capital', $.Output.Nullable<$Scalar.String>, null>
      code: $.Field<'code', $Scalar.ID, null>
      continent: $.Field<'continent', Object.Continent, null>
      currencies: $.Field<'currencies', $.Output.List<$Scalar.String>, null>
      currency: $.Field<'currency', $.Output.Nullable<$Scalar.String>, null>
      emoji: $.Field<'emoji', $Scalar.String, null>
      emojiU: $.Field<'emojiU', $Scalar.String, null>
      languages: $.Field<'languages', $.Output.List<Object.Language>, null>
      name: $.Field<
        'name',
        $Scalar.String,
        $.Args<{
          lang: $.Input.Field<$.Input.Nullable<$Scalar.String>>
        }, true>
      >
      native: $.Field<'native', $Scalar.String, null>
      phone: $.Field<'phone', $Scalar.String, null>
      phones: $.Field<'phones', $.Output.List<$Scalar.String>, null>
      states: $.Field<'states', $.Output.List<Object.State>, null>
      subdivisions: $.Field<'subdivisions', $.Output.List<Object.Subdivision>, null>
    }>

    export type Language = $.Object$2<'Language', {
      code: $.Field<'code', $Scalar.ID, null>
      name: $.Field<'name', $Scalar.String, null>
      native: $.Field<'native', $Scalar.String, null>
      rtl: $.Field<'rtl', $Scalar.Boolean, null>
    }>

    export type State = $.Object$2<'State', {
      code: $.Field<'code', $.Output.Nullable<$Scalar.String>, null>
      country: $.Field<'country', Object.Country, null>
      name: $.Field<'name', $Scalar.String, null>
    }>

    export type Subdivision = $.Object$2<'Subdivision', {
      code: $.Field<'code', $Scalar.ID, null>
      emoji: $.Field<'emoji', $.Output.Nullable<$Scalar.String>, null>
      name: $.Field<'name', $Scalar.String, null>
    }>
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                               Union
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Union {
    // -- no types --
  }
}
//
//
//
//
//
//
// ==================================================================================================
//                                               Schema
// ==================================================================================================
//
//
//
//
//
//

import type * as Utilities from 'graffle/utilities-for-generated'
import type * as Data from './Data.js'
import type * as MethodsRoot from './MethodsRoot.js'

export interface Schema extends Utilities.SchemaIndexBase {
  name: Data.Name
  RootTypesPresent: ['Query']
  RootUnion: Schema.Root.Query
  Root: {
    Query: Schema.Root.Query
    Mutation: null
    Subscription: null
  }
  allTypes: {
    Query: Schema.Root.Query
    Continent: Schema.Object.Continent
    Country: Schema.Object.Country
    Language: Schema.Object.Language
    State: Schema.Object.State
    Subdivision: Schema.Object.Subdivision
  }
  objects: {
    Continent: Schema.Object.Continent
    Country: Schema.Object.Country
    Language: Schema.Object.Language
    State: Schema.Object.State
    Subdivision: Schema.Object.Subdivision
  }
  unions: {}
  interfaces: {}
  customScalars: Utilities.SchemaIndexBase['customScalars']
  extensions: Utilities.GlobalRegistry.TypeExtensions
}
