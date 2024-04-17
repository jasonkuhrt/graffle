import type * as $ from '../../../../src/Schema/__.js'
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
  }>
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
  // -- no types --
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
  // -- no types --
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  export type DateObject1 = $.Object$2<'DateObject1', {
    date1: $.Field<$.Output.Nullable<$Scalar.Date>, null>
  }>
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  // -- no types --
}
