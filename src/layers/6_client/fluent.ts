import type { Fluent } from '../../lib/fluent/__.js'
import type { Schema } from '../1_Schema/__.js'
import type { Config } from './Settings/Config.js'

export type ClientContext = {
  config: Config
  schemaIndex: Schema.Index | null
}

export type FnClient<$Context extends ClientContext = ClientContext> = Fluent.Create<$Context>

export type FnClientState = Fluent.State<ClientContext>

export type FnParametersProperty = Fluent.FnParametersProperty<FnClient, FnClientState>

export type FnParametersMerge = Fluent.ParametersFnMerge<FnClientState['context']>
