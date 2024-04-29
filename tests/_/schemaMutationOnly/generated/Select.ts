import { ResultSet, SelectionSet } from '../../../../src/entrypoints/alpha/schema.js'
import { Index } from './Index.js'

// Runtime
// -------

import { createSelect } from '../../../../src/entrypoints/alpha/client.js'
export const Select = createSelect('default')

// Root Types
// ----------

export type Mutation<$SelectionSet extends SelectionSet.Root<Index, 'Mutation'>> = ResultSet.Root<
  $SelectionSet,
  Index,
  'Mutation'
>

// Object Types
// ------------

// -- None --

// Union Types
// -----------

// -- None --

// Interface Types
// ---------------

// -- None --
