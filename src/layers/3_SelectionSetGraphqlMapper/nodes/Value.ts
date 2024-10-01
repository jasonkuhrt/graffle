import type { ValueNode } from 'graphql'
import { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import { casesExhausted } from '../../../lib/prelude.js'
import { Schema } from '../../1_Schema/__.js'
import type { GraphQLNodeMapper } from '../types.js'

const scalarNameToGraphQLNodeKind = {
  String: Nodes.Kind.STRING,
  Int: Nodes.Kind.INT,
  Boolean: Nodes.Kind.BOOLEAN,
  ID: Nodes.Kind.STRING,
  Float: Nodes.Kind.FLOAT,
} satisfies Record<string, Nodes.$KindGroups.StandardScalar>

type SupportedJavaScriptValues = string | boolean

const javaScriptScalarToGraphQLNodeKind = {
  string: Nodes.Kind.STRING,
  boolean: Nodes.Kind.BOOLEAN,
} satisfies Record<string, Nodes.$KindGroups.StandardScalar>

export const toGraphQLValue: GraphQLNodeMapper<ValueNode, [type: Schema.Input.Any, value: unknown]> = (
  context,
  location,
  type,
  value,
) => {
  if (value === null) {
    return Nodes.NullValue({})
  }

  const unwrappedType: Schema.Input.AnyExceptNull = Schema.Input.unwrapNullable(type)

  if (unwrappedType.kind === `Enum`) {
    return Nodes.EnumValue({
      value: String(value),
    })
  }

  if (unwrappedType.kind === `Scalar`) {
    // eslint-disable-next-line
    // @ts-ignore fixme - passes on build but fails on type check ??
    const kind = scalarNameToGraphQLNodeKind[unwrappedType.name] as undefined | Nodes.$KindGroups.StandardScalar
    // @ts-expect-error fixme
    const encodedValue = unwrappedType.codec.encode(value)

    if (!kind) {
      // custom scalar

      // @ts-expect-error custom scalar encoding could fall out of range.
      const kind = javaScriptScalarToGraphQLNodeKind[typeof encodedValue] as
        | undefined
        | Nodes.$KindGroups.StandardScalar

      if (!kind) {
        throw new Error(`Unsupported encoded type for custom scalar: ${typeof encodedValue}`)
      }

      // @ts-expect-error kinds and value not aligning
      return Nodes.Value({
        kind,
        value: encodedValue as SupportedJavaScriptValues,
      })
    }

    return Nodes.Value({
      kind,
      value: encodedValue as any,
    })
  }

  if (unwrappedType.kind === `list`) {
    if (!Array.isArray(value)) {
      throw new Error(`Expected array for list type, got: ${typeof value}`)
    }

    return Nodes.ListValue({
      values: value.map(oneValue => toGraphQLValue(context, location, unwrappedType.type, oneValue)),
    })
  }

  if (unwrappedType.kind === `InputObject`) { // eslint-disable-line
    return Nodes.ObjectValue({
      // @ts-expect-error fixme
      fields: Object.entries(value).map(([fieldName, fieldValue]) => {
        const fieldType = Schema.readMaybeThunk(unwrappedType.fields[fieldName].type)
        return Nodes.ObjectField({
          name: {
            kind: Nodes.Kind.NAME,
            value: fieldName,
          },
          value: toGraphQLValue(context, location, fieldType, fieldValue),
        })
      }),
    })
  }

  throw casesExhausted(unwrappedType)
}
