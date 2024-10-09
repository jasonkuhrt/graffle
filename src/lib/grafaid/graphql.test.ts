import { OperationTypeNode } from 'graphql'
import { describe, expect, test } from 'vitest'
import { Grafaid } from './__.js'

const operationNameOne = `one`
const operationNameTwo = `two`
const docNoDefinedOps = ``
const docMultipleQueryOperations = `query ${operationNameOne} { x }\nquery ${operationNameTwo} { x }`
const docMultipleMixedOperations = `mutation ${operationNameOne} { x }\nquery ${operationNameTwo} { x }`
const docOverloadedTerms = `query { queryX }`

type CaseParameters = [
  description: string,
  request: Grafaid.RequestInput,
  result: null | OperationTypeNode,
]

describe(`parseGraphQLOperationType`, () => {
  // dprint-ignore
  test.each<CaseParameters>([
    
    [ `null if no defined operations and operation name given `, 														{ query: docNoDefinedOps, operationName: operationNameOne }, 						null ],
    [ `null if multiple defined operations and no operation name given`, 										{ query: docMultipleQueryOperations  }, 																null ],
    [ `null if multiple defined operations and no operation name given (empty string)`, 		{ query: docMultipleQueryOperations, operationName: ``  }, 							null ],
    [ `null if multiple defined operations and operation name given not found`, 						{ query: docMultipleQueryOperations, operationName: `foo` }, 						null ],
    [ `assume query if no defined operations and no operation name given `, 								{ query: docNoDefinedOps }, 																						OperationTypeNode.QUERY ],
    [ `query if multiple defined query operations and no query operation name given `, 			{ query: docMultipleQueryOperations, operationName: operationNameOne }, OperationTypeNode.QUERY ],
    [ `query if multiple defined mixed operations and no mutation operation name given `, 	{ query: docMultipleMixedOperations, operationName: operationNameTwo }, OperationTypeNode.QUERY ],
    [ `mutation if multiple defined mixed operations and no query operation name given `, 	{ query: docMultipleMixedOperations, operationName: operationNameOne }, OperationTypeNode.MUTATION ],
    [ `mutation if only operation without name and no operation given `, 									  { query: `mutation { user { name } }` }, 						                    OperationTypeNode.MUTATION ],
    [ `overloaded terms do not confuse parser`, 	                                          { query: docOverloadedTerms },                                          OperationTypeNode.QUERY ],
  ])(`%s`, (_, request, result) => {
    expect(Grafaid.parseOperationType(request)).toEqual(result)
  })
})
