import type { ResultSet } from './ResultSet/__.js'
import type { Index } from './Schema/Schema.js'
import type { SelectionSet } from './SelectionSet/__.js'

// dprint-ignore
export type Client<$SchemaIndex extends Index> =
  & ($SchemaIndex['Root']['Query'] extends null ? {
      query: <$SelectionSet extends SelectionSet.Query<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Query<$SelectionSet, $SchemaIndex>>
    }
    : unknown)
  & ($SchemaIndex['Root']['Mutation'] extends null ? {
      mutation: <$SelectionSet extends SelectionSet.Mutation<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Mutation<$SelectionSet,$SchemaIndex>>
    }
    : unknown)
  & ($SchemaIndex['Root']['Subscription'] extends null ? {
      subscription: <$SelectionSet extends SelectionSet.Subscription<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Subscription<$SelectionSet,$SchemaIndex>>
    }
    : unknown)

interface Input {
  url: URL | string
}

export const create = <$SchemaIndex extends Index>(input: Input): Client<$SchemaIndex> => {
  return input as any
}
