import type * as $ from '../../../../../src/Schema/__.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Query = $.Object$2<'Query', {
    date: $.Field<$.Output.Nullable<$Scalar.Date>, null>
    dateNonNull: $.Field<$Scalar.Date, null>
    dateList: $.Field<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Date>>>, null>
    dateObject1: $.Field<$.Output.Nullable<Object.DateObject1>, null>
    dateUnion: $.Field<$.Output.Nullable<Union.DateUnion>, null>
    dateInterface1: $.Field<$.Output.Nullable<Interface.DateInterface1>, null>
    dateListNonNull: $.Field<$.Output.List<$Scalar.Date>, null>
    dateArg: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Nullable<$Scalar.Date>
      }>
    >
    dateArgNonNull: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $Scalar.Date
      }>
    >
    dateArgList: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Nullable<$.Input.List<$.Input.Nullable<$Scalar.Date>>>
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
    dateArgInputObject: $.Field<
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        input: $.Input.Nullable<InputObject.InputObject>
      }>
    >
    InputObjectNested: $.Field<
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: $.Input.Nullable<InputObject.InputObjectNested>
      }>
    >
    InputObjectNestedNonNull: $.Field<
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: InputObject.InputObjectNested
      }>
    >
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<$Scalar.ID, null>
    string: $.Field<$.Output.Nullable<$Scalar.String>, null>
    stringWithRequiredArg: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        string: $Scalar.String
      }>
    >
    stringWithArgs: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        string: $.Input.Nullable<$Scalar.String>
        int: $.Input.Nullable<$Scalar.Int>
        float: $.Input.Nullable<$Scalar.Float>
        boolean: $.Input.Nullable<$Scalar.Boolean>
        id: $.Input.Nullable<$Scalar.ID>
      }>
    >
    stringWithArgEnum: $.Field<
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ABCEnum: $.Input.Nullable<Enum.ABCEnum>
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
        ints: $.Input.List<$.Input.Nullable<$Scalar.Int>>
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
    listListIntNonNull: $.Field<$.Output.List<$.Output.List<$Scalar.Int>>, null>
    listListInt: $.Field<
      $.Output.Nullable<$.Output.List<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>>>,
      null
    >
    listInt: $.Field<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>, null>
    listIntNonNull: $.Field<$.Output.List<$Scalar.Int>, null>
    object: $.Field<$.Output.Nullable<Object.Object1>, null>
    objectNonNull: $.Field<Object.Object1, null>
    objectNested: $.Field<$.Output.Nullable<Object.ObjectNested>, null>
    objectWithArgs: $.Field<
      $.Output.Nullable<Object.Object1>,
      $.Args<{
        string: $.Input.Nullable<$Scalar.String>
        int: $.Input.Nullable<$Scalar.Int>
        float: $.Input.Nullable<$Scalar.Float>
        boolean: $.Input.Nullable<$Scalar.Boolean>
        id: $.Input.Nullable<$Scalar.ID>
      }>
    >
    fooBarUnion: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
    objectList: $.Field<$.Output.Nullable<$.Output.List<$.Output.Nullable<Object.Object1>>>, null>
    objectListNonNull: $.Field<$.Output.List<Object.Object1>, null>
    /**
     * Query enum field documentation.
     */
    abcEnum: $.Field<$.Output.Nullable<Enum.ABCEnum>, null>
    lowerCaseUnion: $.Field<$.Output.Nullable<Union.lowerCaseUnion>, null>
    interface: $.Field<$.Output.Nullable<Interface.Interface>, null>
    interfaceWithArgs: $.Field<
      $.Output.Nullable<Interface.Interface>,
      $.Args<{
        id: $Scalar.ID
      }>
    >
    interfaceNonNull: $.Field<Interface.Interface, null>
    unionFooBar: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
    unionFooBarWithArgs: $.Field<
      $.Output.Nullable<Union.FooBarUnion>,
      $.Args<{
        id: $.Input.Nullable<$Scalar.ID>
      }>
    >
    unionObject: $.Field<$.Output.Nullable<Object.ObjectUnion>, null>
    unionFooBarNonNull: $.Field<Union.FooBarUnion, null>
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
   * "C" - Enum C member documentation. (DEPRECATED: Enum value C is deprecated.)
   */
  export type ABCEnum = $.Enum<'ABCEnum', ['A', 'B', 'C']>
}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
  export type InputObjectNested = $.InputObject<'InputObjectNested', {
    InputObject: $.Input.Nullable<InputObject.InputObject>
  }>

  export type InputObjectNestedNonNull = $.InputObject<'InputObjectNestedNonNull', {
    InputObject: InputObject.InputObject
  }>

  export type InputObject = $.InputObject<'InputObject', {
    id: $.Input.Nullable<$Scalar.ID>
    idRequired: $Scalar.ID
    date: $.Input.Nullable<$Scalar.Date>
    dateRequired: $Scalar.Date
  }>
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
  export type DateInterface1 = $.Interface<'DateInterface1', {
    date1: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }, [Object.DateObject1]>

  export type Interface = $.Interface<'Interface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }, [Object.Object1ImplementingInterface, Object.Object2ImplementingInterface]>
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  export type DateObject1 = $.Object$2<'DateObject1', {
    date1: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }>

  export type DateObject2 = $.Object$2<'DateObject2', {
    date2: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }>

  export type ObjectUnion = $.Object$2<'ObjectUnion', {
    fooBarUnion: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
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

  export type Bar = $.Object$2<'Bar', {
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
  }>

  export type ObjectNested = $.Object$2<'ObjectNested', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    object: $.Field<$.Output.Nullable<Object.Object1>, null>
  }>

  export type lowerCaseObject = $.Object$2<'lowerCaseObject', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }>

  export type lowerCaseObject2 = $.Object$2<'lowerCaseObject2', {
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
  }>

  export type Object1 = $.Object$2<'Object1', {
    string: $.Field<$.Output.Nullable<$Scalar.String>, null>
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
    float: $.Field<$.Output.Nullable<$Scalar.Float>, null>
    boolean: $.Field<$.Output.Nullable<$Scalar.Boolean>, null>
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
  }>

  export type Object1ImplementingInterface = $.Object$2<'Object1ImplementingInterface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    int: $.Field<$.Output.Nullable<$Scalar.Int>, null>
  }>

  export type Object2ImplementingInterface = $.Object$2<'Object2ImplementingInterface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    boolean: $.Field<$.Output.Nullable<$Scalar.Boolean>, null>
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
  export type FooBarUnion = $.Union<'FooBarUnion', [Object.Foo, Object.Bar]>

  export type lowerCaseUnion = $.Union<'lowerCaseUnion', [Object.lowerCaseObject, Object.lowerCaseObject2]>
}
