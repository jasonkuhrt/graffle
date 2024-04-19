import type * as $ from '../../../../src/entrypoints/alpha/schema.js'
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
    date: $.Field<$.Output.Nullable<$Scalar.Date>, null>
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
    dateNonNull: $.Field<$Scalar.Date, null>
    dateObject1: $.Field<$.Output.Nullable<Object.DateObject1>, null>
    id: $.Field<$.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<$Scalar.ID, null>
    interface: $.Field<$.Output.Nullable<Interface.Interface>, null>
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
    unionFooBar: $.Field<$.Output.Nullable<Union.FooBarUnion>, null>
  }>
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
  export type Case = $.Enum<'Case', ['ErrorOne', 'ErrorTwo', 'Object1']>
}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
  // -- no types --
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
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
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  /**
   * Union documentation.
   */
  export type FooBarUnion = $.Union<'FooBarUnion', [Object.Bar, Object.Foo]>

  export type Result = $.Union<'Result', [Object.ErrorOne, Object.ErrorTwo, Object.Object1]>
}
