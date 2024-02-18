import type { SelectionSet } from './SelectionSet.js'

export type Query = <$Query>(document: SelectionSet<$Query>) => Promise<void>

export const query: Query = async (document) => {
  // todo
}
