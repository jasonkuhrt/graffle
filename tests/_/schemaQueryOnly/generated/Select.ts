import { ResultSet, SelectionSet } from '../../../../src/entrypoints/alpha/schema.js'
import { Index } from './Index.js'

// Root Types
// ----------

export type Query<$SelectionSet extends SelectionSet.Root<Index, 'Query'>> = ResultSet.Root<
  $SelectionSet,
  Index,
  'Query'
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
