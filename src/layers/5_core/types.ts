import type { Schema } from '../1_Schema/__.js'
import type { Config } from '../5_client/Config.js'

export type Transport = TransportMemory | TransportHttp

export type TransportMemory = 'memory'

export type TransportHttp = 'http'

export type Interface = InterfaceRaw | InterfaceTyped

export type InterfaceRaw = 'raw'

export type InterfaceTyped = 'typed'

type BaseContext = {
  config: Config
}

export type ContextInterfaceTyped =
  & BaseContext
  & ({ schemaIndex: Schema.Index })

export type ContextInterfaceRaw = BaseContext
