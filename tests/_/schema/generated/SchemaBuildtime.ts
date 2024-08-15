import type * as $ from '../../../../src/entrypoints/graffle/schema.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Mutation = $.Object$2<'Mutation', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<$Scalar.ID, null>
  }>

  export type Query = $.Object$2<'Query', {
    InputObjectNested: $.Field<
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: $.Input.Nullable<InputObject.InputObjectNested>
      }>
    >
    InputObjectNestedNonNull: $.Field<
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: InputObject.InputObjectNestedNonNull
      }>
    >
    /**
     * Query enum field documentation.
     */
    abcEnum: $.Field<$.Output.Nullable<Enum.ABCEnum>, null>
    date: $.Field<$.Output.Nullable<$Scalar.Date>, null>
    dateArg: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Nullable<$Scalar.Date>
      }>
    >
    dateArgInputObject: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        input: $.Input.Nullable<InputObject.InputObject>
      }>
    >
    dateArgList: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Nullable<$.Input.List<$Scalar.Date>>
      }>
    >
    dateArgNonNull: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $Scalar.Date
      }>
    >
    dateArgNonNullList: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.List<$.Input.Nullable<$Scalar.Date>>
      }>
    >
    dateArgNonNullListNonNull: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.List<$Scalar.Date>
      }>
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
        case: $.Input.Nullable<$Scalar.String>
      }>
    >
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<$Scalar.ID, null>
    interface: $.Field<$.Output.Nullable<Interface.Interface>, null>
    interfaceNonNull: $.Field<Interface.Interface, null>
    interfaceWithArgs: $.Field<
      $.Output.Nullable<Interface.Interface>,
      $.Args<{
        id: $Scalar.ID
      }>
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
        boolean: $.Input.Nullable<$Scalar.Boolean>
        float: $.Input.Nullable<$Scalar.Float>
        id: $.Input.Nullable<$Scalar.ID>
        int: $.Input.Nullable<$Scalar.Int>
        string: $.Input.Nullable<$Scalar.String>
      }>
    >
    result: $.Field<
      $.Output.Nullable<Union.Result>,
      $.Args<{
        case: Enum.Case
      }>
    >
    resultNonNull: $.Field<
      Union.Result,
      $.Args<{
        case: $.Input.Nullable<Enum.Case>
      }>
    >
    string: $.Field<$.Output.Nullable<$Scalar.String>, null>
    stringWithArgEnum: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ABCEnum: $.Input.Nullable<Enum.ABCEnum>
      }>
    >
    stringWithArgInputObject: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: $.Input.Nullable<InputObject.InputObject>
      }>
    >
    stringWithArgInputObjectRequired: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: InputObject.InputObject
      }>
    >
    stringWithArgs: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        boolean: $.Input.Nullable<$Scalar.Boolean>
        float: $.Input.Nullable<$Scalar.Float>
        id: $.Input.Nullable<$Scalar.ID>
        int: $.Input.Nullable<$Scalar.Int>
        string: $.Input.Nullable<$Scalar.String>
      }>
    >
    stringWithListArg: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ints: $.Input.Nullable<$.Input.List<$.Input.Nullable<$Scalar.Int>>>
      }>
    >
    stringWithListArgRequired: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ints: $.Input.List<$Scalar.Int>
      }>
    >
    stringWithRequiredArg: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        string: $Scalar.String
      }>
    >
    unionFooBar: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
    unionFooBarNonNull: $.Field<Union.FooBarUnion, null>
    unionFooBarWithArgs: $.Field<
      $.Output.Nullable<Union.FooBarUnion>,
      $.Args<{
        id: $.Input.Nullable<$Scalar.ID>
      }>
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
    date: $.Input.Nullable<$Scalar.Date>
    dateRequired: $Scalar.Date
    id: $.Input.Nullable<$Scalar.ID>
    idRequired: $Scalar.ID
  }>

  export type InputObjectNested = $.InputObject<'InputObjectNested', {
    InputObject: $.Input.Nullable<InputObject.InputObject>
  }>

  export type InputObjectNestedNonNull = $.InputObject<'InputObjectNestedNonNull', {
    InputObject: InputObject.InputObject
  }>
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
