import type { StandardScalarVariables } from '../../lib/graphql.js'
import type { DocumentInput, OperationNameInput } from '../6_client/types.js'

export interface BaseInput {
  document: DocumentInput
  variables?: StandardScalarVariables
  operationName?: OperationNameInput
}
