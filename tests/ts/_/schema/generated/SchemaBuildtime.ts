import type * as _ from '../../../../../src/Schema/NamedType/Scalar/Scalar.js'
import type * as $Scalar from './Scalar.ts'

export namespace $ {
  export interface Index {
    Root: {
      Query: Root.Query
      Mutation: null
      Subscription: null
    }
    objects: {
      Foo: Object.Foo
      Bar: Object.Bar
      ObjectNested: Object.ObjectNested
      lowerCaseObject: Object.lowerCaseObject
      lowerCaseObject2: Object.lowerCaseObject2
      Object1: Object.Object1
      Object1ImplementingInterface: Object.Object1ImplementingInterface
      Object2ImplementingInterface: Object.Object2ImplementingInterface
    }
    unions: {
      FooBarUnion: Union.FooBarUnion
      lowerCaseUnion: Union.lowerCaseUnion
    }
  }
}

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export type Query = _.Object<'Query', {
    date: _.Field<_.Output.Nullable<$Scalar.Date>>
    interface: _.Field<_.Output.Nullable<Interface.Interface>>
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
    idNonNull: _.Field<$Scalar.ID>
    string: _.Field<_.Output.Nullable<$Scalar.String>>
    stringWithRequiredArg: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        string: $Scalar.String
      }>
    >
    stringWithArgs: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        string: _.Input.Nullable<$Scalar.String>
        int: _.Input.Nullable<$Scalar.Int>
        float: _.Input.Nullable<$Scalar.Float>
        boolean: _.Input.Nullable<$Scalar.Boolean>
        id: _.Input.Nullable<$Scalar.ID>
      }>
    >
    stringWithArgEnum: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        ABCEnum: _.Input.Nullable<Enum.ABCEnum>
      }>
    >
    stringWithListArg: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        ints: _.Input.Nullable<_.Input.List<_.Input.Nullable<$Scalar.Int>>>
      }>
    >
    stringWithListArgRequired: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        ints: _.Input.List<_.Input.Nullable<$Scalar.Int>>
      }>
    >
    stringWithArgInputObject: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        input: _.Input.Nullable<InputObject.InputObject>
      }>
    >
    stringWithArgInputObjectRequired: _.Field<
      _.Output.Nullable<$Scalar.String>,
      _.Args<{
        input: InputObject.InputObject
      }>
    >
    listListIntNonNull: _.Field<_.Output.List<_.Output.List<$Scalar.Int>>>
    listListInt: _.Field<
      _.Output.Nullable<_.Output.List<_.Output.Nullable<_.Output.List<_.Output.Nullable<$Scalar.Int>>>>>
    >
    listInt: _.Field<_.Output.Nullable<_.Output.List<_.Output.Nullable<$Scalar.Int>>>>
    listIntNonNull: _.Field<_.Output.List<$Scalar.Int>>
    object: _.Field<_.Output.Nullable<Object.Object1>>
    objectNonNull: _.Field<Object.Object1>
    objectNested: _.Field<_.Output.Nullable<Object.ObjectNested>>
    objectWithArgs: _.Field<
      _.Output.Nullable<Object.Object1>,
      _.Args<{
        string: _.Input.Nullable<$Scalar.String>
        int: _.Input.Nullable<$Scalar.Int>
        float: _.Input.Nullable<$Scalar.Float>
        boolean: _.Input.Nullable<$Scalar.Boolean>
        id: _.Input.Nullable<$Scalar.ID>
      }>
    >
    fooBarUnion: _.Field<_.Output.Nullable<Union.FooBarUnion>>
    /**
     * Query enum field documentation.
     */
    abcEnum: _.Field<_.Output.Nullable<Enum.ABCEnum>>
    lowerCaseUnion: _.Field<_.Output.Nullable<Union.lowerCaseUnion>>
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
  export type ABCEnum = _.Enum<'ABCEnum', ['A', 'B', 'C']>
}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
  export type InputObject = _.InputObject<'InputObject', {
    id: _.Input.Nullable<$Scalar.ID>
    idRequired: $Scalar.ID
  }>
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
  export type Interface = _.Interface<'Interface', {
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
  }, [Object.Object1ImplementingInterface, Object.Object2ImplementingInterface]>
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  /**
   * Object documentation.
   */
  export type Foo = _.Object<'Foo', {
    /**
     * Field documentation.
     *
     * @deprecated Field a is deprecated.
     */
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
  }>

  export type Bar = _.Object<'Bar', {
    int: _.Field<_.Output.Nullable<$Scalar.Int>>
  }>

  export type ObjectNested = _.Object<'ObjectNested', {
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
    object: _.Field<_.Output.Nullable<Object.Object1>>
  }>

  export type lowerCaseObject = _.Object<'lowerCaseObject', {
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
  }>

  export type lowerCaseObject2 = _.Object<'lowerCaseObject2', {
    int: _.Field<_.Output.Nullable<$Scalar.Int>>
  }>

  export type Object1 = _.Object<'Object1', {
    string: _.Field<_.Output.Nullable<$Scalar.String>>
    int: _.Field<_.Output.Nullable<$Scalar.Int>>
    float: _.Field<_.Output.Nullable<$Scalar.Float>>
    boolean: _.Field<_.Output.Nullable<$Scalar.Boolean>>
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
  }>

  export type Object1ImplementingInterface = _.Object<'Object1ImplementingInterface', {
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
    int: _.Field<_.Output.Nullable<$Scalar.Int>>
  }>

  export type Object2ImplementingInterface = _.Object<'Object2ImplementingInterface', {
    id: _.Field<_.Output.Nullable<$Scalar.ID>>
    boolean: _.Field<_.Output.Nullable<$Scalar.Boolean>>
  }>
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  /**
   * Union documentation.
   */
  export type FooBarUnion = _.Union<'FooBarUnion', [Object.Foo, Object.Bar]>

  export type lowerCaseUnion = _.Union<'lowerCaseUnion', [Object.lowerCaseObject, Object.lowerCaseObject2]>
}
