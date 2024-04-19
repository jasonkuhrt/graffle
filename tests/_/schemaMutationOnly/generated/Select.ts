import { ResultSet, SelectionSet } from '../../../../src/entrypoints/alpha/schema.js'
import { Index } from './Index.js'

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
