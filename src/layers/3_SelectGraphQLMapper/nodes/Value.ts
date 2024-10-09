import type { ValueNode } from 'graphql'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { advanceIndex, type CodecString, type GraphQLNodeMapper, isCodec } from '../types.js'

export const toGraphQLValue: ValueMapper = (context, index, value) => {
  // todo remove? unused.
  // const hookResult = context.hooks?.value?.(context, index, value)
  // if (hookResult) return hookResult

  if (isCodec(index)) {
    return applyCodec(index, value)
  }

  if (value === null) {
    return Nodes.NullValue()
  }

  if (Array.isArray(value)) {
    return Nodes.ListValue({
      values: value.map(oneValue =>
        toGraphQLValue(
          context,
          index,
          oneValue,
        )
      ),
    })
  }

  if (typeof value === `object`) {
    return Nodes.ObjectValue({
      fields: Object.entries(value).map(([fieldName, fieldValue]) => {
        return Nodes.ObjectField({
          name: Nodes.Name({ value: fieldName }),
          value: toGraphQLValue(context, advanceIndex(index, fieldName), fieldValue),
        })
      }),
    })
  }

  if (typeof value === `string`) {
    if (context.value.isEnum) {
      return Nodes.EnumValue({ value: String(value) })
    }
    return Nodes.StringValue({ value })
  }

  if (typeof value === `boolean`) {
    return Nodes.BooleanValue({ value })
  }

  if (typeof value === `number`) {
    return Nodes.FloatValue({ value: String(value) })
  }

  throw new Error(`Unsupported value: ${String(value)}`)
}

export type ValueMapper = GraphQLNodeMapper<
  ValueNode,
  [value: unknown],
  { value: ValueContext }
>

type ValueContext = {
  isEnum: boolean
}

const applyCodec = (
  codec: CodecString,
  value: unknown,
): Nodes.ListValueNode | Nodes.StringValueNode | Nodes.NullValueNode => {
  if (value === null) return Nodes.NullValue()

  if (Array.isArray(value)) {
    return Nodes.ListValue({
      values: value.map(oneValue => applyCodec(codec, oneValue)),
    })
  }

  return Nodes.StringValue({ value: codec.encode(value) })
}
