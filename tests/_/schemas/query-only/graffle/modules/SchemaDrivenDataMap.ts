import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import * as $Scalar from './Scalar.js'
//
//
//
//
//
//
// ==================================================================================================
//                                         GraphQLScalarType
// ==================================================================================================
//
//
//
//
//
//

const ID = $Scalar.ID

const Boolean = $Scalar.Boolean

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

const $SchemaDrivenDataMap: $Utilities.SchemaDrivenDataMap = {
  roots: {
    Query,
  },
  types: {
    ID,
    Boolean,
    String,
    Query,
  },
}

export { $SchemaDrivenDataMap as SchemaDrivenDataMap }
