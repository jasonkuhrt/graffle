import type { Select } from '../2_Select/__.js'
import type { CustomScalarsIndex } from '../4_generator/generators/SchemaIndex.js'
import { toGraphQLDocument } from './nodes/Document.js'

export const toGraphQL = (input: {
  document: Select.Document.DocumentNormalized
  customScalarsIndex?: CustomScalarsIndex
  // we can probably remove this. was an idea that was aborted. Do we need scalar hook?
  // hooks?: Context['hooks']
}) => {
  const context = {
    captures: {
      customScalarOutputs: [],
      variables: [],
    },
    // hooks: input.hooks,
  }

  const customScalarsIndex: CustomScalarsIndex = input.customScalarsIndex ?? {}

  return toGraphQLDocument(context, customScalarsIndex, input.document)
}
