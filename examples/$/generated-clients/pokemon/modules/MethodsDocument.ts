import type * as Utilities from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSets from './SelectionSets.js'

interface DocumentInput {
  query: Record<string, SelectionSets.Query>
  mutation: Record<string, SelectionSets.Mutation>
}

export interface Document<$Config extends Utilities.Config> {
  <$Document>(document: Utilities.ExactNonEmpty<$Document, DocumentInput>): Utilities.DocumentRunner<
    $Config,
    Index,
    // @ts-expect-error We use Exact instead of constraint on this function. TypeScript does not see that as
    // Satisfying the constraint on the DocumentRunner type.
    $Document
  >
}

export interface BuilderMethodsDocumentFn extends Utilities.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: Document<this['params']['config']>
}
