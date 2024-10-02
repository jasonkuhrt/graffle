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

// None of your GraphQLObjectTypes have custom scalars.

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
    $: {
      input: InputObjectNested,
    },
  },
  InputObjectNestedNonNull: {
    $: {
      input: InputObjectNestedNonNull,
    },
  },
  dateArg: {
    $: {
      date: CustomScalars.Date.codec,
    },
  },
  dateArgInputObject: {
    $: {
      input: InputObject,
    },
  },
  dateArgList: {
    $: {
      date: CustomScalars.Date.codec,
    },
  },
  dateArgNonNull: {
    $: {
      date: CustomScalars.Date.codec,
    },
  },
  dateArgNonNullList: {
    $: {
      date: CustomScalars.Date.codec,
    },
  },
  dateArgNonNullListNonNull: {
    $: {
      date: CustomScalars.Date.codec,
    },
  },
  stringWithArgInputObject: {
    $: {
      input: InputObject,
    },
  },
  stringWithArgInputObjectRequired: {
    $: {
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
