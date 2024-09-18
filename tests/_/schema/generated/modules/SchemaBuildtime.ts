import type * as $ from '../../../../../src/entrypoints/schema.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Mutation = $.Output.ObjectMutation<{
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<$Scalar.ID, null>
  }>

  export type Query = $.Output.ObjectQuery<{
    InputObjectNested: $.Field<
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObjectNested>>
      }, true>
    >
    InputObjectNestedNonNull: $.Field<
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: $.Input.Field<InputObject.InputObjectNestedNonNull>
      }, false>
    >
    /**
     * Query enum field documentation.
     */
    abcEnum: $.Field<$.Output.Nullable<Enum.ABCEnum>, null>
    date: $.Field<$.Output.Nullable<$Scalar.Date>, null>
    dateArg: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.Nullable<$Scalar.Date>>
      }, true>
    >
    dateArgInputObject: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObject>>
      }, true>
    >
    dateArgList: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.Nullable<$.Input.List<$Scalar.Date>>>
      }, true>
    >
    dateArgNonNull: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$Scalar.Date>
      }, false>
    >
    dateArgNonNullList: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.List<$.Input.Nullable<$Scalar.Date>>>
      }, false>
    >
    dateArgNonNullListNonNull: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.List<$Scalar.Date>>
      }, false>
    >
    dateInterface1: $.Field<$.Output.Nullable<Interface.DateInterface1>, null>
    dateList: $.Field<$.Output.Nullable<$.Output.List<$Scalar.Date>>, null>
    dateListNonNull: $.Field<$.Output.List<$Scalar.Date>, null>
    dateNonNull: $.Field<$Scalar.Date, null>
    dateObject1: $.Field<$.Output.Nullable<Object.DateObject1>, null>
    dateUnion: $.Field<$.Output.Nullable<Union.DateUnion>, null>
    error: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        case: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
    >
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<$Scalar.ID, null>
    interface: $.Field<$.Output.Nullable<Interface.Interface>, null>
    interfaceNonNull: $.Field<Interface.Interface, null>
    interfaceWithArgs: $.Field<
      $.Output.Nullable<Interface.Interface>,
      $.Args<{
        id: $.Input.Field<$Scalar.ID>
      }, false>
    >
    listInt: $.Field<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>, null>
    listIntNonNull: $.Field<$.Output.List<$Scalar.Int>, null>
    listListInt: $.Field<
      $.Output.Nullable<$.Output.List<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>>>,
      null
    >
    listListIntNonNull: $.Field<$.Output.List<$.Output.List<$Scalar.Int>>, null>
    lowerCaseUnion: $.Field<$.Output.Nullable<Union.lowerCaseUnion>, null>
    object: $.Field<$.Output.Nullable<Object.Object1>, null>
    objectList: $.Field<$.Output.Nullable<$.Output.List<Object.Object1>>, null>
    objectListNonNull: $.Field<$.Output.List<Object.Object1>, null>
    objectNested: $.Field<$.Output.Nullable<Object.ObjectNested>, null>
    objectNonNull: $.Field<Object.Object1, null>
    objectWithArgs: $.Field<
      $.Output.Nullable<Object.Object1>,
      $.Args<{
        boolean: $.Input.Field<$.Input.Nullable<$Scalar.Boolean>>
        float: $.Input.Field<$.Input.Nullable<$Scalar.Float>>
        id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
        int: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        string: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
    >
    result: $.Field<
      $.Output.Nullable<Union.Result>,
      $.Args<{
        case: $.Input.Field<Enum.Case>
      }, false>
    >
    resultNonNull: $.Field<
      Union.Result,
      $.Args<{
        case: $.Input.Field<$.Input.Nullable<Enum.Case>>
      }, true>
    >
    string: $.Field<$.Output.Nullable<$Scalar.String>, null>
    stringWithArgEnum: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ABCEnum: $.Input.Field<$.Input.Nullable<Enum.ABCEnum>>
      }, true>
    >
    stringWithArgInputObject: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObject>>
      }, true>
    >
    stringWithArgInputObjectRequired: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: $.Input.Field<InputObject.InputObject>
      }, false>
    >
    stringWithArgs: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        boolean: $.Input.Field<$.Input.Nullable<$Scalar.Boolean>>
        float: $.Input.Field<$.Input.Nullable<$Scalar.Float>>
        id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
        int: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        string: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
    >
    stringWithListArg: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ints: $.Input.Field<$.Input.Nullable<$.Input.List<$.Input.Nullable<$Scalar.Int>>>>
      }, true>
    >
    stringWithListArgRequired: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ints: $.Input.Field<$.Input.List<$Scalar.Int>>
      }, false>
    >
    stringWithRequiredArg: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        string: $.Input.Field<$Scalar.String>
      }, false>
    >
    unionFooBar: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
    unionFooBarNonNull: $.Field<Union.FooBarUnion, null>
    unionFooBarWithArgs: $.Field<
      $.Output.Nullable<Union.FooBarUnion>,
      $.Args<{
        id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
      }, true>
    >
    unionObject: $.Field<$.Output.Nullable<Object.ObjectUnion>, null>
    unionObjectNonNull: $.Field<Object.ObjectUnion, null>
  }>
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
  /**
   * Enum documentation.
   *
   * Members
   * "A" - (DEPRECATED: Enum value A is deprecated.)
   * "B" - Enum B member documentation.
   * "C" - (DEPRECATED: Enum value C is deprecated.)
   */
  export type ABCEnum = $.Enum<'ABCEnum', ['A', 'B', 'C']>

  export type Case = $.Enum<'Case', ['ErrorOne', 'ErrorTwo', 'Object1']>
}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
  export type InputObject = $.InputObject<'InputObject', {
    date: $.Input.Field<$.Input.Nullable<$Scalar.Date>>
    dateRequired: $.Input.Field<$Scalar.Date>
    id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
    idRequired: $.Input.Field<$Scalar.ID>
  }, true>

  export type InputObjectNested = $.InputObject<'InputObjectNested', {
    InputObject: $.Input.Field<$.Input.Nullable<InputObject.InputObject>>
  }, true>

  export type InputObjectNestedNonNull = $.InputObject<'InputObjectNestedNonNull', {
    InputObject: $.Input.Field<InputObject.InputObject>
  }, false>
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
  export type DateInterface1 = $.Interface<'DateInterface1', {
    date1: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }, [Object.DateObject1]>

  export type Error = $.Interface<'Error', {
    message: $.Field<$Scalar.String, null>
  }, [Object.ErrorOne, Object.ErrorTwo]>

  export type Interface = $.Interface<'Interface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }, [Object.Object1ImplementingInterface, Object.Object2ImplementingInterface]>
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  export type Bar = $.Object$2<'Bar', {
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
  }>

  export type DateObject1 = $.Object$2<'DateObject1', {
    date1: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }>

  export type DateObject2 = $.Object$2<'DateObject2', {
    date2: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }>

  export type ErrorOne = $.Object$2<'ErrorOne', {
    infoId: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    message: $.Field<$Scalar.String, null>
  }>

  export type ErrorTwo = $.Object$2<'ErrorTwo', {
    infoInt: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    message: $.Field<$Scalar.String, null>
  }>

  /**
   * Object documentation.
   */
  export type Foo = $.Object$2<'Foo', {
    /**
     * Field documentation.
     *
     * @deprecated Field a is deprecated.
     */
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }>

  export type Object1 = $.Object$2<'Object1', {
    boolean: $.Field<$.Output.Nullable<$Scalar.Boolean>, null>
    float: $.Field<$.Output.Nullable<$Scalar.Float>, null>
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    string: $.Field<$.Output.Nullable<$Scalar.String>, null>
  }>

  export type Object1ImplementingInterface = $.Object$2<'Object1ImplementingInterface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
  }>

  export type Object2ImplementingInterface = $.Object$2<'Object2ImplementingInterface', {
    boolean: $.Field<$.Output.Nullable<$Scalar.Boolean>, null>
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }>

  export type ObjectNested = $.Object$2<'ObjectNested', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    object: $.Field<$.Output.Nullable<Object.Object1>, null>
  }>

  export type ObjectUnion = $.Object$2<'ObjectUnion', {
    fooBarUnion: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
  }>

  export type lowerCaseObject = $.Object$2<'lowerCaseObject', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }>

  export type lowerCaseObject2 = $.Object$2<'lowerCaseObject2', {
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
  }>
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  export type DateUnion = $.Union<'DateUnion', [Object.DateObject1, Object.DateObject2]>

  /**
   * Union documentation.
   */
  export type FooBarUnion = $.Union<'FooBarUnion', [Object.Bar, Object.Foo]>

  export type Result = $.Union<'Result', [Object.ErrorOne, Object.ErrorTwo, Object.Object1]>

  export type lowerCaseUnion = $.Union<'lowerCaseUnion', [Object.lowerCaseObject, Object.lowerCaseObject2]>
}
