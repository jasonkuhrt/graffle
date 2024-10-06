import type { Anyware } from '../../lib/anyware/__.js'
import type { Fluent } from '../../lib/fluent/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { GlobalRegistry } from '../4_generator/globalRegistry.js'
import type { RequestCore } from '../5_request/__.js'
import type { Extension } from './extension/extension.js'
import type { Config } from './Settings/Config.js'
import type { InputStatic } from './Settings/Input.js'
import { inputToConfig } from './Settings/InputToConfig.js'

export type ClientContext = {
  config: Config
  schemaIndex: SchemaIndex | null
}

export type FnClient<$Context extends ClientContext = ClientContext> = Fluent.Create<$Context>

export type FnClientState = Fluent.State<ClientContext>

export type FnParametersProperty = Fluent.FnParametersProperty<FnClient, FnClientState>

export type FnParametersMerge = Fluent.ParametersFnMerge<FnClientState['context']>

export type Builder = (state: State) => Builder

type PropertyDefinitions = Record<string, ((...args: any[]) => Builder)>

export const defineProperties = (
  definition: (builder: Builder, state: State) => PropertyDefinitions,
): (builder: Builder, state: State) => PropertyDefinitions => {
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

type TerminusDefinitions = Record<string, unknown>

export const defineTerminus = (property: (state: State) => TerminusDefinitions) => {
  return (state: State) => {
    return property(state)
  }
}

export interface State {
  input: InputStatic<GlobalRegistry.SchemaUnion>
  config: Config
  retry: Anyware.Extension2<RequestCore.Core, { retrying: true }> | null
  extensions: Extension[]
}

export const createState = (stateWithoutConfig: StateWithoutConfig): State => {
  let config: Config | null

  return {
    ...stateWithoutConfig,
    get config(): Config {
      const configFound = config ?? inputToConfig(stateWithoutConfig.input)
      return configFound
    },
  }
}

export type StateWithoutConfig = Omit<State, 'config'>
