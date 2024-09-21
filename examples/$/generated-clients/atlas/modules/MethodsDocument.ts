import type * as Utilities from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSets from './SelectionSets.js'

interface DocumentInput {
  queries?: Record<string, SelectionSets.Query>
}

export interface Document<$Config extends Utilities.Config> {
  <$Document>(document: Utilities.Exact<$Document, DocumentInput>): Utilities.DocumentRunner2<
    $Config,
    Index,
    // @ts-expect-error We use Exact instead of constraint on this function. TypeScript does not see that as
    // Satisfying the constraint on the DocumentRunner type.
    $Document
  >
}

export interface BuilderMethodsDocumentFn extends Utilities.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: Document<this['Params']['Config']>
}
