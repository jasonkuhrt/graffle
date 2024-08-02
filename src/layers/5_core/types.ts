import type { Schema } from '../1_Schema/__.js'
import type { Config } from '../6_client/Settings/Config.js'

export type Transport = TransportMemory | TransportHttp

export type TransportMemory = typeof Transport.memory

export type TransportHttp = typeof Transport.http

export const Transport = {
  memory: `memory`,
  http: `http`,
} as const

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
