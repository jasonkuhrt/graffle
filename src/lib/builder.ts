import type { SchemaIndex } from './schemaTypes.js'
import type { SelectionSet } from './SelectionSet.js'

export type Query = <$SchemaIndex extends SchemaIndex>(
  document: $SchemaIndex['Root']['Query'] extends null ? null
    : SelectionSet<$SchemaIndex['Root']['Query'], $SchemaIndex>,
) => Promise<void>

export const query: Query = async (document) => {
  // todo
  document
  await Promise.resolve()
}
