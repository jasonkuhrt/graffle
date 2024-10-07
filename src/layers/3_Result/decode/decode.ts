import type { GraphQLPlus } from '../../../lib/graphql-plus/__.js'
import type { SomeData } from '../../../lib/typed-document/TypedDocument.js'
import type { Codec } from '../../1_Schema/Hybrid/types/Scalar/codec.js'
import type { CustomScalarsIndex } from '../../4_generator/generators/SchemaIndex.js'

export const decode = (input: {
  data: SomeData | null | undefined
  customScalarsIndex: CustomScalarsIndex
  document?: GraphQLPlus.Nodes.DocumentNode
}): void => {
  const { data, customScalarsIndex, document } = input
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    const indexItem = customScalarsIndex[k]
    if (!indexItem) continue

    const codec = indexItem[`o`]
    if (codec) {
      if (Array.isArray(v)) {
        data[k] = decodeListValue(v, codec)
      } else {
        data[k] = codec.decode(v)
      }
      continue
    }

    const ref = indexItem[`r`]
    if (ref) {
      decode({ data: v, customScalarsIndex: ref, document })
      continue
    }

    throw new Error(`Unknown index item: ${String(indexItem)}`)
  }
}

const decodeListValue = (value: any, codec: Codec): any => {
  if (Array.isArray(value)) {
    return value.map(item => decodeListValue(item, codec))
  }
  return codec.decode(value)
}
