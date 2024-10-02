import type { Schema } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import { toGraphQLDocument } from './nodes/Document.js'

export const toGraphQL = (input: {
  schema: Schema.Index
  document: Select.Document.DocumentNormalized
}) => {
  return toGraphQLDocument(
    {
      schema: input.schema,
      captures: {
        customScalarOutputs: [],
        variables: [],
      },
    },
    [],
    input.document,
  )
}
