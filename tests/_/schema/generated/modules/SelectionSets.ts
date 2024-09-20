/**
 * [1] This type alias serves to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */

import type { SelectionSet as $SelectionSet } from '../../../../../src/entrypoints/schema.js'
import type * as $Utilities from '../../../../../src/entrypoints/utilities-for-generated.js'
import type * as $Scalar from './Scalar.js'

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLRootType Types
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
  id?: Mutation.id$Expanded | $SelectionSet.Alias<Mutation.id>
  /**
   * Select the `idNonNull` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Mutation.idNonNull$Expanded | $SelectionSet.Alias<Mutation.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Mutation | Mutation[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator

  export type idNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type idNonNull = $SelectionSet.NoArgsIndicator
}

type __Mutation = Mutation // [1]

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
  InputObjectNested?: Query.InputObjectNested$Expanded | $SelectionSet.Alias<Query.InputObjectNested>
  /**
   * Select the `InputObjectNestedNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  InputObjectNestedNonNull?:
    | Query.InputObjectNestedNonNull$Expanded
    | $SelectionSet.Alias<Query.InputObjectNestedNonNull>
  /**
   * Select the `abcEnum` field on the `Query` object. Its type is Enum.
   */
  abcEnum?: Query.abcEnum$Expanded | $SelectionSet.Alias<Query.abcEnum>
  /**
   * Select the `date` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  date?: Query.date$Expanded | $SelectionSet.Alias<Query.date>
  /**
   * Select the `dateArg` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArg?: Query.dateArg$Expanded | $SelectionSet.Alias<Query.dateArg>
  /**
   * Select the `dateArgInputObject` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgInputObject?: Query.dateArgInputObject$Expanded | $SelectionSet.Alias<Query.dateArgInputObject>
  /**
   * Select the `dateArgList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgList?: Query.dateArgList$Expanded | $SelectionSet.Alias<Query.dateArgList>
  /**
   * Select the `dateArgNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNull?: Query.dateArgNonNull$Expanded | $SelectionSet.Alias<Query.dateArgNonNull>
  /**
   * Select the `dateArgNonNullList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNullList?: Query.dateArgNonNullList$Expanded | $SelectionSet.Alias<Query.dateArgNonNullList>
  /**
   * Select the `dateArgNonNullListNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNullListNonNull?:
    | Query.dateArgNonNullListNonNull$Expanded
    | $SelectionSet.Alias<Query.dateArgNonNullListNonNull>
  /**
   * Select the `dateInterface1` field on the `Query` object. Its type is Interface.
   */
  dateInterface1?: Query.dateInterface1$Expanded | $SelectionSet.Alias<Query.dateInterface1>
  /**
   * Select the `dateList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateList?: Query.dateList$Expanded | $SelectionSet.Alias<Query.dateList>
  /**
   * Select the `dateListNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateListNonNull?: Query.dateListNonNull$Expanded | $SelectionSet.Alias<Query.dateListNonNull>
  /**
   * Select the `dateNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateNonNull?: Query.dateNonNull$Expanded | $SelectionSet.Alias<Query.dateNonNull>
  /**
   * Select the `dateObject1` field on the `Query` object. Its type is Object.
   */
  dateObject1?: Query.dateObject1$Expanded | $SelectionSet.Alias<Query.dateObject1>
  /**
   * Select the `dateUnion` field on the `Query` object. Its type is Union.
   */
  dateUnion?: Query.dateUnion$Expanded | $SelectionSet.Alias<Query.dateUnion>
  /**
   * Select the `error` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  error?: Query.error$Expanded | $SelectionSet.Alias<Query.error>
  /**
   * Select the `id` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  id?: Query.id$Expanded | $SelectionSet.Alias<Query.id>
  /**
   * Select the `idNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Query.idNonNull$Expanded | $SelectionSet.Alias<Query.idNonNull>
  /**
   * Select the `interface` field on the `Query` object. Its type is Interface.
   */
  interface?: Query.$interface$Expanded | $SelectionSet.Alias<Query.$interface>
  /**
   * Select the `interfaceNonNull` field on the `Query` object. Its type is Interface.
   */
  interfaceNonNull?: Query.interfaceNonNull$Expanded | $SelectionSet.Alias<Query.interfaceNonNull>
  /**
   * Select the `interfaceWithArgs` field on the `Query` object. Its type is Interface.
   */
  interfaceWithArgs?: Query.interfaceWithArgs$Expanded | $SelectionSet.Alias<Query.interfaceWithArgs>
  /**
   * Select the `listInt` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listInt?: Query.listInt$Expanded | $SelectionSet.Alias<Query.listInt>
  /**
   * Select the `listIntNonNull` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listIntNonNull?: Query.listIntNonNull$Expanded | $SelectionSet.Alias<Query.listIntNonNull>
  /**
   * Select the `listListInt` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listListInt?: Query.listListInt$Expanded | $SelectionSet.Alias<Query.listListInt>
  /**
   * Select the `listListIntNonNull` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listListIntNonNull?: Query.listListIntNonNull$Expanded | $SelectionSet.Alias<Query.listListIntNonNull>
  /**
   * Select the `lowerCaseUnion` field on the `Query` object. Its type is Union.
   */
  lowerCaseUnion?: Query.lowerCaseUnion$Expanded | $SelectionSet.Alias<Query.lowerCaseUnion>
  /**
   * Select the `object` field on the `Query` object. Its type is Object.
   */
  object?: Query.$object$Expanded | $SelectionSet.Alias<Query.$object>
  /**
   * Select the `objectList` field on the `Query` object. Its type is Object.
   */
  objectList?: Query.objectList$Expanded | $SelectionSet.Alias<Query.objectList>
  /**
   * Select the `objectListNonNull` field on the `Query` object. Its type is Object.
   */
  objectListNonNull?: Query.objectListNonNull$Expanded | $SelectionSet.Alias<Query.objectListNonNull>
  /**
   * Select the `objectNested` field on the `Query` object. Its type is Object.
   */
  objectNested?: Query.objectNested$Expanded | $SelectionSet.Alias<Query.objectNested>
  /**
   * Select the `objectNonNull` field on the `Query` object. Its type is Object.
   */
  objectNonNull?: Query.objectNonNull$Expanded | $SelectionSet.Alias<Query.objectNonNull>
  /**
   * Select the `objectWithArgs` field on the `Query` object. Its type is Object.
   */
  objectWithArgs?: Query.objectWithArgs$Expanded | $SelectionSet.Alias<Query.objectWithArgs>
  /**
   * Select the `result` field on the `Query` object. Its type is Union.
   */
  result?: Query.result$Expanded | $SelectionSet.Alias<Query.result>
  /**
   * Select the `resultNonNull` field on the `Query` object. Its type is Union.
   */
  resultNonNull?: Query.resultNonNull$Expanded | $SelectionSet.Alias<Query.resultNonNull>
  /**
   * Select the `string` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  string?: Query.$string$Expanded | $SelectionSet.Alias<Query.$string>
  /**
   * Select the `stringWithArgEnum` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgEnum?: Query.stringWithArgEnum$Expanded | $SelectionSet.Alias<Query.stringWithArgEnum>
  /**
   * Select the `stringWithArgInputObject` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgInputObject?:
    | Query.stringWithArgInputObject$Expanded
    | $SelectionSet.Alias<Query.stringWithArgInputObject>
  /**
   * Select the `stringWithArgInputObjectRequired` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgInputObjectRequired?:
    | Query.stringWithArgInputObjectRequired$Expanded
    | $SelectionSet.Alias<Query.stringWithArgInputObjectRequired>
  /**
   * Select the `stringWithArgs` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgs?: Query.stringWithArgs$Expanded | $SelectionSet.Alias<Query.stringWithArgs>
  /**
   * Select the `stringWithListArg` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithListArg?: Query.stringWithListArg$Expanded | $SelectionSet.Alias<Query.stringWithListArg>
  /**
   * Select the `stringWithListArgRequired` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithListArgRequired?:
    | Query.stringWithListArgRequired$Expanded
    | $SelectionSet.Alias<Query.stringWithListArgRequired>
  /**
   * Select the `stringWithRequiredArg` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithRequiredArg?: Query.stringWithRequiredArg$Expanded | $SelectionSet.Alias<Query.stringWithRequiredArg>
  /**
   * Select the `unionFooBar` field on the `Query` object. Its type is Union.
   */
  unionFooBar?: Query.unionFooBar$Expanded | $SelectionSet.Alias<Query.unionFooBar>
  /**
   * Select the `unionFooBarNonNull` field on the `Query` object. Its type is Union.
   */
  unionFooBarNonNull?: Query.unionFooBarNonNull$Expanded | $SelectionSet.Alias<Query.unionFooBarNonNull>
  /**
   * Select the `unionFooBarWithArgs` field on the `Query` object. Its type is Union.
   */
  unionFooBarWithArgs?: Query.unionFooBarWithArgs$Expanded | $SelectionSet.Alias<Query.unionFooBarWithArgs>
  /**
   * Select the `unionObject` field on the `Query` object. Its type is Object.
   */
  unionObject?: Query.unionObject$Expanded | $SelectionSet.Alias<Query.unionObject>
  /**
   * Select the `unionObjectNonNull` field on the `Query` object. Its type is Object.
   */
  unionObjectNonNull?: Query.unionObjectNonNull$Expanded | $SelectionSet.Alias<Query.unionObjectNonNull>

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
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  type InputObjectNestedSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `InputObjectNested` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        input?: InputObjectNested | undefined | null
      }
    }
  >

  export type InputObjectNested$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.ClientIndicator | InputObjectNestedSelectionSet
  >

  export type InputObjectNested = $SelectionSet.ClientIndicator | InputObjectNestedSelectionSet

  export interface InputObjectNestedNonNull extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `InputObjectNestedNonNull` field.
     * All arguments are required so you must include this.
     */
    $: {
      input: InputObjectNestedNonNull
    }
  }

  export type InputObjectNestedNonNull$Expanded = InputObjectNestedNonNull

  export type abcEnum$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type abcEnum = $SelectionSet.NoArgsIndicator

  export type date$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type date = $SelectionSet.NoArgsIndicator

  type dateArgSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `dateArg` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        date?: $Scalar.DateDecoded | undefined | null
      }
    }
  >

  export type dateArg$Expanded = $Utilities.UnionExpanded<$SelectionSet.ClientIndicator | dateArgSelectionSet>

  export type dateArg = $SelectionSet.ClientIndicator | dateArgSelectionSet

  type dateArgInputObjectSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `dateArgInputObject` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        input?: InputObject | undefined | null
      }
    }
  >

  export type dateArgInputObject$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.ClientIndicator | dateArgInputObjectSelectionSet
  >

  export type dateArgInputObject = $SelectionSet.ClientIndicator | dateArgInputObjectSelectionSet

  type dateArgListSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `dateArgList` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        date?: Array<$Scalar.DateDecoded | undefined | null> | undefined | null
      }
    }
  >

  export type dateArgList$Expanded = $Utilities.UnionExpanded<$SelectionSet.ClientIndicator | dateArgListSelectionSet>

  export type dateArgList = $SelectionSet.ClientIndicator | dateArgListSelectionSet

  export interface dateArgNonNull extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNull` field.
     * All arguments are required so you must include this.
     */
    $: {
      date: $Scalar.DateDecoded
    }
  }

  export type dateArgNonNull$Expanded = dateArgNonNull

  export interface dateArgNonNullList extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNullList` field.
     * All arguments are required so you must include this.
     */
    $: {
      date: Array<$Scalar.DateDecoded | undefined | null>
    }
  }

  export type dateArgNonNullList$Expanded = dateArgNonNullList

  export interface dateArgNonNullListNonNull extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNullListNonNull` field.
     * All arguments are required so you must include this.
     */
    $: {
      date: Array<$Scalar.DateDecoded | undefined | null>
    }
  }

  export type dateArgNonNullListNonNull$Expanded = dateArgNonNullListNonNull

  export interface dateInterface1 extends __DateInterface1 {}
  export type dateInterface1$Expanded = dateInterface1
  export type dateList$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type dateList = $SelectionSet.NoArgsIndicator

  export type dateListNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type dateListNonNull = $SelectionSet.NoArgsIndicator

  export type dateNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type dateNonNull = $SelectionSet.NoArgsIndicator

  export interface dateObject1 extends __DateObject1 {}
  export type dateObject1$Expanded = dateObject1
  export interface dateUnion extends __DateUnion {}
  export type dateUnion$Expanded = dateUnion
  type errorSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `error` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        case?: string | undefined | null
      }
    }
  >

  export type error$Expanded = $Utilities.UnionExpanded<$SelectionSet.ClientIndicator | errorSelectionSet>

  export type error = $SelectionSet.ClientIndicator | errorSelectionSet

  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator

  export type idNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type idNonNull = $SelectionSet.NoArgsIndicator

  export interface $interface extends __Interface {}
  export type $interface$Expanded = $interface
  export interface interfaceNonNull extends __Interface {}
  export type interfaceNonNull$Expanded = interfaceNonNull
  export interface interfaceWithArgs extends __Interface {
    /**
     * Arguments for `interfaceWithArgs` field.
     * All arguments are required so you must include this.
     */
    $: {
      id: string
    }
  }
  export type interfaceWithArgs$Expanded = interfaceWithArgs
  export type listInt$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type listInt = $SelectionSet.NoArgsIndicator

  export type listIntNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type listIntNonNull = $SelectionSet.NoArgsIndicator

  export type listListInt$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type listListInt = $SelectionSet.NoArgsIndicator

  export type listListIntNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type listListIntNonNull = $SelectionSet.NoArgsIndicator

  export interface lowerCaseUnion extends __lowerCaseUnion {}
  export type lowerCaseUnion$Expanded = lowerCaseUnion
  export interface $object extends __Object1 {}
  export type $object$Expanded = $object
  export interface objectList extends __Object1 {}
  export type objectList$Expanded = objectList
  export interface objectListNonNull extends __Object1 {}
  export type objectListNonNull$Expanded = objectListNonNull
  export interface objectNested extends __ObjectNested {}
  export type objectNested$Expanded = objectNested
  export interface objectNonNull extends __Object1 {}
  export type objectNonNull$Expanded = objectNonNull
  export interface objectWithArgs extends __Object1 {
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
  export interface result extends __Result {
    /**
     * Arguments for `result` field.
     * All arguments are required so you must include this.
     */
    $: {
      case: Case
    }
  }
  export type result$Expanded = result
  export interface resultNonNull extends __Result {
    /**
     * Arguments for `resultNonNull` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      case?: Case | undefined | null
    }
  }
  export type resultNonNull$Expanded = resultNonNull
  export type $string$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type $string = $SelectionSet.NoArgsIndicator

  type stringWithArgEnumSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithArgEnum` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        ABCEnum?: ABCEnum | undefined | null
      }
    }
  >

  export type stringWithArgEnum$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.ClientIndicator | stringWithArgEnumSelectionSet
  >

  export type stringWithArgEnum = $SelectionSet.ClientIndicator | stringWithArgEnumSelectionSet

  type stringWithArgInputObjectSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithArgInputObject` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        input?: InputObject | undefined | null
      }
    }
  >

  export type stringWithArgInputObject$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.ClientIndicator | stringWithArgInputObjectSelectionSet
  >

  export type stringWithArgInputObject = $SelectionSet.ClientIndicator | stringWithArgInputObjectSelectionSet

  export interface stringWithArgInputObjectRequired extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithArgInputObjectRequired` field.
     * All arguments are required so you must include this.
     */
    $: {
      input: InputObject
    }
  }

  export type stringWithArgInputObjectRequired$Expanded = stringWithArgInputObjectRequired

  type stringWithArgsSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithArgs` field.
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
  >

  export type stringWithArgs$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.ClientIndicator | stringWithArgsSelectionSet
  >

  export type stringWithArgs = $SelectionSet.ClientIndicator | stringWithArgsSelectionSet

  type stringWithListArgSelectionSet = $Utilities.Simplify<
    $SelectionSet.Bases.Base & {
      /**
       * Arguments for `stringWithListArg` field.
       * No arguments are required so you may omit this.
       */
      $?: {
        ints?: Array<number | undefined | null> | undefined | null
      }
    }
  >

  export type stringWithListArg$Expanded = $Utilities.UnionExpanded<
    $SelectionSet.ClientIndicator | stringWithListArgSelectionSet
  >

  export type stringWithListArg = $SelectionSet.ClientIndicator | stringWithListArgSelectionSet

  export interface stringWithListArgRequired extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithListArgRequired` field.
     * All arguments are required so you must include this.
     */
    $: {
      ints: Array<number | undefined | null>
    }
  }

  export type stringWithListArgRequired$Expanded = stringWithListArgRequired

  export interface stringWithRequiredArg extends $SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithRequiredArg` field.
     * All arguments are required so you must include this.
     */
    $: {
      string: string
    }
  }

  export type stringWithRequiredArg$Expanded = stringWithRequiredArg

  export interface unionFooBar extends __FooBarUnion {}
  export type unionFooBar$Expanded = unionFooBar
  export interface unionFooBarNonNull extends __FooBarUnion {}
  export type unionFooBarNonNull$Expanded = unionFooBarNonNull
  export interface unionFooBarWithArgs extends __FooBarUnion {
    /**
     * Arguments for `unionFooBarWithArgs` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      id?: string | undefined | null
    }
  }
  export type unionFooBarWithArgs$Expanded = unionFooBarWithArgs
  export interface unionObject extends __ObjectUnion {}
  export type unionObject$Expanded = unionObject
  export interface unionObjectNonNull extends __ObjectUnion {}
  export type unionObjectNonNull$Expanded = unionObjectNonNull
}

type __Query = Query // [1]

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

type __ABCEnum = ABCEnum // [1]

export type Case = 'ErrorOne' | 'ErrorTwo' | 'Object1'

type __Case = Case // [1]

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

type __InputObject = InputObject // [1]

export interface InputObjectNested {
  InputObject?: InputObject | undefined | null
}

type __InputObjectNested = InputObjectNested // [1]

export interface InputObjectNestedNonNull {
  InputObject: InputObject
}

type __InputObjectNestedNonNull = InputObjectNestedNonNull // [1]

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
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateInterface1 | DateInterface1[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

export namespace DateInterface1 {
  export type date1$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type date1 = $SelectionSet.NoArgsIndicator
}

type __DateInterface1 = DateInterface1 // [1]

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
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Error | Error[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

export namespace Error {
  export type message$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type message = $SelectionSet.NoArgsIndicator
}

type __Error = Error // [1]

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
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Interface | Interface[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

export namespace Interface {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator
}

type __Interface = Interface // [1]

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
  int?: Bar.int$Expanded | $SelectionSet.Alias<Bar.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Bar | Bar[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Bar {
  export type int$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type int = $SelectionSet.NoArgsIndicator
}

type __Bar = Bar // [1]

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
  date1?: DateObject1.date1$Expanded | $SelectionSet.Alias<DateObject1.date1>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateObject1 | DateObject1[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace DateObject1 {
  export type date1$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type date1 = $SelectionSet.NoArgsIndicator
}

type __DateObject1 = DateObject1 // [1]

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
  date2?: DateObject2.date2$Expanded | $SelectionSet.Alias<DateObject2.date2>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateObject2 | DateObject2[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace DateObject2 {
  export type date2$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type date2 = $SelectionSet.NoArgsIndicator
}

type __DateObject2 = DateObject2 // [1]

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
  infoId?: ErrorOne.infoId$Expanded | $SelectionSet.Alias<ErrorOne.infoId>
  /**
   * Select the `message` field on the `ErrorOne` object. Its type is `String` (a `Scalar`).
   */
  message?: ErrorOne.message$Expanded | $SelectionSet.Alias<ErrorOne.message>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ErrorOne | ErrorOne[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace ErrorOne {
  export type infoId$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type infoId = $SelectionSet.NoArgsIndicator

  export type message$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type message = $SelectionSet.NoArgsIndicator
}

type __ErrorOne = ErrorOne // [1]

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
  infoInt?: ErrorTwo.infoInt$Expanded | $SelectionSet.Alias<ErrorTwo.infoInt>
  /**
   * Select the `message` field on the `ErrorTwo` object. Its type is `String` (a `Scalar`).
   */
  message?: ErrorTwo.message$Expanded | $SelectionSet.Alias<ErrorTwo.message>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ErrorTwo | ErrorTwo[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace ErrorTwo {
  export type infoInt$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type infoInt = $SelectionSet.NoArgsIndicator

  export type message$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type message = $SelectionSet.NoArgsIndicator
}

type __ErrorTwo = ErrorTwo // [1]

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
  id?: Foo.id$Expanded | $SelectionSet.Alias<Foo.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Foo | Foo[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Foo {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator
}

type __Foo = Foo // [1]

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
  boolean?: Object1.$boolean$Expanded | $SelectionSet.Alias<Object1.$boolean>
  /**
   * Select the `float` field on the `Object1` object. Its type is `Float` (a `Scalar`).
   */
  float?: Object1.float$Expanded | $SelectionSet.Alias<Object1.float>
  /**
   * Select the `id` field on the `Object1` object. Its type is `ID` (a `Scalar`).
   */
  id?: Object1.id$Expanded | $SelectionSet.Alias<Object1.id>
  /**
   * Select the `int` field on the `Object1` object. Its type is `Int` (a `Scalar`).
   */
  int?: Object1.int$Expanded | $SelectionSet.Alias<Object1.int>
  /**
   * Select the `string` field on the `Object1` object. Its type is `String` (a `Scalar`).
   */
  string?: Object1.$string$Expanded | $SelectionSet.Alias<Object1.$string>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object1 | Object1[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Object1 {
  export type $boolean$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type $boolean = $SelectionSet.NoArgsIndicator

  export type float$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type float = $SelectionSet.NoArgsIndicator

  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator

  export type int$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type int = $SelectionSet.NoArgsIndicator

  export type $string$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type $string = $SelectionSet.NoArgsIndicator
}

type __Object1 = Object1 // [1]

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
  id?: Object1ImplementingInterface.id$Expanded | $SelectionSet.Alias<Object1ImplementingInterface.id>
  /**
   * Select the `int` field on the `Object1ImplementingInterface` object. Its type is `Int` (a `Scalar`).
   */
  int?: Object1ImplementingInterface.int$Expanded | $SelectionSet.Alias<Object1ImplementingInterface.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object1ImplementingInterface | Object1ImplementingInterface[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Object1ImplementingInterface {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator

  export type int$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type int = $SelectionSet.NoArgsIndicator
}

type __Object1ImplementingInterface = Object1ImplementingInterface // [1]

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
  boolean?: Object2ImplementingInterface.$boolean$Expanded | $SelectionSet.Alias<Object2ImplementingInterface.$boolean>
  /**
   * Select the `id` field on the `Object2ImplementingInterface` object. Its type is `ID` (a `Scalar`).
   */
  id?: Object2ImplementingInterface.id$Expanded | $SelectionSet.Alias<Object2ImplementingInterface.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object2ImplementingInterface | Object2ImplementingInterface[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Object2ImplementingInterface {
  export type $boolean$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type $boolean = $SelectionSet.NoArgsIndicator

  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator
}

type __Object2ImplementingInterface = Object2ImplementingInterface // [1]

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
  id?: ObjectNested.id$Expanded | $SelectionSet.Alias<ObjectNested.id>
  /**
   * Select the `object` field on the `ObjectNested` object. Its type is Object.
   */
  object?: ObjectNested.$object$Expanded | $SelectionSet.Alias<ObjectNested.$object>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ObjectNested | ObjectNested[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace ObjectNested {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator

  export interface $object extends __Object1 {}
  export type $object$Expanded = $object
}

type __ObjectNested = ObjectNested // [1]

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
  fooBarUnion?: ObjectUnion.fooBarUnion$Expanded | $SelectionSet.Alias<ObjectUnion.fooBarUnion>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ObjectUnion | ObjectUnion[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace ObjectUnion {
  export interface fooBarUnion extends __FooBarUnion {}
  export type fooBarUnion$Expanded = fooBarUnion
}

type __ObjectUnion = ObjectUnion // [1]

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
  id?: lowerCaseObject.id$Expanded | $SelectionSet.Alias<lowerCaseObject.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseObject | lowerCaseObject[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace lowerCaseObject {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator
}

type __lowerCaseObject = lowerCaseObject // [1]

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
  int?: lowerCaseObject2.int$Expanded | $SelectionSet.Alias<lowerCaseObject2.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseObject2 | lowerCaseObject2[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace lowerCaseObject2 {
  export type int$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type int = $SelectionSet.NoArgsIndicator
}

type __lowerCaseObject2 = lowerCaseObject2 // [1]

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
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateUnion | DateUnion[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

type __DateUnion = DateUnion // [1]

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
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: FooBarUnion | FooBarUnion[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

type __FooBarUnion = FooBarUnion // [1]

export interface Result {
  ___on_ErrorOne?: ErrorOne
  ___on_ErrorTwo?: ErrorTwo
  ___on_Object1?: Object1

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Result | Result[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

type __Result = Result // [1]

export interface lowerCaseUnion {
  ___on_lowerCaseObject?: lowerCaseObject
  ___on_lowerCaseObject2?: lowerCaseObject2

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseUnion | lowerCaseUnion[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

type __lowerCaseUnion = lowerCaseUnion // [1]
