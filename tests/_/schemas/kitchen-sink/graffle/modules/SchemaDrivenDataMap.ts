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

const Int = $Scalar.Int

const String = $Scalar.String

const ID = $Scalar.ID

const Boolean = $Scalar.Boolean

const Float = $Scalar.Float

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

const Date = $Scalar.Date

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

const ABCEnum: $Utilities.SchemaDrivenDataMap.Enum = {
  k: 'enum',
  n: 'ABCEnum',
}

const Case: $Utilities.SchemaDrivenDataMap.Enum = {
  k: 'enum',
  n: 'Case',
}

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

const InputObject: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObject',
  fcs: ['date', 'dateRequired'],
  f: {
    date: {
      nt: Date,
    },
    dateRequired: {
      nt: Date,
    },
    id: {},
    idRequired: {},
  },
}

const InputObjectCircular: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectCircular',
  fcs: ['circular', 'date'],
  f: {
    circular: {
      // nt: InputObjectCircular, <-- Assigned later to avoid potential circular dependency.
    },
    date: {
      nt: Date,
    },
  },
}

const InputObjectNested: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectNested',
  fcs: ['InputObject'],
  f: {
    InputObject: {
      // nt: InputObject, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const InputObjectNestedNonNull: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectNestedNonNull',
  fcs: ['InputObject'],
  f: {
    InputObject: {
      // nt: InputObject, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

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

const Bar: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    int: {},
  },
}

const DateObject1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    date1: {
      nt: Date,
    },
  },
}

const DateObject2: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    date2: {
      nt: Date,
    },
  },
}

const ErrorOne: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    infoId: {},
    message: {},
  },
}

const ErrorTwo: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    infoInt: {},
    message: {},
  },
}

const Foo: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
  },
}

const Object1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    boolean: {},
    float: {},
    id: {},
    int: {},
    string: {},
  },
}

const Object1ImplementingInterface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    int: {},
  },
}

const Object2ImplementingInterface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    boolean: {},
    id: {},
  },
}

const ObjectNested: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    object: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const ObjectUnion: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    fooBarUnion: {
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const lowerCaseObject: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
  },
}

const lowerCaseObject2: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    int: {},
  },
}

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

const DateInterface1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    ...DateObject1.f,
  },
}

const Error: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {},
}

const Interface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {},
}

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

const DateUnion: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    ...DateObject1.f,
    ...DateObject2.f,
  },
}

const FooBarUnion: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {},
}

const Result: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {},
}

const lowerCaseUnion: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {},
}

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

const Mutation: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    idNonNull: {},
  },
}

const Query: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    InputObjectNested: {
      a: {
        input: {
          nt: InputObjectNested,
          it: [0],
        },
      },
    },
    InputObjectNestedNonNull: {
      a: {
        input: {
          nt: InputObjectNestedNonNull,
          it: [1],
        },
      },
    },
    abcEnum: {},
    argInputObjectCircular: {
      a: {
        input: {
          nt: InputObjectCircular,
          it: [0],
        },
      },
    },
    date: {
      nt: Date,
    },
    dateArg: {
      a: {
        date: {
          nt: Date,
          it: [0],
        },
      },
      nt: Date,
    },
    dateArgInputObject: {
      a: {
        input: {
          nt: InputObject,
          it: [0],
        },
      },
      nt: Date,
    },
    dateArgList: {
      a: {
        date: {
          nt: Date,
          it: [0, [1]],
        },
      },
      nt: Date,
    },
    dateArgNonNull: {
      a: {
        date: {
          nt: Date,
          it: [1],
        },
      },
      nt: Date,
    },
    dateArgNonNullList: {
      a: {
        date: {
          nt: Date,
          it: [1, [0]],
        },
      },
      nt: Date,
    },
    dateArgNonNullListNonNull: {
      a: {
        date: {
          nt: Date,
          it: [1, [1]],
        },
      },
      nt: Date,
    },
    dateInterface1: {
      // nt: DateInterface1, <-- Assigned later to avoid potential circular dependency.
    },
    dateList: {
      nt: Date,
    },
    dateListList: {
      nt: Date,
    },
    dateListNonNull: {
      nt: Date,
    },
    dateNonNull: {
      nt: Date,
    },
    dateObject1: {
      // nt: DateObject1, <-- Assigned later to avoid potential circular dependency.
    },
    dateUnion: {
      // nt: DateUnion, <-- Assigned later to avoid potential circular dependency.
    },
    error: {
      a: {
        case: {
          nt: String,
          it: [0],
        },
      },
    },
    id: {},
    idNonNull: {},
    interface: {
      // nt: Interface, <-- Assigned later to avoid potential circular dependency.
    },
    interfaceNonNull: {
      // nt: Interface, <-- Assigned later to avoid potential circular dependency.
    },
    interfaceWithArgs: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
      // nt: Interface, <-- Assigned later to avoid potential circular dependency.
    },
    listInt: {},
    listIntNonNull: {},
    listListInt: {},
    listListIntNonNull: {},
    lowerCaseUnion: {
      // nt: lowerCaseUnion, <-- Assigned later to avoid potential circular dependency.
    },
    object: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectList: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectListNonNull: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectNested: {
      // nt: ObjectNested, <-- Assigned later to avoid potential circular dependency.
    },
    objectNonNull: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectWithArgs: {
      a: {
        boolean: {
          nt: Boolean,
          it: [0],
        },
        float: {
          nt: Float,
          it: [0],
        },
        id: {
          nt: ID,
          it: [0],
        },
        int: {
          nt: Int,
          it: [0],
        },
        string: {
          nt: String,
          it: [0],
        },
      },
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    result: {
      a: {
        case: {
          nt: Case,
          it: [1],
        },
      },
      // nt: Result, <-- Assigned later to avoid potential circular dependency.
    },
    resultNonNull: {
      a: {
        case: {
          nt: Case,
          it: [0],
        },
      },
      // nt: Result, <-- Assigned later to avoid potential circular dependency.
    },
    string: {},
    stringWithArgEnum: {
      a: {
        ABCEnum: {
          nt: ABCEnum,
          it: [0],
        },
      },
    },
    stringWithArgInputObject: {
      a: {
        input: {
          nt: InputObject,
          it: [0],
        },
      },
    },
    stringWithArgInputObjectRequired: {
      a: {
        input: {
          nt: InputObject,
          it: [1],
        },
      },
    },
    stringWithArgs: {
      a: {
        boolean: {
          nt: Boolean,
          it: [0],
        },
        float: {
          nt: Float,
          it: [0],
        },
        id: {
          nt: ID,
          it: [0],
        },
        int: {
          nt: Int,
          it: [0],
        },
        string: {
          nt: String,
          it: [0],
        },
      },
    },
    stringWithListArg: {
      a: {
        ints: {
          nt: Int,
          it: [0, [0]],
        },
      },
    },
    stringWithListArgRequired: {
      a: {
        ints: {
          nt: Int,
          it: [1, [1]],
        },
      },
    },
    stringWithRequiredArg: {
      a: {
        string: {
          nt: String,
          it: [1],
        },
      },
    },
    unionFooBar: {
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionFooBarNonNull: {
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionFooBarWithArgs: {
      a: {
        id: {
          nt: ID,
          it: [0],
        },
      },
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionObject: {
      // nt: ObjectUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionObjectNonNull: {
      // nt: ObjectUnion, <-- Assigned later to avoid potential circular dependency.
    },
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

InputObjectCircular.f!['circular']!.nt = InputObjectCircular
InputObjectNested.f!['InputObject']!.nt = InputObject
InputObjectNestedNonNull.f!['InputObject']!.nt = InputObject
ObjectNested.f['object']!.nt = Object1
ObjectUnion.f['fooBarUnion']!.nt = FooBarUnion
Query.f['dateInterface1']!.nt = DateInterface1
Query.f['dateObject1']!.nt = DateObject1
Query.f['dateUnion']!.nt = DateUnion
Query.f['interface']!.nt = Interface
Query.f['interfaceNonNull']!.nt = Interface
Query.f['interfaceWithArgs']!.nt = Interface
Query.f['lowerCaseUnion']!.nt = lowerCaseUnion
Query.f['object']!.nt = Object1
Query.f['objectList']!.nt = Object1
Query.f['objectListNonNull']!.nt = Object1
Query.f['objectNested']!.nt = ObjectNested
Query.f['objectNonNull']!.nt = Object1
Query.f['objectWithArgs']!.nt = Object1
Query.f['result']!.nt = Result
Query.f['resultNonNull']!.nt = Result
Query.f['unionFooBar']!.nt = FooBarUnion
Query.f['unionFooBarNonNull']!.nt = FooBarUnion
Query.f['unionFooBarWithArgs']!.nt = FooBarUnion
Query.f['unionObject']!.nt = ObjectUnion
Query.f['unionObjectNonNull']!.nt = ObjectUnion

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
    Mutation,
    Query,
  },
  types: {
    Int,
    String,
    ID,
    Boolean,
    Float,
    Date,
    ABCEnum,
    Case,
    InputObject,
    InputObjectCircular,
    InputObjectNested,
    InputObjectNestedNonNull,
    Bar,
    DateObject1,
    DateObject2,
    ErrorOne,
    ErrorTwo,
    Foo,
    Object1,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
    ObjectNested,
    ObjectUnion,
    lowerCaseObject,
    lowerCaseObject2,
    DateInterface1,
    Error,
    Interface,
    DateUnion,
    FooBarUnion,
    Result,
    lowerCaseUnion,
    Mutation,
    Query,
  },
}

export { $schemaDrivenDataMap as schemaDrivenDataMap }
