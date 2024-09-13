import type { HKT } from '../../lib/hkt/__.js'
import type { Extension, ExtensionBuilderPassthrough } from '../6_client/extension.js'

export const createExtension = <$Extension extends Extension = ExtensionBuilderPassthrough>(
  input: InputifyExtension<$Extension>,
): $Extension => {
  return input as $Extension
}

type InputifyExtension<$Extension extends Extension> = HKT.Remove<$Extension>
