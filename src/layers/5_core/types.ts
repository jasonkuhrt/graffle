import type { Schema } from '../1_Schema/__.js'
import type { ReturnModeType } from '../5_client/Config.js'

export type Transport = TransportMemory | TransportHttp
export type TransportMemory = 'memory'
export type TransportHttp = 'http'

export type Interface = InterfaceRaw | InterfaceTyped

export type InterfaceRaw = 'raw'

export type InterfaceTyped = 'typed'

type BaseContext = {
  transport: Transport
  config: {
    returnMode: ReturnModeType
  }
}

export type Context = ContextInterfaceTyped | ContextInterfaceRaw

export type ContextInterfaceTyped =
  & BaseContext
  & ({ interface: InterfaceTyped; schemaIndex: Schema.Index })

export type ContextInterfaceRaw = BaseContext & {
  interface: InterfaceRaw
}
