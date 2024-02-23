import type { ResultSet } from '../ResultSet/__.js'
import type { Query } from '../ResultSet/ResultSet.js'
import type { Index } from '../schema/Schema.js'
import type { SelectionSet } from '../SelectionSet/__.js'

export type Client<$SchemaIndex extends Index> =
  ($SchemaIndex['Root']['Query'] extends null
    ? {
        // dprint-ignore
        query: <$SelectionSet extends SelectionSet.Query<$SchemaIndex>>(
          selectionSet: $SelectionSet,
        ) => Promise<Query<$SelectionSet, $SchemaIndex>>
      }
    : unknown) &
    ($SchemaIndex['Root']['Mutation'] extends null
      ? {
          // dprint-ignore
          mutation: <$SelectionSet extends SelectionSet.Mutation<$SchemaIndex>>(
            selectionSet: $SelectionSet,
          ) => Promise<ResultSet<$SelectionSet>>
        }
      : unknown) &
    ($SchemaIndex['Root']['Subscription'] extends null
      ? {
          // dprint-ignore
          subscription: <
            $SelectionSet extends SelectionSet.Subscription<$SchemaIndex>,
          >(
            selectionSet: $SelectionSet,
          ) => Promise<ResultSet<$SelectionSet>>
        }
      : unknown)

interface Input {
  url: URL | string
}

export const create = <$SchemaIndex extends Index>(
  input: Input,
): Client<$SchemaIndex> => {
  return 1 as any
}
