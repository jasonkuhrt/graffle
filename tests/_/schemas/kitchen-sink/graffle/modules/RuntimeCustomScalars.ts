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

const InputObject = {
  date: CustomScalars.Date.codec,
  dateRequired: CustomScalars.Date.codec,
}

const InputObjectNested = {
  InputObject: InputObject,
}

const InputObjectNestedNonNull = {
  InputObject: InputObject,
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

const DateObject1 = {
  date1: {
    o: CustomScalars.Date.codec,
  },
}

const DateObject2 = {
  date2: {
    o: CustomScalars.Date.codec,
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

const DateInterface1 = {
  ...DateObject1,
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

const DateUnion = {
  ...DateObject1,
  ...DateObject2,
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

const Query = {
  InputObjectNested: {
    i: {
      input: InputObjectNested,
    },
  },
  InputObjectNestedNonNull: {
    i: {
      input: InputObjectNestedNonNull,
    },
  },
  date: {
    o: CustomScalars.Date.codec,
  },
  dateArg: {
    i: {
      date: CustomScalars.Date.codec,
    },
    o: CustomScalars.Date.codec,
  },
  dateArgInputObject: {
    i: {
      input: InputObject,
    },
    o: CustomScalars.Date.codec,
  },
  dateArgList: {
    i: {
      date: CustomScalars.Date.codec,
    },
    o: CustomScalars.Date.codec,
  },
  dateArgNonNull: {
    i: {
      date: CustomScalars.Date.codec,
    },
    o: CustomScalars.Date.codec,
  },
  dateArgNonNullList: {
    i: {
      date: CustomScalars.Date.codec,
    },
    o: CustomScalars.Date.codec,
  },
  dateArgNonNullListNonNull: {
    i: {
      date: CustomScalars.Date.codec,
    },
    o: CustomScalars.Date.codec,
  },
  dateInterface1: {
    r: DateInterface1,
  },
  dateList: {
    o: CustomScalars.Date.codec,
  },
  dateListList: {
    o: CustomScalars.Date.codec,
  },
  dateListNonNull: {
    o: CustomScalars.Date.codec,
  },
  dateNonNull: {
    o: CustomScalars.Date.codec,
  },
  dateObject1: {
    r: DateObject1,
  },
  dateUnion: {
    r: DateUnion,
  },
  stringWithArgInputObject: {
    i: {
      input: InputObject,
    },
  },
  stringWithArgInputObjectRequired: {
    i: {
      input: InputObject,
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
//                                               Index
// ==================================================================================================
//
//
//
//
//
//

export const $index = {
  Query,
}
