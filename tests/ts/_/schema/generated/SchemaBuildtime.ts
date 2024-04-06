import type * as $ from '../../../../../src/Schema/__.js'
import type * as $Scalar from './Scalar.ts'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Query = $.Object<'Query', {
    date: $.Field<$.Output.Nullable<$Scalar.Date>>
    dateNonNull: $.Field<$Scalar.Date>
    dateList: $.Field<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Date>>>>
    dateObject1: $.Field<$.Output.Nullable<Object.DateObject1>>
    dateUnion: $.Field<$.Output.Nullable<Union.DateUnion>>
    dateInterface1: $.Field<$.Output.Nullable<Interface.DateInterface1>>
    dateListNonNull: $.Field<$.Output.List<$Scalar.Date>>
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
    interface: $.Field<$.Output.Nullable<Interface.Interface>>
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
    idNonNull: $.Field<$Scalar.ID>
    string: $.Field<$.Output.Nullable<$Scalar.String>>
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
    listListIntNonNull: $.Field<$.Output.List<$.Output.List<$Scalar.Int>>>
    listListInt: $.Field<
      $.Output.Nullable<$.Output.List<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>>>
    >
    listInt: $.Field<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>>
    listIntNonNull: $.Field<$.Output.List<$Scalar.Int>>
    object: $.Field<$.Output.Nullable<Object.Object1>>
    objectNonNull: $.Field<Object.Object1>
    objectNested: $.Field<$.Output.Nullable<Object.ObjectNested>>
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
    fooBarUnion: $.Field<$.Output.Nullable<Union.FooBarUnion>>
    /**
     * Query enum field documentation.
     */
    abcEnum: $.Field<$.Output.Nullable<Enum.ABCEnum>>
    lowerCaseUnion: $.Field<$.Output.Nullable<Union.lowerCaseUnion>>
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
    date1: $.Field<$.Output.Nullable<$Scalar.Date>>
  }, [Object.DateObject1]>

  export type Interface = $.Interface<'Interface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
  }, [Object.Object1ImplementingInterface, Object.Object2ImplementingInterface]>
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  export type DateObject1 = $.Object<'DateObject1', {
    date1: $.Field<$.Output.Nullable<$Scalar.Date>>
  }>

  export type DateObject2 = $.Object<'DateObject2', {
    date2: $.Field<$.Output.Nullable<$Scalar.Date>>
  }>

  /**
   * Object documentation.
   */
  export type Foo = $.Object<'Foo', {
    /**
     * Field documentation.
     *
     * @deprecated Field a is deprecated.
     */
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
  }>

  export type Bar = $.Object<'Bar', {
    int: $.Field<$.Output.Nullable<$Scalar.Int>>
  }>

  export type ObjectNested = $.Object<'ObjectNested', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
    object: $.Field<$.Output.Nullable<Object.Object1>>
  }>

  export type lowerCaseObject = $.Object<'lowerCaseObject', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
  }>

  export type lowerCaseObject2 = $.Object<'lowerCaseObject2', {
    int: $.Field<$.Output.Nullable<$Scalar.Int>>
  }>

  export type Object1 = $.Object<'Object1', {
    string: $.Field<$.Output.Nullable<$Scalar.String>>
    int: $.Field<$.Output.Nullable<$Scalar.Int>>
    float: $.Field<$.Output.Nullable<$Scalar.Float>>
    boolean: $.Field<$.Output.Nullable<$Scalar.Boolean>>
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
  }>

  export type Object1ImplementingInterface = $.Object<'Object1ImplementingInterface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
    int: $.Field<$.Output.Nullable<$Scalar.Int>>
  }>

  export type Object2ImplementingInterface = $.Object<'Object2ImplementingInterface', {
    id: $.Field<$.Output.Nullable<$Scalar.ID>>
    boolean: $.Field<$.Output.Nullable<$Scalar.Boolean>>
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
