import type * as $ from '../../../../../../src/entrypoints/schema.js'
import type * as $Scalar from './Scalar.js'

export namespace Schema {
  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                                Root
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Root {
    export type Query = $.Output.ObjectQuery<{
      id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
      idNonNull: $.Field<'idNonNull', $Scalar.ID, null>
    }>
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                                Enum
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Enum {
    // -- no types --
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                            InputObject
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace InputObject {
    // -- no types --
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                             Interface
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Interface {
    // -- no types --
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                               Object
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Object {
    // -- no types --
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                               Union
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  export namespace Union {
    // -- no types --
  }
}
//
//
//
//
//
//
// ==================================================================================================
//                                               Schema
// ==================================================================================================
//
//
//
//
//
//

import type * as Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type * as Data from './Data.js'
import type * as MethodsRoot from './MethodsRoot.js'

export interface Schema extends Utilities.SchemaIndexBase {
  name: Data.Name
  RootTypesPresent: ['Query']
  RootUnion: Schema.Root.Query
  Root: {
    Query: Schema.Root.Query
    Mutation: null
    Subscription: null
  }
  allTypes: {
    Query: Schema.Root.Query
  }
  objects: {}
  unions: {}
  interfaces: {}
  customScalars: Utilities.SchemaIndexBase['customScalars']
  extensions: Utilities.GlobalRegistry.TypeExtensions
}
