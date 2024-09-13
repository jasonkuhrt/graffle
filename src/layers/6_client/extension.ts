import type { Anyware } from '../../lib/anyware/__.js'
import type { Fn } from '../../lib/hkt/hkt.js'
import type { Core } from '../5_core/__.js'
import type { Client, Context } from './client.js'
import type { Config } from './Settings/Config.js'

export interface ExtensionBuilderPassthrough extends Extension {
  return: this['params']['AdditionalMethods']
}

export interface Extension extends ExtensionBase, Fn<{ Config: unknown; Index: unknown; AdditionalMethods: unknown }> {}

export interface ExtensionBase {
  name: string
  anyware?: Anyware.Extension2<Core.Core>
  methods?: {
    get?: (
      input: {
        context: Context
        method: string
        client: Client<null, Config>
      },
    ) => unknown
  }
}
