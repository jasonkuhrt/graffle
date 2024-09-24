import type { Anyware } from '../../lib/anyware/__.js'
import type { Fluent } from '../../lib/fluent/__.js'
import type { Schema } from '../1_Schema/__.js'
import type { GlobalRegistry } from '../4_generator/globalRegistry.js'
import type { Core } from '../5_core/__.js'
import type { Extension } from './extension/extension.js'
import type { Config } from './Settings/Config.js'
import type { InputStatic } from './Settings/Input.js'

export type ClientContext = {
  config: Config
  schemaIndex: Schema.Index | null
}

export type FnClient<$Context extends ClientContext = ClientContext> = Fluent.Create<$Context>

export type FnClientState = Fluent.State<ClientContext>

export type FnParametersProperty = Fluent.FnParametersProperty<FnClient, FnClientState>

export type FnParametersMerge = Fluent.ParametersFnMerge<FnClientState['context']>

export type Builder = (input: CreateState) => Builder

type PropertyDefinitions = Record<string, ((...args: any[]) => Builder)>

export const defineProperties = (
  definition: (builder: Builder, state: CreateState) => PropertyDefinitions,
): (builder: Builder, state: CreateState) => PropertyDefinitions => {
  return (builder, state) => {
    return definition(builder, state) as any
  }
}

// export const defineProperty = <$Args extends [...any[]]>(
//   property: (state: CreateState, ...args: $Args) => CreateState,
// ) => {
//   return (builder: Builder, state: CreateState) => {
//     return (...args: $Args) => builder(property(state, ...args))
//   }
// }

// export const createTerminus = (property: (state: CreateState) => unknown) => {
//   return (state: CreateState) => {
//     return property(state)
//   }
// }

export interface CreateState {
  input: InputStatic<GlobalRegistry.SchemaUnion>
  retry: Anyware.Extension2<Core.Core, { retrying: true }> | null
  extensions: Extension[]
}
