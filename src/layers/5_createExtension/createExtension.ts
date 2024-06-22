import type { Anyware } from '../../lib/anyware/__.js'
import type { Core } from '../5_core/__.js'

type Extension = {
  name: string
  anyware?: Anyware.Extension2<Core.Core>
}

export const createExtension = (input: Extension) => input
