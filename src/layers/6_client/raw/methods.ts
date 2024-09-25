import type { TypedQueryDocumentNode } from 'graphql'
import type { SimplifyExceptError } from '../../../lib/prelude.js'
import type { BaseInput, TypedDocumentString } from '../../0_functions/types.js'
import type { RawResolveOutputReturnRootType } from '../../5_core/handleOutput.js'
import type { Config } from '../Settings/Config.js'

// dprint-ignore
export type BuilderRequestMethodsStatic<$Config extends Config> = {
  raw: <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>) =>
      Promise<SimplifyExceptError<RawResolveOutputReturnRootType<$Config, $Data>>>
  rawString: <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedDocumentString<$Data, $Variables>>) =>
      Promise<RawResolveOutputReturnRootType<$Config, $Data>>
}
