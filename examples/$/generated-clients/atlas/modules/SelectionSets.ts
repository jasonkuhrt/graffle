/**
 * [1] This type alias serves to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */

import type { SelectionSet } from '../../../../../src/entrypoints/schema.js'
import type { Simplify, UnionExpanded } from '../../../../../src/entrypoints/utilities-for-generated.js'

//
//
//
//
//
//
// ---------------------
// GraphQLRootType Types
// ---------------------
//
//
//
//
//
//

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Query
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Query {
  continent?: Query.continent$Expanded | SelectionSet.Alias<Query.continent>
  continents?: Query.continents$Expanded | SelectionSet.Alias<Query.continents>
  countries?: Query.countries$Expanded | SelectionSet.Alias<Query.countries>
  country?: Query.country$Expanded | SelectionSet.Alias<Query.country>
  language?: Query.language$Expanded | SelectionSet.Alias<Query.language>
  languages?: Query.languages$Expanded | SelectionSet.Alias<Query.languages>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query | Query[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

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
  export type continent$Expanded = continent
  export interface continents extends __Continent {
    /**
     * Arguments for `continents` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: ContinentFilterInput | undefined | null
    }
  }
  export type continents$Expanded = continents
  export interface countries extends __Country {
    /**
     * Arguments for `countries` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: CountryFilterInput | undefined | null
    }
  }
  export type countries$Expanded = countries
  export interface country extends __Country {
    /**
     * Arguments for `country` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export type country$Expanded = country
  export interface language extends __Language {
    /**
     * Arguments for `language` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export type language$Expanded = language
  export interface languages extends __Language {
    /**
     * Arguments for `languages` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: LanguageFilterInput | undefined | null
    }
  }
  export type languages$Expanded = languages
}

type __Query = Query // [1]

//
//
//
//
//
//
// ---------------------
// GraphQLEnumType Types
// ---------------------
//
//
//
//
//
//

//
//
//
//
//
//
// ----------------------------
// GraphQLInputObjectType Types
// ----------------------------
//
//
//
//
//
//

export interface ContinentFilterInput {
  code?: StringQueryOperatorInput | undefined | null
}

type __ContinentFilterInput = ContinentFilterInput // [1]

export interface CountryFilterInput {
  code?: StringQueryOperatorInput | undefined | null
  continent?: StringQueryOperatorInput | undefined | null
  currency?: StringQueryOperatorInput | undefined | null
  name?: StringQueryOperatorInput | undefined | null
}

type __CountryFilterInput = CountryFilterInput // [1]

export interface LanguageFilterInput {
  code?: StringQueryOperatorInput | undefined | null
}

type __LanguageFilterInput = LanguageFilterInput // [1]

export interface StringQueryOperatorInput {
  eq?: string | undefined | null
  in?: Array<string | undefined | null> | undefined | null
  ne?: string | undefined | null
  nin?: Array<string | undefined | null> | undefined | null
  regex?: string | undefined | null
}

type __StringQueryOperatorInput = StringQueryOperatorInput // [1]

//
//
//
//
//
//
// --------------------------
// GraphQLInterfaceType Types
// --------------------------
//
//
//
//
//
//

//
//
//
//
//
//
// -----------------------
// GraphQLObjectType Types
// -----------------------
//
//
//
//
//
//

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Continent
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Continent extends SelectionSet.Bases.ObjectLike {
  code?: Continent.code$Expanded | SelectionSet.Alias<Continent.code>
  countries?: Continent.countries$Expanded | SelectionSet.Alias<Continent.countries>
  name?: Continent.name$Expanded | SelectionSet.Alias<Continent.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Continent | Continent[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Continent {
  export type code$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type code = SelectionSet.NoArgsIndicator
  export interface countries extends __Country {}
  export type countries$Expanded = countries
  export type name$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type name = SelectionSet.NoArgsIndicator
}

type __Continent = Continent // [1]

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Country
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Country extends SelectionSet.Bases.ObjectLike {
  awsRegion?: Country.awsRegion$Expanded | SelectionSet.Alias<Country.awsRegion>
  capital?: Country.capital$Expanded | SelectionSet.Alias<Country.capital>
  code?: Country.code$Expanded | SelectionSet.Alias<Country.code>
  continent?: Country.continent$Expanded | SelectionSet.Alias<Country.continent>
  currencies?: Country.currencies$Expanded | SelectionSet.Alias<Country.currencies>
  currency?: Country.currency$Expanded | SelectionSet.Alias<Country.currency>
  emoji?: Country.emoji$Expanded | SelectionSet.Alias<Country.emoji>
  emojiU?: Country.emojiU$Expanded | SelectionSet.Alias<Country.emojiU>
  languages?: Country.languages$Expanded | SelectionSet.Alias<Country.languages>
  name?: Country.name$Expanded | SelectionSet.Alias<Country.name>
  native?: Country.native$Expanded | SelectionSet.Alias<Country.native>
  phone?: Country.phone$Expanded | SelectionSet.Alias<Country.phone>
  phones?: Country.phones$Expanded | SelectionSet.Alias<Country.phones>
  states?: Country.states$Expanded | SelectionSet.Alias<Country.states>
  subdivisions?: Country.subdivisions$Expanded | SelectionSet.Alias<Country.subdivisions>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Country | Country[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Country {
  export type awsRegion$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type awsRegion = SelectionSet.NoArgsIndicator
  export type capital$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type capital = SelectionSet.NoArgsIndicator
  export type code$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type code = SelectionSet.NoArgsIndicator
  export interface continent extends __Continent {}
  export type continent$Expanded = continent
  export type currencies$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type currencies = SelectionSet.NoArgsIndicator
  export type currency$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type currency = SelectionSet.NoArgsIndicator
  export type emoji$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type emoji = SelectionSet.NoArgsIndicator
  export type emojiU$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type emojiU = SelectionSet.NoArgsIndicator
  export interface languages extends __Language {}
  export type languages$Expanded = languages
  type nameSelectionSet = Simplify<
    SelectionSet.Bases.Base & {
      /**
       * Arguments for `name` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        lang?: string | undefined | null
      }
    }
  >

  export type name$Expanded = UnionExpanded<SelectionSet.ClientIndicator | nameSelectionSet>

  export type name = SelectionSet.ClientIndicator | nameSelectionSet

  export type native$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type native = SelectionSet.NoArgsIndicator
  export type phone$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type phone = SelectionSet.NoArgsIndicator
  export type phones$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type phones = SelectionSet.NoArgsIndicator
  export interface states extends __State {}
  export type states$Expanded = states
  export interface subdivisions extends __Subdivision {}
  export type subdivisions$Expanded = subdivisions
}

type __Country = Country // [1]

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Language
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Language extends SelectionSet.Bases.ObjectLike {
  code?: Language.code$Expanded | SelectionSet.Alias<Language.code>
  name?: Language.name$Expanded | SelectionSet.Alias<Language.name>
  native?: Language.native$Expanded | SelectionSet.Alias<Language.native>
  rtl?: Language.rtl$Expanded | SelectionSet.Alias<Language.rtl>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Language | Language[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Language {
  export type code$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type code = SelectionSet.NoArgsIndicator
  export type name$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type name = SelectionSet.NoArgsIndicator
  export type native$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type native = SelectionSet.NoArgsIndicator
  export type rtl$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type rtl = SelectionSet.NoArgsIndicator
}

type __Language = Language // [1]

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         State
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface State extends SelectionSet.Bases.ObjectLike {
  code?: State.code$Expanded | SelectionSet.Alias<State.code>
  country?: State.country$Expanded | SelectionSet.Alias<State.country>
  name?: State.name$Expanded | SelectionSet.Alias<State.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: State | State[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace State {
  export type code$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type code = SelectionSet.NoArgsIndicator
  export interface country extends __Country {}
  export type country$Expanded = country
  export type name$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type name = SelectionSet.NoArgsIndicator
}

type __State = State // [1]

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Subdivision
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Subdivision extends SelectionSet.Bases.ObjectLike {
  code?: Subdivision.code$Expanded | SelectionSet.Alias<Subdivision.code>
  emoji?: Subdivision.emoji$Expanded | SelectionSet.Alias<Subdivision.emoji>
  name?: Subdivision.name$Expanded | SelectionSet.Alias<Subdivision.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Subdivision | Subdivision[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Subdivision {
  export type code$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type code = SelectionSet.NoArgsIndicator
  export type emoji$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type emoji = SelectionSet.NoArgsIndicator
  export type name$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type name = SelectionSet.NoArgsIndicator
}

type __Subdivision = Subdivision // [1]

//
//
//
//
//
//
// ----------------------
// GraphQLUnionType Types
// ----------------------
//
//
//
//
//
//
