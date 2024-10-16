import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import * as $Scalar from './Scalar.js'
//
//
//
//
//
//
// ==================================================================================================
//                                     GraphQLScalarTypeStandard
// ==================================================================================================
//
//
//
//
//
//

const Boolean = $Scalar.Boolean

const Float = $Scalar.Float

const ID = $Scalar.ID

const Int = $Scalar.Int

const String = $Scalar.String

//
//
//
//
//
//
// ==================================================================================================
//                                      GraphQLScalarTypeCustom
// ==================================================================================================
//
//
//
//
//
//

// None of your GraphQLScalarTypeCustoms have custom scalars.

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLEnumType
// ==================================================================================================
//
//
//
//
//
//

// None of your GraphQLEnumTypes have custom scalars.

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLInputObjectType
// ==================================================================================================
//
//
//
//
//
//

// None of your GraphQLInputObjectTypes have custom scalars.

//
//
//
//
//
//
// ==================================================================================================
//                                         GraphQLObjectType
// ==================================================================================================
//
//
//
//
//
//

// None of your GraphQLObjectTypes have custom scalars.

//
//
//
//
//
//
// ==================================================================================================
//                                        GraphQLInterfaceType
// ==================================================================================================
//
//
//
//
//
//

// None of your GraphQLInterfaceTypes have custom scalars.

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLUnionType
// ==================================================================================================
//
//
//
//
//
//

// None of your GraphQLUnionTypes have custom scalars.

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLRootType
// ==================================================================================================
//
//
//
//
//
//

const Query: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    idNonNull: {},
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                       Reference Assignments
//                                (avoids circular assignment issues)
// ==================================================================================================
//
//
//
//
//
//

// None of your types have references to other non-scalar/enum types.

//
//
//
//
//
//
// ==================================================================================================
//                                               Index
// ==================================================================================================
//
//
//
//
//
//

const $schemaDrivenDataMap: $Utilities.SchemaDrivenDataMap = {
  roots: {
    Query,
  },
  directives: {},
  types: {
    Boolean,
    Float,
    ID,
    Int,
    String,
    Query,
  },
}

export { $schemaDrivenDataMap as schemaDrivenDataMap }
