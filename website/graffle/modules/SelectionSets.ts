import type { SelectionSet as $SelectionSet } from 'graffle/schema'
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
  continent?: Query.continent$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.continent>
  /**
   * Select the `continents` field on the `Query` object. Its type is Object.
   */
  continents?: Query.continents$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.continents>
  /**
   * Select the `countries` field on the `Query` object. Its type is Object.
   */
  countries?: Query.countries$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.countries>
  /**
   * Select the `country` field on the `Query` object. Its type is Object.
   */
  country?: Query.country$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.country>
  /**
   * Select the `language` field on the `Query` object. Its type is Object.
   */
  language?: Query.language$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.language>
  /**
   * Select the `languages` field on the `Query` object. Its type is Object.
   */
  languages?: Query.languages$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.languages>

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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Query$FragmentInline extends Query, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

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

export interface Continent extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `code` field on the `Continent` object. Its type is `ID` (a `Scalar`).
   */
  code?: Continent.code$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Continent.code>
  /**
   * Select the `countries` field on the `Continent` object. Its type is Object.
   */
  countries?: Continent.countries$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Continent.countries>
  /**
   * Select the `name` field on the `Continent` object. Its type is `String` (a `Scalar`).
   */
  name?: Continent.name$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Continent.name>

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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Continent$FragmentInline extends Continent, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Continent {
  export type code$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type code = $SelectionSet.Indicator.NoArgsIndicator

  export interface countries extends _RefDefs._Country {}
  export type countries$Expanded = countries
  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator
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

export interface Country extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `awsRegion` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  awsRegion?: Country.awsRegion$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.awsRegion>
  /**
   * Select the `capital` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  capital?: Country.capital$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.capital>
  /**
   * Select the `code` field on the `Country` object. Its type is `ID` (a `Scalar`).
   */
  code?: Country.code$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.code>
  /**
   * Select the `continent` field on the `Country` object. Its type is Object.
   */
  continent?: Country.continent$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.continent>
  /**
   * Select the `currencies` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  currencies?: Country.currencies$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.currencies>
  /**
   * Select the `currency` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  currency?: Country.currency$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.currency>
  /**
   * Select the `emoji` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  emoji?: Country.emoji$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.emoji>
  /**
   * Select the `emojiU` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  emojiU?: Country.emojiU$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.emojiU>
  /**
   * Select the `languages` field on the `Country` object. Its type is Object.
   */
  languages?: Country.languages$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.languages>
  /**
   * Select the `name` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  name?: Country.name$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.name>
  /**
   * Select the `native` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  native?: Country.native$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.native>
  /**
   * Select the `phone` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  phone?: Country.phone$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.phone>
  /**
   * Select the `phones` field on the `Country` object. Its type is `String` (a `Scalar`).
   */
  phones?: Country.phones$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.phones>
  /**
   * Select the `states` field on the `Country` object. Its type is Object.
   */
  states?: Country.states$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.states>
  /**
   * Select the `subdivisions` field on the `Country` object. Its type is Object.
   */
  subdivisions?: Country.subdivisions$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Country.subdivisions>

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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Country$FragmentInline extends Country, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Country {
  export type awsRegion$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type awsRegion = $SelectionSet.Indicator.NoArgsIndicator

  export type capital$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type capital = $SelectionSet.Indicator.NoArgsIndicator

  export type code$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type code = $SelectionSet.Indicator.NoArgsIndicator

  export interface continent extends _RefDefs._Continent {}
  export type continent$Expanded = continent
  export type currencies$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type currencies = $SelectionSet.Indicator.NoArgsIndicator

  export type currency$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type currency = $SelectionSet.Indicator.NoArgsIndicator

  export type emoji$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type emoji = $SelectionSet.Indicator.NoArgsIndicator

  export type emojiU$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type emojiU = $SelectionSet.Indicator.NoArgsIndicator

  export interface languages extends _RefDefs._Language {}
  export type languages$Expanded = languages
  export type name$SelectionSetArguments = {
    lang?: string | undefined | null
  }
  export type name$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `name` field.
       * No arguments are required so you may omit this.
       */
      $?: name$SelectionSetArguments
    }
  >

  export type name$Expanded = $Utilities.UnionExpanded<$SelectionSet.Nodes.Indicator.Indicator | name$SelectionSet>

  export type name = $SelectionSet.Nodes.Indicator.Indicator | name$SelectionSet

  export type native$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type native = $SelectionSet.Indicator.NoArgsIndicator

  export type phone$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type phone = $SelectionSet.Indicator.NoArgsIndicator

  export type phones$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type phones = $SelectionSet.Indicator.NoArgsIndicator

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

export interface Language extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `code` field on the `Language` object. Its type is `ID` (a `Scalar`).
   */
  code?: Language.code$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Language.code>
  /**
   * Select the `name` field on the `Language` object. Its type is `String` (a `Scalar`).
   */
  name?: Language.name$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Language.name>
  /**
   * Select the `native` field on the `Language` object. Its type is `String` (a `Scalar`).
   */
  native?: Language.native$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Language.native>
  /**
   * Select the `rtl` field on the `Language` object. Its type is `Boolean` (a `Scalar`).
   */
  rtl?: Language.rtl$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Language.rtl>

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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Language$FragmentInline extends Language, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Language {
  export type code$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type code = $SelectionSet.Indicator.NoArgsIndicator

  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator

  export type native$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type native = $SelectionSet.Indicator.NoArgsIndicator

  export type rtl$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type rtl = $SelectionSet.Indicator.NoArgsIndicator
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

export interface State extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `code` field on the `State` object. Its type is `String` (a `Scalar`).
   */
  code?: State.code$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<State.code>
  /**
   * Select the `country` field on the `State` object. Its type is Object.
   */
  country?: State.country$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<State.country>
  /**
   * Select the `name` field on the `State` object. Its type is `String` (a `Scalar`).
   */
  name?: State.name$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<State.name>

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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface State$FragmentInline extends State, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace State {
  export type code$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type code = $SelectionSet.Indicator.NoArgsIndicator

  export interface country extends _RefDefs._Country {}
  export type country$Expanded = country
  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator
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

export interface Subdivision extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `code` field on the `Subdivision` object. Its type is `ID` (a `Scalar`).
   */
  code?: Subdivision.code$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Subdivision.code>
  /**
   * Select the `emoji` field on the `Subdivision` object. Its type is `String` (a `Scalar`).
   */
  emoji?: Subdivision.emoji$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Subdivision.emoji>
  /**
   * Select the `name` field on the `Subdivision` object. Its type is `String` (a `Scalar`).
   */
  name?: Subdivision.name$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Subdivision.name>

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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Subdivision$FragmentInline
  extends Subdivision, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace Subdivision {
  export type code$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type code = $SelectionSet.Indicator.NoArgsIndicator

  export type emoji$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type emoji = $SelectionSet.Indicator.NoArgsIndicator

  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator
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
