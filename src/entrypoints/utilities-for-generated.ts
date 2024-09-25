export { type Simplify } from 'type-fest'
export * from '../layers/2_SelectionSet/__.js'
export type {
  ConfigGetOutputError,
  ResolveOutputReturnRootField,
  ResolveOutputReturnRootType,
} from '../layers/5_core/handleOutput.js'
export { type DocumentRunner } from '../layers/6_client/requestMethods/document.js'
export type { Config } from '../layers/6_client/Settings/Config.js'
export { type AddTypenameToSelectedRootTypeResultFields } from '../layers/6_client/Settings/Config.js'
export { HKT } from '../lib/hkt/__.js'
export { type Exact, type ExactNonEmpty, type UnionExpanded } from '../lib/prelude.js'
