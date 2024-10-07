import { describe, expect, test } from 'vitest'
import { type GraphQLRequestInput, type OperationTypeNameAll, parseGraphQLOperationType } from './graphql.js'

const operationNameOne = `one`
const operationNameTwo = `two`
const docNoDefinedOps = ``
const docMultipleQueryOperations = `query ${operationNameOne} { x }\nquery ${operationNameTwo} { x }`
const docMultipleMixedOperations = `mutation ${operationNameOne} { x }\nquery ${operationNameTwo} { x }`
const docOverloadedTerms = `query { queryX }`

type CaseParameters = [
  description: string,
  request: GraphQLRequestInput,
  result: null | OperationTypeNameAll,
]

describe(`parseGraphQLOperationType`, () => {
  // dprint-ignore
  test.each<CaseParameters>([
    
    [ `null if no defined operations and operation name given `, 														{ query: docNoDefinedOps, operationName: operationNameOne }, 						null ],
    [ `null if multiple defined operations and no operation name given`, 										{ query: docMultipleQueryOperations  }, 																null ],
    [ `null if multiple defined operations and no operation name given (empty string)`, 		{ query: docMultipleQueryOperations, operationName: ``  }, 							null ],
    [ `null if multiple defined operations and operation name given not found`, 						{ query: docMultipleQueryOperations, operationName: `foo` }, 						null ],
    [ `assume query if no defined operations and no operation name given `, 								{ query: docNoDefinedOps }, 																						`query` ],
    [ `query if multiple defined query operations and no query operation name given `, 			{ query: docMultipleQueryOperations, operationName: operationNameOne }, `query` ],
    [ `query if multiple defined mixed operations and no mutation operation name given `, 	{ query: docMultipleMixedOperations, operationName: operationNameTwo }, `query` ],
    [ `mutation if multiple defined mixed operations and no query operation name given `, 	{ query: docMultipleMixedOperations, operationName: operationNameOne }, `mutation` ],
    [ `mutation if only operation without name and no operation given `, 									  { query: `mutation { user { name } }` }, 						                    `mutation` ],
    [ `overloaded terms do not confuse parser`, 	                                          { query: docOverloadedTerms },                                          `query` ],
  ])(`%s`, (_, request, result) => {
    expect(parseGraphQLOperationType(request)).toEqual(result)
  })
})
