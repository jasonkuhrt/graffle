import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import * as CustomScalars from './Scalar.js'
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
  f: {
    date: {
      nt: CustomScalars.Date.codec,
    },
    dateRequired: {
      nt: CustomScalars.Date.codec,
    },
    id: {},
    idRequired: {},
  },
}

const InputObjectCircular: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectCircular',
  f: {
    circular: {
      // nt: InputObjectCircular, <-- Assigned later to avoid potential circular dependency.
    },
    date: {
      nt: CustomScalars.Date.codec,
    },
  },
}

const InputObjectNested: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectNested',
  f: {
    InputObject: {
      // nt: InputObject, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const InputObjectNestedNonNull: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectNestedNonNull',
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
  int: {},
}

const DateObject1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  date1: {
    nt: CustomScalars.Date.codec,
  },
}

const DateObject2: $Utilities.SchemaDrivenDataMap.OutputObject = {
  date2: {
    nt: CustomScalars.Date.codec,
  },
}

const ErrorOne: $Utilities.SchemaDrivenDataMap.OutputObject = {
  infoId: {},
  message: {},
}

const ErrorTwo: $Utilities.SchemaDrivenDataMap.OutputObject = {
  infoInt: {},
  message: {},
}

const Foo: $Utilities.SchemaDrivenDataMap.OutputObject = {
  id: {},
}

const Object1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  boolean: {},
  float: {},
  id: {},
  int: {},
  string: {},
}

const Object1ImplementingInterface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  id: {},
  int: {},
}

const Object2ImplementingInterface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  boolean: {},
  id: {},
}

const ObjectNested: $Utilities.SchemaDrivenDataMap.OutputObject = {
  id: {},
  object: {
    // nt: Object1, <-- Assigned later to avoid potential circular dependency.
  },
}

const ObjectUnion: $Utilities.SchemaDrivenDataMap.OutputObject = {
  fooBarUnion: {
    // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
  },
}

const lowerCaseObject: $Utilities.SchemaDrivenDataMap.OutputObject = {
  id: {},
}

const lowerCaseObject2: $Utilities.SchemaDrivenDataMap.OutputObject = {
  int: {},
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

const DateInterface1 = {
  ...DateObject1,
}

const Error = {}

const Interface = {}

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

const DateUnion = {
  ...DateObject1,
  ...DateObject2,
}

const FooBarUnion = {}

const Result = {}

const lowerCaseUnion = {}

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
  id: {},
  idNonNull: {},
}

const Query: $Utilities.SchemaDrivenDataMap.OutputObject = {
  InputObjectNested: {
    a: {},
  },
  InputObjectNestedNonNull: {
    a: {},
  },
  abcEnum: {},
  argInputObjectCircular: {
    a: {},
  },
  date: {
    nt: CustomScalars.Date.codec,
  },
  dateArg: {
    a: {
      date: {
        it: [0],
        nt: CustomScalars.Date.codec,
      },
    },
    nt: CustomScalars.Date.codec,
  },
  dateArgInputObject: {
    a: {},
    nt: CustomScalars.Date.codec,
  },
  dateArgList: {
    a: {
      date: {
        it: [0, [1]],
        nt: CustomScalars.Date.codec,
      },
    },
    nt: CustomScalars.Date.codec,
  },
  dateArgNonNull: {
    a: {
      date: {
        it: [1],
        nt: CustomScalars.Date.codec,
      },
    },
    nt: CustomScalars.Date.codec,
  },
  dateArgNonNullList: {
    a: {
      date: {
        it: [1, [0]],
        nt: CustomScalars.Date.codec,
      },
    },
    nt: CustomScalars.Date.codec,
  },
  dateArgNonNullListNonNull: {
    a: {
      date: {
        it: [1, [1]],
        nt: CustomScalars.Date.codec,
      },
    },
    nt: CustomScalars.Date.codec,
  },
  dateInterface1: {
    // nt: DateInterface1, <-- Assigned later to avoid potential circular dependency.
  },
  dateList: {
    nt: CustomScalars.Date.codec,
  },
  dateListList: {
    nt: CustomScalars.Date.codec,
  },
  dateListNonNull: {
    nt: CustomScalars.Date.codec,
  },
  dateNonNull: {
    nt: CustomScalars.Date.codec,
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
        it: [0],
      },
      float: {
        it: [0],
      },
      id: {
        it: [0],
      },
      int: {
        it: [0],
      },
      string: {
        it: [0],
      },
    },
    // nt: Object1, <-- Assigned later to avoid potential circular dependency.
  },
  result: {
    a: {},
    // nt: Result, <-- Assigned later to avoid potential circular dependency.
  },
  resultNonNull: {
    a: {},
    // nt: Result, <-- Assigned later to avoid potential circular dependency.
  },
  string: {},
  stringWithArgEnum: {
    a: {},
  },
  stringWithArgInputObject: {
    a: {},
  },
  stringWithArgInputObjectRequired: {
    a: {},
  },
  stringWithArgs: {
    a: {
      boolean: {
        it: [0],
      },
      float: {
        it: [0],
      },
      id: {
        it: [0],
      },
      int: {
        it: [0],
      },
      string: {
        it: [0],
      },
    },
  },
  stringWithListArg: {
    a: {
      ints: {
        it: [0, [0]],
      },
    },
  },
  stringWithListArgRequired: {
    a: {
      ints: {
        it: [1, [1]],
      },
    },
  },
  stringWithRequiredArg: {
    a: {
      string: {
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
ObjectNested['object']!.nt = Object1
ObjectUnion['fooBarUnion']!.nt = FooBarUnion
Query['dateInterface1']!.nt = DateInterface1
Query['dateObject1']!.nt = DateObject1
Query['dateUnion']!.nt = DateUnion
Query['interface']!.nt = Interface
Query['interfaceNonNull']!.nt = Interface
Query['interfaceWithArgs']!.nt = Interface
Query['lowerCaseUnion']!.nt = lowerCaseUnion
Query['object']!.nt = Object1
Query['objectList']!.nt = Object1
Query['objectListNonNull']!.nt = Object1
Query['objectNested']!.nt = ObjectNested
Query['objectNonNull']!.nt = Object1
Query['objectWithArgs']!.nt = Object1
Query['result']!.nt = Result
Query['resultNonNull']!.nt = Result
Query['unionFooBar']!.nt = FooBarUnion
Query['unionFooBarNonNull']!.nt = FooBarUnion
Query['unionFooBarWithArgs']!.nt = FooBarUnion
Query['unionObject']!.nt = ObjectUnion
Query['unionObjectNonNull']!.nt = ObjectUnion

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

export const $index = {
  Mutation,
  Query,
}
