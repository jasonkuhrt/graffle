export { type Simplify } from 'type-fest'
export { type SchemaDrivenDataMap } from '../extensions/CustomScalars/schemaDrivenDataMap/__.js'
export * from '../layers/2_Select/__.js'
export { type Schema as SchemaIndexBase } from '../layers/4_generator/generators/Schema.js'
export { type GlobalRegistry } from '../layers/4_generator/globalRegistry.js'
export type {
  ConfigGetOutputError,
  HandleOutput,
  HandleOutputGraffleRootField,
} from '../layers/6_client/handleOutput.js'
export { type DocumentRunner } from '../layers/6_client/requestMethods/document.js'
export type { Config } from '../layers/6_client/Settings/Config.js'
export { type Exact, type ExactNonEmpty, type UnionExpanded } from '../lib/prelude.js'
export { TypeFunction } from '../lib/type-function/__.js'
