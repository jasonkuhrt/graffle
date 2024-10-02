import type { Select } from '../2_Select/__.js'
import type { CustomScalarsIndex, SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import { toGraphQLDocument } from './nodes/Document.js'

export const toGraphQL = (input: {
  schema: SchemaIndex
  document: Select.Document.DocumentNormalized
  customScalarsIndex?: CustomScalarsIndex
  // we can probably remove this. was an idea that was aborted. Do we need scalar hook?
  // hooks?: Context['hooks']
}) => {
  const context = {
    schema: input.schema,
    captures: {
      customScalarOutputs: [],
      variables: [],
    },
    // hooks: input.hooks,
  }

  // const location: Location = []
  const customScalarsIndex: CustomScalarsIndex = input.customScalarsIndex ?? {}

  return toGraphQLDocument(context, customScalarsIndex, input.document)
}
