export { type Simplify } from 'type-fest'
export * from '../layers/3_SelectionSet/__.js'
export { type DocumentRunner } from '../layers/6_client/document.js'
export type {
  ConfigGetOutputError,
  ResolveOutputReturnRootField,
  ResolveOutputReturnRootType,
} from '../layers/6_client/handleOutput.js'
export type { Config } from '../layers/6_client/Settings/Config.js'
export { type AddTypenameToSelectedRootTypeResultFields } from '../layers/6_client/Settings/Config.js'
export { HKT } from '../lib/hkt/__.js'
export { type Exact, type ExactNonEmpty, type UnionExpanded } from '../lib/prelude.js'
