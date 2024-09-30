import type { SelectionSet as $SelectionSet } from '../../../../../../src/entrypoints/schema.js'
import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type * as $Scalar from './Scalar.js'

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
//                                              Mutation
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Mutation {
  /**
   * Select the `id` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  id?: Mutation.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Mutation.id>
  /**
   * Select the `idNonNull` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Mutation.idNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Mutation.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Mutation$FragmentInline | Mutation$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Mutation$FragmentInline extends Mutation, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type idNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type idNonNull = $SelectionSet.Indicator.NoArgsIndicator
}

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
   * Select the `InputObjectNested` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  InputObjectNested?:
    | Query.InputObjectNested$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.InputObjectNested>
  /**
   * Select the `InputObjectNestedNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  InputObjectNestedNonNull?:
    | Query.InputObjectNestedNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.InputObjectNestedNonNull>
  /**
   * Select the `abcEnum` field on the `Query` object. Its type is Enum.
   */
  abcEnum?: Query.abcEnum$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.abcEnum>
  /**
   * Select the `date` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  date?: Query.date$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.date>
  /**
   * Select the `dateArg` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArg?: Query.dateArg$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateArg>
  /**
   * Select the `dateArgInputObject` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgInputObject?:
    | Query.dateArgInputObject$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateArgInputObject>
  /**
   * Select the `dateArgList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgList?: Query.dateArgList$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateArgList>
  /**
   * Select the `dateArgNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNull?: Query.dateArgNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateArgNonNull>
  /**
   * Select the `dateArgNonNullList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNullList?:
    | Query.dateArgNonNullList$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateArgNonNullList>
  /**
   * Select the `dateArgNonNullListNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNullListNonNull?:
    | Query.dateArgNonNullListNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateArgNonNullListNonNull>
  /**
   * Select the `dateInterface1` field on the `Query` object. Its type is Interface.
   */
  dateInterface1?: Query.dateInterface1$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateInterface1>
  /**
   * Select the `dateList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateList?: Query.dateList$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateList>
  /**
   * Select the `dateListNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateListNonNull?: Query.dateListNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateListNonNull>
  /**
   * Select the `dateNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateNonNull?: Query.dateNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateNonNull>
  /**
   * Select the `dateObject1` field on the `Query` object. Its type is Object.
   */
  dateObject1?: Query.dateObject1$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateObject1>
  /**
   * Select the `dateUnion` field on the `Query` object. Its type is Union.
   */
  dateUnion?: Query.dateUnion$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.dateUnion>
  /**
   * Select the `error` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  error?: Query.error$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.error>
  /**
   * Select the `id` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  id?: Query.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.id>
  /**
   * Select the `idNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Query.idNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.idNonNull>
  /**
   * Select the `interface` field on the `Query` object. Its type is Interface.
   */
  interface?: Query.$interface$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.$interface>
  /**
   * Select the `interfaceNonNull` field on the `Query` object. Its type is Interface.
   */
  interfaceNonNull?:
    | Query.interfaceNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.interfaceNonNull>
  /**
   * Select the `interfaceWithArgs` field on the `Query` object. Its type is Interface.
   */
  interfaceWithArgs?:
    | Query.interfaceWithArgs$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.interfaceWithArgs>
  /**
   * Select the `listInt` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listInt?: Query.listInt$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.listInt>
  /**
   * Select the `listIntNonNull` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listIntNonNull?: Query.listIntNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.listIntNonNull>
  /**
   * Select the `listListInt` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listListInt?: Query.listListInt$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.listListInt>
  /**
   * Select the `listListIntNonNull` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listListIntNonNull?:
    | Query.listListIntNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.listListIntNonNull>
  /**
   * Select the `lowerCaseUnion` field on the `Query` object. Its type is Union.
   */
  lowerCaseUnion?: Query.lowerCaseUnion$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.lowerCaseUnion>
  /**
   * Select the `object` field on the `Query` object. Its type is Object.
   */
  object?: Query.$object$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.$object>
  /**
   * Select the `objectList` field on the `Query` object. Its type is Object.
   */
  objectList?: Query.objectList$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.objectList>
  /**
   * Select the `objectListNonNull` field on the `Query` object. Its type is Object.
   */
  objectListNonNull?:
    | Query.objectListNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.objectListNonNull>
  /**
   * Select the `objectNested` field on the `Query` object. Its type is Object.
   */
  objectNested?: Query.objectNested$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.objectNested>
  /**
   * Select the `objectNonNull` field on the `Query` object. Its type is Object.
   */
  objectNonNull?: Query.objectNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.objectNonNull>
  /**
   * Select the `objectWithArgs` field on the `Query` object. Its type is Object.
   */
  objectWithArgs?: Query.objectWithArgs$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.objectWithArgs>
  /**
   * Select the `result` field on the `Query` object. Its type is Union.
   */
  result?: Query.result$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.result>
  /**
   * Select the `resultNonNull` field on the `Query` object. Its type is Union.
   */
  resultNonNull?: Query.resultNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.resultNonNull>
  /**
   * Select the `string` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  string?: Query.$string$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.$string>
  /**
   * Select the `stringWithArgEnum` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgEnum?:
    | Query.stringWithArgEnum$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithArgEnum>
  /**
   * Select the `stringWithArgInputObject` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgInputObject?:
    | Query.stringWithArgInputObject$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithArgInputObject>
  /**
   * Select the `stringWithArgInputObjectRequired` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgInputObjectRequired?:
    | Query.stringWithArgInputObjectRequired$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithArgInputObjectRequired>
  /**
   * Select the `stringWithArgs` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgs?: Query.stringWithArgs$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithArgs>
  /**
   * Select the `stringWithListArg` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithListArg?:
    | Query.stringWithListArg$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithListArg>
  /**
   * Select the `stringWithListArgRequired` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithListArgRequired?:
    | Query.stringWithListArgRequired$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithListArgRequired>
  /**
   * Select the `stringWithRequiredArg` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithRequiredArg?:
    | Query.stringWithRequiredArg$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.stringWithRequiredArg>
  /**
   * Select the `unionFooBar` field on the `Query` object. Its type is Union.
   */
  unionFooBar?: Query.unionFooBar$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.unionFooBar>
  /**
   * Select the `unionFooBarNonNull` field on the `Query` object. Its type is Union.
   */
  unionFooBarNonNull?:
    | Query.unionFooBarNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.unionFooBarNonNull>
  /**
   * Select the `unionFooBarWithArgs` field on the `Query` object. Its type is Union.
   */
  unionFooBarWithArgs?:
    | Query.unionFooBarWithArgs$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.unionFooBarWithArgs>
  /**
   * Select the `unionObject` field on the `Query` object. Its type is Object.
   */
  unionObject?: Query.unionObject$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.unionObject>
  /**
   * Select the `unionObjectNonNull` field on the `Query` object. Its type is Object.
   */
  unionObjectNonNull?:
    | Query.unionObjectNonNull$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Query.unionObjectNonNull>

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
  export type InputObjectNested$SelectionSetArguments = {
    input?: _RefDefs._InputObjectNested | undefined | null
  }
  export type InputObjectNested$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `InputObjectNested` field.
       * No arguments are required so you may omit this.
       */
      $?: InputObjectNested$SelectionSetArguments
    }
  >

  export type InputObjectNested$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | InputObjectNested$SelectionSet
  >

  export type InputObjectNested = $SelectionSet.Nodes.Indicator.Indicator | InputObjectNested$SelectionSet

  export type InputObjectNestedNonNull$SelectionSetArguments = {
    input: _RefDefs._InputObjectNestedNonNull
  }
  export interface InputObjectNestedNonNull extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `InputObjectNestedNonNull` field.
     * All arguments are required so you must include this.
     */
    $: InputObjectNestedNonNull$SelectionSetArguments
  }

  export type InputObjectNestedNonNull$Expanded = InputObjectNestedNonNull

  export type abcEnum$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type abcEnum = $SelectionSet.Indicator.NoArgsIndicator

  export type date$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type date = $SelectionSet.Indicator.NoArgsIndicator

  export type dateArg$SelectionSetArguments = {
    date?: $Scalar.DateDecoded | undefined | null
  }
  export type dateArg$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `dateArg` field.
       * No arguments are required so you may omit this.
       */
      $?: dateArg$SelectionSetArguments
    }
  >

  export type dateArg$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | dateArg$SelectionSet
  >

  export type dateArg = $SelectionSet.Nodes.Indicator.Indicator | dateArg$SelectionSet

  export type dateArgInputObject$SelectionSetArguments = {
    input?: _RefDefs._InputObject | undefined | null
  }
  export type dateArgInputObject$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `dateArgInputObject` field.
       * No arguments are required so you may omit this.
       */
      $?: dateArgInputObject$SelectionSetArguments
    }
  >

  export type dateArgInputObject$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | dateArgInputObject$SelectionSet
  >

  export type dateArgInputObject = $SelectionSet.Nodes.Indicator.Indicator | dateArgInputObject$SelectionSet

  export type dateArgList$SelectionSetArguments = {
    date?: Array<$Scalar.DateDecoded | undefined | null> | undefined | null
  }
  export type dateArgList$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `dateArgList` field.
       * No arguments are required so you may omit this.
       */
      $?: dateArgList$SelectionSetArguments
    }
  >

  export type dateArgList$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | dateArgList$SelectionSet
  >

  export type dateArgList = $SelectionSet.Nodes.Indicator.Indicator | dateArgList$SelectionSet

  export type dateArgNonNull$SelectionSetArguments = {
    date: $Scalar.DateDecoded
  }
  export interface dateArgNonNull extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNull` field.
     * All arguments are required so you must include this.
     */
    $: dateArgNonNull$SelectionSetArguments
  }

  export type dateArgNonNull$Expanded = dateArgNonNull

  export type dateArgNonNullList$SelectionSetArguments = {
    date: Array<$Scalar.DateDecoded | undefined | null>
  }
  export interface dateArgNonNullList extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNullList` field.
     * All arguments are required so you must include this.
     */
    $: dateArgNonNullList$SelectionSetArguments
  }

  export type dateArgNonNullList$Expanded = dateArgNonNullList

  export type dateArgNonNullListNonNull$SelectionSetArguments = {
    date: Array<$Scalar.DateDecoded | undefined | null>
  }
  export interface dateArgNonNullListNonNull extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNullListNonNull` field.
     * All arguments are required so you must include this.
     */
    $: dateArgNonNullListNonNull$SelectionSetArguments
  }

  export type dateArgNonNullListNonNull$Expanded = dateArgNonNullListNonNull

  export interface dateInterface1 extends _RefDefs._DateInterface1 {}
  export type dateInterface1$Expanded = dateInterface1
  export type dateList$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type dateList = $SelectionSet.Indicator.NoArgsIndicator

  export type dateListNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type dateListNonNull = $SelectionSet.Indicator.NoArgsIndicator

  export type dateNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type dateNonNull = $SelectionSet.Indicator.NoArgsIndicator

  export interface dateObject1 extends _RefDefs._DateObject1 {}
  export type dateObject1$Expanded = dateObject1
  export interface dateUnion extends _RefDefs._DateUnion {}
  export type dateUnion$Expanded = dateUnion
  export type error$SelectionSetArguments = {
    case?: string | undefined | null
  }
  export type error$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `error` field.
       * No arguments are required so you may omit this.
       */
      $?: error$SelectionSetArguments
    }
  >

  export type error$Expanded = $Utilities.UnionExpanded<$SelectionSet.Nodes.Indicator.Indicator | error$SelectionSet>

  export type error = $SelectionSet.Nodes.Indicator.Indicator | error$SelectionSet

  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type idNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type idNonNull = $SelectionSet.Indicator.NoArgsIndicator

  export interface $interface extends _RefDefs._Interface {}
  export type $interface$Expanded = $interface
  export interface interfaceNonNull extends _RefDefs._Interface {}
  export type interfaceNonNull$Expanded = interfaceNonNull
  export interface interfaceWithArgs extends _RefDefs._Interface {
    /**
     * Arguments for `interfaceWithArgs` field.
     * All arguments are required so you must include this.
     */
    $: {
      id: string
    }
  }
  export type interfaceWithArgs$Expanded = interfaceWithArgs
  export type listInt$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type listInt = $SelectionSet.Indicator.NoArgsIndicator

  export type listIntNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type listIntNonNull = $SelectionSet.Indicator.NoArgsIndicator

  export type listListInt$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type listListInt = $SelectionSet.Indicator.NoArgsIndicator

  export type listListIntNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type listListIntNonNull = $SelectionSet.Indicator.NoArgsIndicator

  export interface lowerCaseUnion extends _RefDefs._lowerCaseUnion {}
  export type lowerCaseUnion$Expanded = lowerCaseUnion
  export interface $object extends _RefDefs._Object1 {}
  export type $object$Expanded = $object
  export interface objectList extends _RefDefs._Object1 {}
  export type objectList$Expanded = objectList
  export interface objectListNonNull extends _RefDefs._Object1 {}
  export type objectListNonNull$Expanded = objectListNonNull
  export interface objectNested extends _RefDefs._ObjectNested {}
  export type objectNested$Expanded = objectNested
  export interface objectNonNull extends _RefDefs._Object1 {}
  export type objectNonNull$Expanded = objectNonNull
  export interface objectWithArgs extends _RefDefs._Object1 {
    /**
     * Arguments for `objectWithArgs` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      boolean?: boolean | undefined | null
      float?: number | undefined | null
      id?: string | undefined | null
      int?: number | undefined | null
      string?: string | undefined | null
    }
  }
  export type objectWithArgs$Expanded = objectWithArgs
  export interface result extends _RefDefs._Result {
    /**
     * Arguments for `result` field.
     * All arguments are required so you must include this.
     */
    $: {
      case: _RefDefs._Case
    }
  }
  export type result$Expanded = result
  export interface resultNonNull extends _RefDefs._Result {
    /**
     * Arguments for `resultNonNull` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      case?: _RefDefs._Case | undefined | null
    }
  }
  export type resultNonNull$Expanded = resultNonNull
  export type $string$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type $string = $SelectionSet.Indicator.NoArgsIndicator

  export type stringWithArgEnum$SelectionSetArguments = {
    ABCEnum?: _RefDefs._ABCEnum | undefined | null
  }
  export type stringWithArgEnum$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithArgEnum` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithArgEnum$SelectionSetArguments
    }
  >

  export type stringWithArgEnum$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | stringWithArgEnum$SelectionSet
  >

  export type stringWithArgEnum = $SelectionSet.Nodes.Indicator.Indicator | stringWithArgEnum$SelectionSet

  export type stringWithArgInputObject$SelectionSetArguments = {
    input?: _RefDefs._InputObject | undefined | null
  }
  export type stringWithArgInputObject$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithArgInputObject` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithArgInputObject$SelectionSetArguments
    }
  >

  export type stringWithArgInputObject$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | stringWithArgInputObject$SelectionSet
  >

  export type stringWithArgInputObject = $SelectionSet.Nodes.Indicator.Indicator | stringWithArgInputObject$SelectionSet

  export type stringWithArgInputObjectRequired$SelectionSetArguments = {
    input: _RefDefs._InputObject
  }
  export interface stringWithArgInputObjectRequired extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithArgInputObjectRequired` field.
     * All arguments are required so you must include this.
     */
    $: stringWithArgInputObjectRequired$SelectionSetArguments
  }

  export type stringWithArgInputObjectRequired$Expanded = stringWithArgInputObjectRequired

  export type stringWithArgs$SelectionSetArguments = {
    boolean?: boolean | undefined | null
    float?: number | undefined | null
    id?: string | undefined | null
    int?: number | undefined | null
    string?: string | undefined | null
  }
  export type stringWithArgs$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithArgs` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithArgs$SelectionSetArguments
    }
  >

  export type stringWithArgs$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | stringWithArgs$SelectionSet
  >

  export type stringWithArgs = $SelectionSet.Nodes.Indicator.Indicator | stringWithArgs$SelectionSet

  export type stringWithListArg$SelectionSetArguments = {
    ints?: Array<number | undefined | null> | undefined | null
  }
  export type stringWithListArg$SelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithListArg` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithListArg$SelectionSetArguments
    }
  >

  export type stringWithListArg$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.Nodes.Indicator.Indicator | stringWithListArg$SelectionSet
  >

  export type stringWithListArg = $SelectionSet.Nodes.Indicator.Indicator | stringWithListArg$SelectionSet

  export type stringWithListArgRequired$SelectionSetArguments = {
    ints: Array<number | undefined | null>
  }
  export interface stringWithListArgRequired extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithListArgRequired` field.
     * All arguments are required so you must include this.
     */
    $: stringWithListArgRequired$SelectionSetArguments
  }

  export type stringWithListArgRequired$Expanded = stringWithListArgRequired

  export type stringWithRequiredArg$SelectionSetArguments = {
    string: string
  }
  export interface stringWithRequiredArg extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithRequiredArg` field.
     * All arguments are required so you must include this.
     */
    $: stringWithRequiredArg$SelectionSetArguments
  }

  export type stringWithRequiredArg$Expanded = stringWithRequiredArg

  export interface unionFooBar extends _RefDefs._FooBarUnion {}
  export type unionFooBar$Expanded = unionFooBar
  export interface unionFooBarNonNull extends _RefDefs._FooBarUnion {}
  export type unionFooBarNonNull$Expanded = unionFooBarNonNull
  export interface unionFooBarWithArgs extends _RefDefs._FooBarUnion {
    /**
     * Arguments for `unionFooBarWithArgs` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      id?: string | undefined | null
    }
  }
  export type unionFooBarWithArgs$Expanded = unionFooBarWithArgs
  export interface unionObject extends _RefDefs._ObjectUnion {}
  export type unionObject$Expanded = unionObject
  export interface unionObjectNonNull extends _RefDefs._ObjectUnion {}
  export type unionObjectNonNull$Expanded = unionObjectNonNull
}

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLEnumType Types
// ==================================================================================================
//
//
//
//
//
//

/**
 * Enum documentation.
 *
 * Members
 * "A" - (DEPRECATED: Enum value A is deprecated.)
 * "B" - Enum B member documentation.
 * "C" - (DEPRECATED: Enum value C is deprecated.)
 */
export type ABCEnum = 'A' | 'B' | 'C'

export type Case = 'ErrorOne' | 'ErrorTwo' | 'Object1'

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

export interface InputObject {
  date?: $Scalar.DateDecoded | undefined | null
  dateRequired: $Scalar.DateDecoded
  id?: string | undefined | null
  idRequired: string
}

export interface InputObjectNested {
  InputObject?: _RefDefs._InputObject | undefined | null
}

export interface InputObjectNestedNonNull {
  InputObject: _RefDefs._InputObject
}

//
//
//
//
//
//
// ==================================================================================================
//                                     GraphQLInterfaceType Types
// ==================================================================================================
//
//
//
//
//
//

// --------------
// Interface Type DateInterface1
// --------------

export interface DateInterface1 extends $SelectionSet.Bases.ObjectLike {
  date1?: DateInterface1.date1
  ___on_DateObject1?: DateObject1

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateInterface1$FragmentInline | DateInterface1$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface DateInterface1$FragmentInline
  extends DateInterface1, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

export namespace DateInterface1 {
  export type date1$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type date1 = $SelectionSet.Indicator.NoArgsIndicator
}

// --------------
// Interface Type Error
// --------------

export interface Error extends $SelectionSet.Bases.ObjectLike {
  message?: Error.message
  ___on_ErrorOne?: ErrorOne
  ___on_ErrorTwo?: ErrorTwo

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Error$FragmentInline | Error$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Error$FragmentInline extends Error, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

export namespace Error {
  export type message$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type message = $SelectionSet.Indicator.NoArgsIndicator
}

// --------------
// Interface Type Interface
// --------------

export interface Interface extends $SelectionSet.Bases.ObjectLike {
  id?: Interface.id
  ___on_Object1ImplementingInterface?: Object1ImplementingInterface
  ___on_Object2ImplementingInterface?: Object2ImplementingInterface

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Interface$FragmentInline | Interface$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Interface$FragmentInline extends Interface, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

export namespace Interface {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator
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
//                                                Bar
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Bar extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `int` field on the `Bar` object. Its type is `Int` (a `Scalar`).
   */
  int?: Bar.int$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Bar.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Bar$FragmentInline | Bar$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Bar$FragmentInline extends Bar, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Bar {
  export type int$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type int = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            DateObject1
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface DateObject1 extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `date1` field on the `DateObject1` object. Its type is `Date` (a `Scalar`).
   */
  date1?: DateObject1.date1$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<DateObject1.date1>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateObject1$FragmentInline | DateObject1$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface DateObject1$FragmentInline
  extends DateObject1, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace DateObject1 {
  export type date1$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type date1 = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            DateObject2
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface DateObject2 extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `date2` field on the `DateObject2` object. Its type is `Date` (a `Scalar`).
   */
  date2?: DateObject2.date2$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<DateObject2.date2>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateObject2$FragmentInline | DateObject2$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface DateObject2$FragmentInline
  extends DateObject2, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace DateObject2 {
  export type date2$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type date2 = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              ErrorOne
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ErrorOne extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `infoId` field on the `ErrorOne` object. Its type is `ID` (a `Scalar`).
   */
  infoId?: ErrorOne.infoId$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ErrorOne.infoId>
  /**
   * Select the `message` field on the `ErrorOne` object. Its type is `String` (a `Scalar`).
   */
  message?: ErrorOne.message$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ErrorOne.message>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ErrorOne$FragmentInline | ErrorOne$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface ErrorOne$FragmentInline extends ErrorOne, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace ErrorOne {
  export type infoId$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type infoId = $SelectionSet.Indicator.NoArgsIndicator

  export type message$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type message = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              ErrorTwo
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ErrorTwo extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `infoInt` field on the `ErrorTwo` object. Its type is `Int` (a `Scalar`).
   */
  infoInt?: ErrorTwo.infoInt$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ErrorTwo.infoInt>
  /**
   * Select the `message` field on the `ErrorTwo` object. Its type is `String` (a `Scalar`).
   */
  message?: ErrorTwo.message$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ErrorTwo.message>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ErrorTwo$FragmentInline | ErrorTwo$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface ErrorTwo$FragmentInline extends ErrorTwo, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace ErrorTwo {
  export type infoInt$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type infoInt = $SelectionSet.Indicator.NoArgsIndicator

  export type message$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type message = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                                Foo
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

/**
 * Object documentation.
 */
export interface Foo extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Foo` object. Its type is `ID` (a `Scalar`).
   */
  id?: Foo.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Foo.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Foo$FragmentInline | Foo$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Foo$FragmentInline extends Foo, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Foo {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Object1
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Object1 extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `boolean` field on the `Object1` object. Its type is `Boolean` (a `Scalar`).
   */
  boolean?: Object1.$boolean$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1.$boolean>
  /**
   * Select the `float` field on the `Object1` object. Its type is `Float` (a `Scalar`).
   */
  float?: Object1.float$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1.float>
  /**
   * Select the `id` field on the `Object1` object. Its type is `ID` (a `Scalar`).
   */
  id?: Object1.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1.id>
  /**
   * Select the `int` field on the `Object1` object. Its type is `Int` (a `Scalar`).
   */
  int?: Object1.int$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1.int>
  /**
   * Select the `string` field on the `Object1` object. Its type is `String` (a `Scalar`).
   */
  string?: Object1.$string$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1.$string>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object1$FragmentInline | Object1$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Object1$FragmentInline extends Object1, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Object1 {
  export type $boolean$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type $boolean = $SelectionSet.Indicator.NoArgsIndicator

  export type float$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type float = $SelectionSet.Indicator.NoArgsIndicator

  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type int$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type int = $SelectionSet.Indicator.NoArgsIndicator

  export type $string$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type $string = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                    Object1ImplementingInterface
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Object1ImplementingInterface extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Object1ImplementingInterface` object. Its type is `ID` (a `Scalar`).
   */
  id?:
    | Object1ImplementingInterface.id$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1ImplementingInterface.id>
  /**
   * Select the `int` field on the `Object1ImplementingInterface` object. Its type is `Int` (a `Scalar`).
   */
  int?:
    | Object1ImplementingInterface.int$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object1ImplementingInterface.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object1ImplementingInterface$FragmentInline | Object1ImplementingInterface$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Object1ImplementingInterface$FragmentInline
  extends Object1ImplementingInterface, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace Object1ImplementingInterface {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type int$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type int = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                    Object2ImplementingInterface
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Object2ImplementingInterface extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `boolean` field on the `Object2ImplementingInterface` object. Its type is `Boolean` (a `Scalar`).
   */
  boolean?:
    | Object2ImplementingInterface.$boolean$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object2ImplementingInterface.$boolean>
  /**
   * Select the `id` field on the `Object2ImplementingInterface` object. Its type is `ID` (a `Scalar`).
   */
  id?:
    | Object2ImplementingInterface.id$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<Object2ImplementingInterface.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object2ImplementingInterface$FragmentInline | Object2ImplementingInterface$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Object2ImplementingInterface$FragmentInline
  extends Object2ImplementingInterface, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace Object2ImplementingInterface {
  export type $boolean$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type $boolean = $SelectionSet.Indicator.NoArgsIndicator

  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            ObjectNested
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ObjectNested extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `id` field on the `ObjectNested` object. Its type is `ID` (a `Scalar`).
   */
  id?: ObjectNested.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ObjectNested.id>
  /**
   * Select the `object` field on the `ObjectNested` object. Its type is Object.
   */
  object?: ObjectNested.$object$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ObjectNested.$object>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ObjectNested$FragmentInline | ObjectNested$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface ObjectNested$FragmentInline
  extends ObjectNested, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace ObjectNested {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export interface $object extends _RefDefs._Object1 {}
  export type $object$Expanded = $object
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            ObjectUnion
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ObjectUnion extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `fooBarUnion` field on the `ObjectUnion` object. Its type is Union.
   */
  fooBarUnion?: ObjectUnion.fooBarUnion$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<ObjectUnion.fooBarUnion>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ObjectUnion$FragmentInline | ObjectUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface ObjectUnion$FragmentInline
  extends ObjectUnion, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace ObjectUnion {
  export interface fooBarUnion extends _RefDefs._FooBarUnion {}
  export type fooBarUnion$Expanded = fooBarUnion
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                          lowerCaseObject
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface lowerCaseObject extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `id` field on the `lowerCaseObject` object. Its type is `ID` (a `Scalar`).
   */
  id?: lowerCaseObject.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<lowerCaseObject.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseObject$FragmentInline | lowerCaseObject$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface lowerCaseObject$FragmentInline
  extends lowerCaseObject, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace lowerCaseObject {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                          lowerCaseObject2
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface lowerCaseObject2 extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `int` field on the `lowerCaseObject2` object. Its type is `Int` (a `Scalar`).
   */
  int?: lowerCaseObject2.int$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<lowerCaseObject2.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseObject2$FragmentInline | lowerCaseObject2$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface lowerCaseObject2$FragmentInline
  extends lowerCaseObject2, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace lowerCaseObject2 {
  export type int$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type int = $SelectionSet.Indicator.NoArgsIndicator
}

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLUnionType Types
// ==================================================================================================
//
//
//
//
//
//

export interface DateUnion {
  ___on_DateObject1?: DateObject1
  ___on_DateObject2?: DateObject2

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateUnion$FragmentInline | DateUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}
export interface DateUnion$FragmentInline extends DateUnion, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

/**
 * Union documentation.
 */
export interface FooBarUnion {
  ___on_Bar?: Bar
  ___on_Foo?: Foo

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: FooBarUnion$FragmentInline | FooBarUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}
export interface FooBarUnion$FragmentInline
  extends FooBarUnion, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

export interface Result {
  ___on_ErrorOne?: ErrorOne
  ___on_ErrorTwo?: ErrorTwo
  ___on_Object1?: Object1

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Result$FragmentInline | Result$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}
export interface Result$FragmentInline extends Result, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

export interface lowerCaseUnion {
  ___on_lowerCaseObject?: lowerCaseObject
  ___on_lowerCaseObject2?: lowerCaseObject2

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseUnion$FragmentInline | lowerCaseUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}
export interface lowerCaseUnion$FragmentInline
  extends lowerCaseUnion, $SelectionSet.Directive.$Groups.InlineFragment.Fields
{}

/**
 * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */
export namespace _RefDefs {
  export type _Mutation = Mutation
  export type _Query = Query
  export type _ABCEnum = ABCEnum
  export type _Case = Case
  export type _InputObject = InputObject
  export type _InputObjectNested = InputObjectNested
  export type _InputObjectNestedNonNull = InputObjectNestedNonNull
  export type _DateInterface1 = DateInterface1
  export type _Error = Error
  export type _Interface = Interface
  export type _Bar = Bar
  export type _DateObject1 = DateObject1
  export type _DateObject2 = DateObject2
  export type _ErrorOne = ErrorOne
  export type _ErrorTwo = ErrorTwo
  export type _Foo = Foo
  export type _Object1 = Object1
  export type _Object1ImplementingInterface = Object1ImplementingInterface
  export type _Object2ImplementingInterface = Object2ImplementingInterface
  export type _ObjectNested = ObjectNested
  export type _ObjectUnion = ObjectUnion
  export type _lowerCaseObject = lowerCaseObject
  export type _lowerCaseObject2 = lowerCaseObject2
  export type _DateUnion = DateUnion
  export type _FooBarUnion = FooBarUnion
  export type _Result = Result
  export type _lowerCaseUnion = lowerCaseUnion
}
