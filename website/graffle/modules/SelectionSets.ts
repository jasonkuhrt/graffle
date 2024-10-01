import type { Select as $Select } from 'graffle/schema'
import type * as $Utilities from 'graffle/utilities-for-generated'

//
//
//
//
//
//
// ==================================================================================================
//                                      GraphQLObjectType Types
// ==================================================================================================
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
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                               Query
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Query {
  /**
   * Select the `continent` field on the `Query` object. Its type is Object.
   */
  continent?: Query.continent$Expanded | $Select.SelectAlias.SelectAlias<Query.continent>
  /**
   * Select the `continents` field on the `Query` object. Its type is Object.
   */
  continents?: Query.continents$Expanded | $Select.SelectAlias.SelectAlias<Query.continents>
  /**
   * Select the `countries` field on the `Query` object. Its type is Object.
   */
  countries?: Query.countries$Expanded | $Select.SelectAlias.SelectAlias<Query.countries>
  /**
   * Select the `country` field on the `Query` object. Its type is Object.
   */
  country?: Query.country$Expanded | $Select.SelectAlias.SelectAlias<Query.country>
  /**
   * Select the `language` field on the `Query` object. Its type is Object.
   */
  language?: Query.language$Expanded | $Select.SelectAlias.SelectAlias<Query.language>
  /**
   * Select the `languages` field on the `Query` object. Its type is Object.
   */
  languages?: Query.languages$Expanded | $Select.SelectAlias.SelectAlias<Query.languages>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query$FragmentInline | Query$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Query$FragmentInline extends Query, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  export interface continent extends _RefDefs._Continent {
    /**
     * Arguments for `continent` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export type continent$Expanded = continent
  export interface continents extends _RefDefs._Continent {
    /**
     * Arguments for `continents` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: _RefDefs._ContinentFilterInput | undefined | null
    }
  }
  export type continents$Expanded = continents
  export interface countries extends _RefDefs._Country {
    /**
     * Arguments for `countries` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: _RefDefs._CountryFilterInput | undefined | null
    }
  }
  export type countries$Expanded = countries
  export interface country extends _RefDefs._Country {
    /**
     * Arguments for `country` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export type country$Expanded = country
  export interface language extends _RefDefs._Language {
    /**
     * Arguments for `language` field.
     * All arguments are required so you must include this.
     */
    $: {
      code: string
    }
  }
  export type language$Expanded = language
  export interface languages extends _RefDefs._Language {
    /**
     * Arguments for `languages` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: _RefDefs._LanguageFilterInput | undefined | null
    }
  }
  export type languages$Expanded = languages
}

//
//
//
//
//
//
// ==================================================================================================
//                                    GraphQLInputObjectType Types
// ==================================================================================================
//
//
//
//
//
//

export interface ContinentFilterInput {
  code?: _RefDefs._StringQueryOperatorInput | undefined | null
}

export interface CountryFilterInput {
  code?: _RefDefs._StringQueryOperatorInput | undefined | null
  continent?: _RefDefs._StringQueryOperatorInput | undefined | null
  currency?: _RefDefs._StringQueryOperatorInput | undefined | null
  name?: _RefDefs._StringQueryOperatorInput | undefined | null
}

export interface LanguageFilterInput {
  code?: _RefDefs._StringQueryOperatorInput | undefined | null
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
//
//
//
//
// ==================================================================================================
//                                      GraphQLObjectType Types
// ==================================================================================================
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
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                             Continent
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Continent extends $Select.Bases.ObjectLike {
  /**
   * Select the `code` field on the `Continent` object. Its type is `ID` (a `Scalar`).
   */
  code?: Continent.code$Expanded | $Select.SelectAlias.SelectAlias<Continent.code>
  /**
   * Select the `countries` field on the `Continent` object. Its type is Object.
   */
  countries?: Continent.countries$Expanded | $Select.SelectAlias.SelectAlias<Continent.countries>
  /**
   * Select the `name` field on the `Continent` object. Its type is `String` (a `Scalar`).
   */
  name?: Continent.name$Expanded | $Select.SelectAlias.SelectAlias<Continent.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Continent$FragmentInline | Continent$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Continent$FragmentInline extends Continent, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Continent {
  export type code$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type code = $Select.Indicator.NoArgsIndicator

  export interface countries extends _RefDefs._Country {}
  export type countries$Expanded = countries
  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Country
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Country extends $Select.Bases.ObjectLike {
  /**
   * Select the `awsRegion` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  awsRegion?: Country.awsRegion$Expanded | $Select.SelectAlias.SelectAlias<Country.awsRegion>
  /**
   * Select the `capital` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  capital?: Country.capital$Expanded | $Select.SelectAlias.SelectAlias<Country.capital>
  /**
   * Select the `code` field on the `Country` object. Its type is `ID` (a `Scalar`).
   */
  code?: Country.code$Expanded | $Select.SelectAlias.SelectAlias<Country.code>
  /**
   * Select the `continent` field on the `Country` object. Its type is Object.
   */
  continent?: Country.continent$Expanded | $Select.SelectAlias.SelectAlias<Country.continent>
  /**
   * Select the `currencies` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  currencies?: Country.currencies$Expanded | $Select.SelectAlias.SelectAlias<Country.currencies>
  /**
   * Select the `currency` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  currency?: Country.currency$Expanded | $Select.SelectAlias.SelectAlias<Country.currency>
  /**
   * Select the `emoji` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  emoji?: Country.emoji$Expanded | $Select.SelectAlias.SelectAlias<Country.emoji>
  /**
   * Select the `emojiU` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  emojiU?: Country.emojiU$Expanded | $Select.SelectAlias.SelectAlias<Country.emojiU>
  /**
   * Select the `languages` field on the `Country` object. Its type is Object.
   */
  languages?: Country.languages$Expanded | $Select.SelectAlias.SelectAlias<Country.languages>
  /**
   * Select the `name` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  name?: Country.name$Expanded | $Select.SelectAlias.SelectAlias<Country.name>
  /**
   * Select the `native` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  native?: Country.native$Expanded | $Select.SelectAlias.SelectAlias<Country.native>
  /**
   * Select the `phone` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  phone?: Country.phone$Expanded | $Select.SelectAlias.SelectAlias<Country.phone>
  /**
   * Select the `phones` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  phones?: Country.phones$Expanded | $Select.SelectAlias.SelectAlias<Country.phones>
  /**
   * Select the `states` field on the `Country` object. Its type is Object.
   */
  states?: Country.states$Expanded | $Select.SelectAlias.SelectAlias<Country.states>
  /**
   * Select the `subdivisions` field on the `Country` object. Its type is Object.
   */
  subdivisions?: Country.subdivisions$Expanded | $Select.SelectAlias.SelectAlias<Country.subdivisions>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Country$FragmentInline | Country$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Country$FragmentInline extends Country, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Country {
  export type awsRegion$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type awsRegion = $Select.Indicator.NoArgsIndicator

  export type capital$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type capital = $Select.Indicator.NoArgsIndicator

  export type code$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type code = $Select.Indicator.NoArgsIndicator

  export interface continent extends _RefDefs._Continent {}
  export type continent$Expanded = continent
  export type currencies$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type currencies = $Select.Indicator.NoArgsIndicator

  export type currency$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type currency = $Select.Indicator.NoArgsIndicator

  export type emoji$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type emoji = $Select.Indicator.NoArgsIndicator

  export type emojiU$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type emojiU = $Select.Indicator.NoArgsIndicator

  export interface languages extends _RefDefs._Language {}
  export type languages$Expanded = languages
  export type name$SelectionSetArguments = {
    lang?: string | undefined | null
  }
  export type name$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `name` field.
       * No arguments are required so you may omit this.
       */
      $?: name$SelectionSetArguments
    }
  >

  export type name$Expanded = $Utilities.UnionExpanded<$Select.Indicator.Indicator | name$SelectionSet>

  export type name = $Select.Indicator.Indicator | name$SelectionSet

  export type native$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type native = $Select.Indicator.NoArgsIndicator

  export type phone$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type phone = $Select.Indicator.NoArgsIndicator

  export type phones$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type phones = $Select.Indicator.NoArgsIndicator

  export interface states extends _RefDefs._State {}
  export type states$Expanded = states
  export interface subdivisions extends _RefDefs._Subdivision {}
  export type subdivisions$Expanded = subdivisions
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Language
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Language extends $Select.Bases.ObjectLike {
  /**
   * Select the `code` field on the `Language` object. Its type is `ID` (a `Scalar`).
   */
  code?: Language.code$Expanded | $Select.SelectAlias.SelectAlias<Language.code>
  /**
   * Select the `name` field on the `Language` object. Its type is `String` (a `Scalar`).
   */
  name?: Language.name$Expanded | $Select.SelectAlias.SelectAlias<Language.name>
  /**
   * Select the `native` field on the `Language` object. Its type is `String` (a `Scalar`).
   */
  native?: Language.native$Expanded | $Select.SelectAlias.SelectAlias<Language.native>
  /**
   * Select the `rtl` field on the `Language` object. Its type is `Boolean` (a `Scalar`).
   */
  rtl?: Language.rtl$Expanded | $Select.SelectAlias.SelectAlias<Language.rtl>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Language$FragmentInline | Language$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Language$FragmentInline extends Language, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Language {
  export type code$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type code = $Select.Indicator.NoArgsIndicator

  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator

  export type native$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type native = $Select.Indicator.NoArgsIndicator

  export type rtl$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type rtl = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                               State
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface State extends $Select.Bases.ObjectLike {
  /**
   * Select the `code` field on the `State` object. Its type is `String` (a `Scalar`).
   */
  code?: State.code$Expanded | $Select.SelectAlias.SelectAlias<State.code>
  /**
   * Select the `country` field on the `State` object. Its type is Object.
   */
  country?: State.country$Expanded | $Select.SelectAlias.SelectAlias<State.country>
  /**
   * Select the `name` field on the `State` object. Its type is `String` (a `Scalar`).
   */
  name?: State.name$Expanded | $Select.SelectAlias.SelectAlias<State.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: State$FragmentInline | State$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface State$FragmentInline extends State, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace State {
  export type code$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type code = $Select.Indicator.NoArgsIndicator

  export interface country extends _RefDefs._Country {}
  export type country$Expanded = country
  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            Subdivision
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Subdivision extends $Select.Bases.ObjectLike {
  /**
   * Select the `code` field on the `Subdivision` object. Its type is `ID` (a `Scalar`).
   */
  code?: Subdivision.code$Expanded | $Select.SelectAlias.SelectAlias<Subdivision.code>
  /**
   * Select the `emoji` field on the `Subdivision` object. Its type is `String` (a `Scalar`).
   */
  emoji?: Subdivision.emoji$Expanded | $Select.SelectAlias.SelectAlias<Subdivision.emoji>
  /**
   * Select the `name` field on the `Subdivision` object. Its type is `String` (a `Scalar`).
   */
  name?: Subdivision.name$Expanded | $Select.SelectAlias.SelectAlias<Subdivision.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Subdivision$FragmentInline | Subdivision$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Subdivision$FragmentInline extends Subdivision, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Subdivision {
  export type code$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type code = $Select.Indicator.NoArgsIndicator

  export type emoji$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type emoji = $Select.Indicator.NoArgsIndicator

  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator
}

/**
 * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */
export namespace _RefDefs {
  export type _Query = Query
  export type _ContinentFilterInput = ContinentFilterInput
  export type _CountryFilterInput = CountryFilterInput
  export type _LanguageFilterInput = LanguageFilterInput
  export type _StringQueryOperatorInput = StringQueryOperatorInput
  export type _Continent = Continent
  export type _Country = Country
  export type _Language = Language
  export type _State = State
  export type _Subdivision = Subdivision
}
