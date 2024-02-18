import type * as Schema from '../demo.js'
import type { SelectionSet } from './SelectionSet.js'

type Query = (document: SelectionSet<Schema.Root.Query>) => Promise<void>

declare const query: Query

await query({
  environment: {

  },
})
