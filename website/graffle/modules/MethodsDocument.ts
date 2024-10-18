import type * as Utilities from 'graffle/utilities-for-generated'
import type { Schema } from './Schema.js'
import type * as SelectionSets from './SelectionSets.js'

export interface Document<$Config extends Utilities.Config> {
  <$Document>(document: Utilities.ExactNonEmpty<$Document, SelectionSets.$Document>): Utilities.DocumentRunner<
    $Config,
    Schema,
    // @ts-expect-error We use Exact instead of constraint on this function. TypeScript does not see that as
    // Satisfying the constraint on the DocumentRunner type.
    $Document
  >
}

export interface BuilderMethodsDocumentFn extends Utilities.TypeFunction.Fn {
  // @ts-expect-error parameter is Untyped.
  return: Document<this['params']['config']>
}
