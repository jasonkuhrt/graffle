/**
 * [1] This type alias serves to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */

import type { SelectionSet } from '../../../../../src/entrypoints/schema.js'

//
//
// ---------------------
// GraphQLRootType Types
// ---------------------
//
//

export interface Mutation {
  id?: Mutation.id | [alias: string, Mutation.id] | [alias: string, Mutation.id][]
  idNonNull?: Mutation.idNonNull | [alias: string, Mutation.idNonNull] | [alias: string, Mutation.idNonNull][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Mutation {
  export type id = SelectionSet.NoArgsIndicator
  export type idNonNull = SelectionSet.NoArgsIndicator
}

type __Mutation = Mutation // [1]

export interface Query {
  InputObjectNested?: Query.InputObjectNested | [alias: string, Query.InputObjectNested] | [
    alias: string,
    Query.InputObjectNested,
  ][]
  InputObjectNestedNonNull?: Query.InputObjectNestedNonNull | [alias: string, Query.InputObjectNestedNonNull] | [
    alias: string,
    Query.InputObjectNestedNonNull,
  ][]
  abcEnum?: Query.abcEnum | [alias: string, Query.abcEnum] | [alias: string, Query.abcEnum][]
  date?: Query.date | [alias: string, Query.date] | [alias: string, Query.date][]
  dateArg?: Query.dateArg | [alias: string, Query.dateArg] | [alias: string, Query.dateArg][]
  dateArgInputObject?: Query.dateArgInputObject | [alias: string, Query.dateArgInputObject] | [
    alias: string,
    Query.dateArgInputObject,
  ][]
  dateArgList?: Query.dateArgList | [alias: string, Query.dateArgList] | [alias: string, Query.dateArgList][]
  dateArgNonNull?: Query.dateArgNonNull | [alias: string, Query.dateArgNonNull] | [
    alias: string,
    Query.dateArgNonNull,
  ][]
  dateArgNonNullList?: Query.dateArgNonNullList | [alias: string, Query.dateArgNonNullList] | [
    alias: string,
    Query.dateArgNonNullList,
  ][]
  dateArgNonNullListNonNull?: Query.dateArgNonNullListNonNull | [alias: string, Query.dateArgNonNullListNonNull] | [
    alias: string,
    Query.dateArgNonNullListNonNull,
  ][]
  dateInterface1?: Query.dateInterface1 | [alias: string, Query.dateInterface1] | [
    alias: string,
    Query.dateInterface1,
  ][]
  dateList?: Query.dateList | [alias: string, Query.dateList] | [alias: string, Query.dateList][]
  dateListNonNull?: Query.dateListNonNull | [alias: string, Query.dateListNonNull] | [
    alias: string,
    Query.dateListNonNull,
  ][]
  dateNonNull?: Query.dateNonNull | [alias: string, Query.dateNonNull] | [alias: string, Query.dateNonNull][]
  dateObject1?: Query.dateObject1 | [alias: string, Query.dateObject1] | [alias: string, Query.dateObject1][]
  dateUnion?: Query.dateUnion | [alias: string, Query.dateUnion] | [alias: string, Query.dateUnion][]
  error?: Query.error | [alias: string, Query.error] | [alias: string, Query.error][]
  id?: Query.id | [alias: string, Query.id] | [alias: string, Query.id][]
  idNonNull?: Query.idNonNull | [alias: string, Query.idNonNull] | [alias: string, Query.idNonNull][]
  interface?: Query.$interface | [alias: string, Query.$interface] | [alias: string, Query.$interface][]
  interfaceNonNull?: Query.interfaceNonNull | [alias: string, Query.interfaceNonNull] | [
    alias: string,
    Query.interfaceNonNull,
  ][]
  interfaceWithArgs?: Query.interfaceWithArgs | [alias: string, Query.interfaceWithArgs] | [
    alias: string,
    Query.interfaceWithArgs,
  ][]
  listInt?: Query.listInt | [alias: string, Query.listInt] | [alias: string, Query.listInt][]
  listIntNonNull?: Query.listIntNonNull | [alias: string, Query.listIntNonNull] | [
    alias: string,
    Query.listIntNonNull,
  ][]
  listListInt?: Query.listListInt | [alias: string, Query.listListInt] | [alias: string, Query.listListInt][]
  listListIntNonNull?: Query.listListIntNonNull | [alias: string, Query.listListIntNonNull] | [
    alias: string,
    Query.listListIntNonNull,
  ][]
  lowerCaseUnion?: Query.lowerCaseUnion | [alias: string, Query.lowerCaseUnion] | [
    alias: string,
    Query.lowerCaseUnion,
  ][]
  object?: Query.$object | [alias: string, Query.$object] | [alias: string, Query.$object][]
  objectList?: Query.objectList | [alias: string, Query.objectList] | [alias: string, Query.objectList][]
  objectListNonNull?: Query.objectListNonNull | [alias: string, Query.objectListNonNull] | [
    alias: string,
    Query.objectListNonNull,
  ][]
  objectNested?: Query.objectNested | [alias: string, Query.objectNested] | [alias: string, Query.objectNested][]
  objectNonNull?: Query.objectNonNull | [alias: string, Query.objectNonNull] | [alias: string, Query.objectNonNull][]
  objectWithArgs?: Query.objectWithArgs | [alias: string, Query.objectWithArgs] | [
    alias: string,
    Query.objectWithArgs,
  ][]
  result?: Query.result | [alias: string, Query.result] | [alias: string, Query.result][]
  resultNonNull?: Query.resultNonNull | [alias: string, Query.resultNonNull] | [alias: string, Query.resultNonNull][]
  string?: Query.$string | [alias: string, Query.$string] | [alias: string, Query.$string][]
  stringWithArgEnum?: Query.stringWithArgEnum | [alias: string, Query.stringWithArgEnum] | [
    alias: string,
    Query.stringWithArgEnum,
  ][]
  stringWithArgInputObject?: Query.stringWithArgInputObject | [alias: string, Query.stringWithArgInputObject] | [
    alias: string,
    Query.stringWithArgInputObject,
  ][]
  stringWithArgInputObjectRequired?: Query.stringWithArgInputObjectRequired | [
    alias: string,
    Query.stringWithArgInputObjectRequired,
  ] | [alias: string, Query.stringWithArgInputObjectRequired][]
  stringWithArgs?: Query.stringWithArgs | [alias: string, Query.stringWithArgs] | [
    alias: string,
    Query.stringWithArgs,
  ][]
  stringWithListArg?: Query.stringWithListArg | [alias: string, Query.stringWithListArg] | [
    alias: string,
    Query.stringWithListArg,
  ][]
  stringWithListArgRequired?: Query.stringWithListArgRequired | [alias: string, Query.stringWithListArgRequired] | [
    alias: string,
    Query.stringWithListArgRequired,
  ][]
  stringWithRequiredArg?: Query.stringWithRequiredArg | [alias: string, Query.stringWithRequiredArg] | [
    alias: string,
    Query.stringWithRequiredArg,
  ][]
  unionFooBar?: Query.unionFooBar | [alias: string, Query.unionFooBar] | [alias: string, Query.unionFooBar][]
  unionFooBarNonNull?: Query.unionFooBarNonNull | [alias: string, Query.unionFooBarNonNull] | [
    alias: string,
    Query.unionFooBarNonNull,
  ][]
  unionFooBarWithArgs?: Query.unionFooBarWithArgs | [alias: string, Query.unionFooBarWithArgs] | [
    alias: string,
    Query.unionFooBarWithArgs,
  ][]
  unionObject?: Query.unionObject | [alias: string, Query.unionObject] | [alias: string, Query.unionObject][]
  unionObjectNonNull?: Query.unionObjectNonNull | [alias: string, Query.unionObjectNonNull] | [
    alias: string,
    Query.unionObjectNonNull,
  ][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Query {
  export type InputObjectNested = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `InputObjectNested` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      input?: InputObjectNested | undefined | null
    }
  }
  export interface InputObjectNestedNonNull extends SelectionSet.Bases.Base {
    /**
     * Arguments for `InputObjectNestedNonNull` field.
     * All arguments are required so you must include this.
     */
    $: {
      input: InputObjectNestedNonNull
    }
  }
  export type abcEnum = SelectionSet.NoArgsIndicator
  export type date = SelectionSet.NoArgsIndicator
  export type dateArg = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `dateArg` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      date?: undefined | undefined | null
    }
  }
  export type dateArgInputObject = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `dateArgInputObject` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      input?: InputObject | undefined | null
    }
  }
  export type dateArgList = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `dateArgList` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      date?: Array<undefined | undefined | null> | undefined | null
    }
  }
  export interface dateArgNonNull extends SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNull` field.
     * All arguments are required so you must include this.
     */
    $: {
      date: undefined
    }
  }
  export interface dateArgNonNullList extends SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNullList` field.
     * All arguments are required so you must include this.
     */
    $: {
      date: Array<undefined | undefined | null>
    }
  }
  export interface dateArgNonNullListNonNull extends SelectionSet.Bases.Base {
    /**
     * Arguments for `dateArgNonNullListNonNull` field.
     * All arguments are required so you must include this.
     */
    $: {
      date: Array<undefined | undefined | null>
    }
  }
  export interface dateInterface1 extends __DateInterface1 {}
  export type dateList = SelectionSet.NoArgsIndicator
  export type dateListNonNull = SelectionSet.NoArgsIndicator
  export type dateNonNull = SelectionSet.NoArgsIndicator
  export interface dateObject1 extends __DateObject1 {}
  export interface dateUnion extends __DateUnion {}
  export type error = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `error` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      case?: string | undefined | null
    }
  }
  export type id = SelectionSet.NoArgsIndicator
  export type idNonNull = SelectionSet.NoArgsIndicator
  export interface $interface extends __Interface {}
  export interface interfaceNonNull extends __Interface {}
  export interface interfaceWithArgs extends __Interface {
    /**
     * Arguments for `interfaceWithArgs` field.
     * All arguments are required so you must include this.
     */
    $: {
      id: string
    }
  }
  export type listInt = SelectionSet.NoArgsIndicator
  export type listIntNonNull = SelectionSet.NoArgsIndicator
  export type listListInt = SelectionSet.NoArgsIndicator
  export type listListIntNonNull = SelectionSet.NoArgsIndicator
  export interface lowerCaseUnion extends __lowerCaseUnion {}
  export interface $object extends __Object1 {}
  export interface objectList extends __Object1 {}
  export interface objectListNonNull extends __Object1 {}
  export interface objectNested extends __ObjectNested {}
  export interface objectNonNull extends __Object1 {}
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
  export interface result extends __Result {
    /**
     * Arguments for `result` field.
     * All arguments are required so you must include this.
     */
    $: {
      case: Case
    }
  }
  export interface resultNonNull extends __Result {
    /**
     * Arguments for `resultNonNull` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      case?: Case | undefined | null
    }
  }
  export type $string = SelectionSet.NoArgsIndicator
  export type stringWithArgEnum = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `stringWithArgEnum` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      ABCEnum?: ABCEnum | undefined | null
    }
  }
  export type stringWithArgInputObject = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `stringWithArgInputObject` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      input?: InputObject | undefined | null
    }
  }
  export interface stringWithArgInputObjectRequired extends SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithArgInputObjectRequired` field.
     * All arguments are required so you must include this.
     */
    $: {
      input: InputObject
    }
  }
  export type stringWithArgs = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
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
  export type stringWithListArg = SelectionSet.ClientIndicator | SelectionSet.Bases.Base | {
    /**
     * Arguments for `stringWithListArg` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      ints?: Array<number | undefined | null> | undefined | null
    }
  }
  export interface stringWithListArgRequired extends SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithListArgRequired` field.
     * All arguments are required so you must include this.
     */
    $: {
      ints: Array<number | undefined | null>
    }
  }
  export interface stringWithRequiredArg extends SelectionSet.Bases.Base {
    /**
     * Arguments for `stringWithRequiredArg` field.
     * All arguments are required so you must include this.
     */
    $: {
      string: string
    }
  }
  export interface unionFooBar extends __FooBarUnion {}
  export interface unionFooBarNonNull extends __FooBarUnion {}
  export interface unionFooBarWithArgs extends __FooBarUnion {
    /**
     * Arguments for `unionFooBarWithArgs` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      id?: string | undefined | null
    }
  }
  export interface unionObject extends __ObjectUnion {}
  export interface unionObjectNonNull extends __ObjectUnion {}
}

type __Query = Query // [1]

//
//
// ---------------------
// GraphQLEnumType Types
// ---------------------
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
// ----------------------------
// GraphQLInputObjectType Types
// ----------------------------
//
//

export interface InputObject {
  date?: undefined | undefined | null
  dateRequired: undefined
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
// --------------------------
// GraphQLInterfaceType Types
// --------------------------
//
//

export interface DateInterface1 extends SelectionSet.Bases.ObjectLike {
  date1?: DateInterface1.date1 | [alias: string, DateInterface1.date1] | [alias: string, DateInterface1.date1][]
  onDateObject1?: DateObject1 | [alias: string, DateObject1] | [alias: string, DateObject1][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace DateInterface1 {
  export type date1 = SelectionSet.NoArgsIndicator
}

type __DateInterface1 = DateInterface1 // [1]

export interface Error extends SelectionSet.Bases.ObjectLike {
  message?: Error.message | [alias: string, Error.message] | [alias: string, Error.message][]
  onErrorOne?: ErrorOne | [alias: string, ErrorOne] | [alias: string, ErrorOne][]
  onErrorTwo?: ErrorTwo | [alias: string, ErrorTwo] | [alias: string, ErrorTwo][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Error {
  export type message = SelectionSet.NoArgsIndicator
}

type __Error = Error // [1]

export interface Interface extends SelectionSet.Bases.ObjectLike {
  id?: Interface.id | [alias: string, Interface.id] | [alias: string, Interface.id][]
  onObject1ImplementingInterface?: Object1ImplementingInterface | [alias: string, Object1ImplementingInterface] | [
    alias: string,
    Object1ImplementingInterface,
  ][]
  onObject2ImplementingInterface?: Object2ImplementingInterface | [alias: string, Object2ImplementingInterface] | [
    alias: string,
    Object2ImplementingInterface,
  ][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Interface {
  export type id = SelectionSet.NoArgsIndicator
}

type __Interface = Interface // [1]

//
//
// -----------------------
// GraphQLObjectType Types
// -----------------------
//
//

export interface Bar extends SelectionSet.Bases.ObjectLike {
  int?: Bar.int | [alias: string, Bar.int] | [alias: string, Bar.int][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Bar {
  export type int = SelectionSet.NoArgsIndicator
}

type __Bar = Bar // [1]

export interface DateObject1 extends SelectionSet.Bases.ObjectLike {
  date1?: DateObject1.date1 | [alias: string, DateObject1.date1] | [alias: string, DateObject1.date1][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace DateObject1 {
  export type date1 = SelectionSet.NoArgsIndicator
}

type __DateObject1 = DateObject1 // [1]

export interface DateObject2 extends SelectionSet.Bases.ObjectLike {
  date2?: DateObject2.date2 | [alias: string, DateObject2.date2] | [alias: string, DateObject2.date2][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace DateObject2 {
  export type date2 = SelectionSet.NoArgsIndicator
}

type __DateObject2 = DateObject2 // [1]

export interface ErrorOne extends SelectionSet.Bases.ObjectLike {
  infoId?: ErrorOne.infoId | [alias: string, ErrorOne.infoId] | [alias: string, ErrorOne.infoId][]
  message?: ErrorOne.message | [alias: string, ErrorOne.message] | [alias: string, ErrorOne.message][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace ErrorOne {
  export type infoId = SelectionSet.NoArgsIndicator
  export type message = SelectionSet.NoArgsIndicator
}

type __ErrorOne = ErrorOne // [1]

export interface ErrorTwo extends SelectionSet.Bases.ObjectLike {
  infoInt?: ErrorTwo.infoInt | [alias: string, ErrorTwo.infoInt] | [alias: string, ErrorTwo.infoInt][]
  message?: ErrorTwo.message | [alias: string, ErrorTwo.message] | [alias: string, ErrorTwo.message][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace ErrorTwo {
  export type infoInt = SelectionSet.NoArgsIndicator
  export type message = SelectionSet.NoArgsIndicator
}

type __ErrorTwo = ErrorTwo // [1]

/**
 * Object documentation.
 */
export interface Foo extends SelectionSet.Bases.ObjectLike {
  id?: Foo.id | [alias: string, Foo.id] | [alias: string, Foo.id][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Foo {
  export type id = SelectionSet.NoArgsIndicator
}

type __Foo = Foo // [1]

export interface Object1 extends SelectionSet.Bases.ObjectLike {
  boolean?: Object1.$boolean | [alias: string, Object1.$boolean] | [alias: string, Object1.$boolean][]
  float?: Object1.float | [alias: string, Object1.float] | [alias: string, Object1.float][]
  id?: Object1.id | [alias: string, Object1.id] | [alias: string, Object1.id][]
  int?: Object1.int | [alias: string, Object1.int] | [alias: string, Object1.int][]
  string?: Object1.$string | [alias: string, Object1.$string] | [alias: string, Object1.$string][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Object1 {
  export type $boolean = SelectionSet.NoArgsIndicator
  export type float = SelectionSet.NoArgsIndicator
  export type id = SelectionSet.NoArgsIndicator
  export type int = SelectionSet.NoArgsIndicator
  export type $string = SelectionSet.NoArgsIndicator
}

type __Object1 = Object1 // [1]

export interface Object1ImplementingInterface extends SelectionSet.Bases.ObjectLike {
  id?: Object1ImplementingInterface.id | [alias: string, Object1ImplementingInterface.id] | [
    alias: string,
    Object1ImplementingInterface.id,
  ][]
  int?: Object1ImplementingInterface.int | [alias: string, Object1ImplementingInterface.int] | [
    alias: string,
    Object1ImplementingInterface.int,
  ][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Object1ImplementingInterface {
  export type id = SelectionSet.NoArgsIndicator
  export type int = SelectionSet.NoArgsIndicator
}

type __Object1ImplementingInterface = Object1ImplementingInterface // [1]

export interface Object2ImplementingInterface extends SelectionSet.Bases.ObjectLike {
  boolean?: Object2ImplementingInterface.$boolean | [alias: string, Object2ImplementingInterface.$boolean] | [
    alias: string,
    Object2ImplementingInterface.$boolean,
  ][]
  id?: Object2ImplementingInterface.id | [alias: string, Object2ImplementingInterface.id] | [
    alias: string,
    Object2ImplementingInterface.id,
  ][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace Object2ImplementingInterface {
  export type $boolean = SelectionSet.NoArgsIndicator
  export type id = SelectionSet.NoArgsIndicator
}

type __Object2ImplementingInterface = Object2ImplementingInterface // [1]

export interface ObjectNested extends SelectionSet.Bases.ObjectLike {
  id?: ObjectNested.id | [alias: string, ObjectNested.id] | [alias: string, ObjectNested.id][]
  object?: ObjectNested.$object | [alias: string, ObjectNested.$object] | [alias: string, ObjectNested.$object][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace ObjectNested {
  export type id = SelectionSet.NoArgsIndicator
  export interface $object extends __Object1 {}
}

type __ObjectNested = ObjectNested // [1]

export interface ObjectUnion extends SelectionSet.Bases.ObjectLike {
  fooBarUnion?: ObjectUnion.fooBarUnion | [alias: string, ObjectUnion.fooBarUnion] | [
    alias: string,
    ObjectUnion.fooBarUnion,
  ][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace ObjectUnion {
  export interface fooBarUnion extends __FooBarUnion {}
}

type __ObjectUnion = ObjectUnion // [1]

export interface lowerCaseObject extends SelectionSet.Bases.ObjectLike {
  id?: lowerCaseObject.id | [alias: string, lowerCaseObject.id] | [alias: string, lowerCaseObject.id][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace lowerCaseObject {
  export type id = SelectionSet.NoArgsIndicator
}

type __lowerCaseObject = lowerCaseObject // [1]

export interface lowerCaseObject2 extends SelectionSet.Bases.ObjectLike {
  int?: lowerCaseObject2.int | [alias: string, lowerCaseObject2.int] | [alias: string, lowerCaseObject2.int][]

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

export namespace lowerCaseObject2 {
  export type int = SelectionSet.NoArgsIndicator
}

type __lowerCaseObject2 = lowerCaseObject2 // [1]

//
//
// ----------------------
// GraphQLUnionType Types
// ----------------------
//
//

export interface DateUnion {
  onDateObject1?: DateObject1
  onDateObject2?: DateObject2

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

type __DateUnion = DateUnion // [1]

/**
 * Union documentation.
 */
export interface FooBarUnion {
  onBar?: Bar
  onFoo?: Foo

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

type __FooBarUnion = FooBarUnion // [1]

export interface Result {
  onErrorOne?: ErrorOne
  onErrorTwo?: ErrorTwo
  onObject1?: Object1

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

type __Result = Result // [1]

export interface lowerCaseUnion {
  onlowerCaseObject?: lowerCaseObject
  onlowerCaseObject2?: lowerCaseObject2

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

  __typename?: SelectionSet.NoArgsIndicator | [alias: string, SelectionSet.NoArgsIndicator] | [
    alias: string,
    SelectionSet.NoArgsIndicator,
  ][]
}

type __lowerCaseUnion = lowerCaseUnion // [1]
