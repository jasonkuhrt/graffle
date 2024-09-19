/**
 * [1] This Object selection set alias serves to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 */

import type { SelectionSet } from '../../../../../src/entrypoints/schema.js'

//
//
// ---------------------
// GraphQLRootType Types
// ---------------------
//
//

export interface Query extends SelectionSet.SelectionSetBase {
  continent?: Query.continent
  continents?: Query.continents
  countries?: Query.countries
  country?: Query.country
  language?: Query.language
  languages?: Query.languages
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query | Query[]
}

export namespace Query {
  export interface continent extends __Continent {
    /**
     * Arguments for `continent` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export interface continents extends __Continent {
    /**
     * Arguments for `continents` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: ContinentFilterInput | undefined | null
    }
  }
  export interface countries extends __Country {
    /**
     * Arguments for `countries` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: CountryFilterInput | undefined | null
    }
  }
  export interface country extends __Country {
    /**
     * Arguments for `country` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export interface language extends __Language {
    /**
     * Arguments for `language` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export interface languages extends __Language {
    /**
     * Arguments for `languages` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: LanguageFilterInput | undefined | null
    }
  }
}

type __Query = Query // [1]

//
//
// ---------------------
// GraphQLEnumType Types
// ---------------------
//
//

//
//
// ----------------------------
// GraphQLInputObjectType Types
// ----------------------------
//
//

export interface ContinentFilterInput {
  code?: StringQueryOperatorInput | undefined | null
}

export interface CountryFilterInput {
  code?: StringQueryOperatorInput | undefined | null
  continent?: StringQueryOperatorInput | undefined | null
  currency?: StringQueryOperatorInput | undefined | null
  name?: StringQueryOperatorInput | undefined | null
}

export interface LanguageFilterInput {
  code?: StringQueryOperatorInput | undefined | null
}

export interface StringQueryOperatorInput {
  eq?: string | undefined | null
  in?: Array<string | undefined | null> | undefined | null
  ne?: string | undefined | null
  nin?: Array<string | undefined | null> | undefined | null
  regex?: string | undefined | null
}

//
//
// --------------------------
// GraphQLInterfaceType Types
// --------------------------
//
//

//
//
// -----------------------
// GraphQLObjectType Types
// -----------------------
//
//

export interface Continent extends SelectionSet.SelectionSetBase {
  code?: Continent.code
  countries?: Continent.countries
  name?: Continent.name
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Continent | Continent[]
}

export namespace Continent {
  export type code = SelectionSet.NoArgsIndicator
  export interface countries extends __Country {
  }
  export type name = SelectionSet.NoArgsIndicator
}

type __Continent = Continent // [1]

export interface Country extends SelectionSet.SelectionSetBase {
  awsRegion?: Country.awsRegion
  capital?: Country.capital
  code?: Country.code
  continent?: Country.continent
  currencies?: Country.currencies
  currency?: Country.currency
  emoji?: Country.emoji
  emojiU?: Country.emojiU
  languages?: Country.languages
  name?: Country.name
  native?: Country.native
  phone?: Country.phone
  phones?: Country.phones
  states?: Country.states
  subdivisions?: Country.subdivisions
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Country | Country[]
}

export namespace Country {
  export type awsRegion = SelectionSet.NoArgsIndicator
  export type capital = SelectionSet.NoArgsIndicator
  export type code = SelectionSet.NoArgsIndicator
  export interface continent extends __Continent {
  }
  export type currencies = SelectionSet.NoArgsIndicator
  export type currency = SelectionSet.NoArgsIndicator
  export type emoji = SelectionSet.NoArgsIndicator
  export type emojiU = SelectionSet.NoArgsIndicator
  export interface languages extends __Language {
  }
  export type name = SelectionSet.NoArgsIndicator
  export type native = SelectionSet.NoArgsIndicator
  export type phone = SelectionSet.NoArgsIndicator
  export type phones = SelectionSet.NoArgsIndicator
  export interface states extends __State {
  }
  export interface subdivisions extends __Subdivision {
  }
}

type __Country = Country // [1]

export interface Language extends SelectionSet.SelectionSetBase {
  code?: Language.code
  name?: Language.name
  native?: Language.native
  rtl?: Language.rtl
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Language | Language[]
}

export namespace Language {
  export type code = SelectionSet.NoArgsIndicator
  export type name = SelectionSet.NoArgsIndicator
  export type native = SelectionSet.NoArgsIndicator
  export type rtl = SelectionSet.NoArgsIndicator
}

type __Language = Language // [1]

export interface State extends SelectionSet.SelectionSetBase {
  code?: State.code
  country?: State.country
  name?: State.name
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: State | State[]
}

export namespace State {
  export type code = SelectionSet.NoArgsIndicator
  export interface country extends __Country {
  }
  export type name = SelectionSet.NoArgsIndicator
}

type __State = State // [1]

export interface Subdivision extends SelectionSet.SelectionSetBase {
  code?: Subdivision.code
  emoji?: Subdivision.emoji
  name?: Subdivision.name
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Subdivision | Subdivision[]
}

export namespace Subdivision {
  export type code = SelectionSet.NoArgsIndicator
  export type emoji = SelectionSet.NoArgsIndicator
  export type name = SelectionSet.NoArgsIndicator
}

type __Subdivision = Subdivision // [1]

//
//
// ----------------------
// GraphQLUnionType Types
// ----------------------
//
//
