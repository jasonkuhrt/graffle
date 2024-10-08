import { Kind } from 'graphql'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import { operationTypeNameToRootTypeName, parseOperationType } from '../../../lib/grafaid/graphql.js'
import { unType } from '../../../lib/grafaid/typed-document/TypedDocument.js'
import { isString } from '../../../lib/prelude.js'
import type { CodecString } from '../../3_SelectGraphQLMapper/types.js'
import type { CustomScalarsIndex } from '../../4_generator/generators/SchemaIndex.js'

/**
 * If a document is given then aliases will be decoded as well.
 */
export const decode = (input: {
  data: Grafaid.SomeData | null | undefined
  customScalarsIndex: CustomScalarsIndex
  request: Grafaid.RequestInput
}) => {
  const rootType = parseOperationType(input.request)
  if (!rootType) return

  const customScalarsIndex = input.customScalarsIndex[operationTypeNameToRootTypeName[rootType]]
  if (!customScalarsIndex) return

  const queryUntyped = unType(input.request.query)
  const document = isString(queryUntyped) ? null : queryUntyped
  const documentOperations = document?.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION)
  const selectionSet = (documentOperations?.length === 1 ? documentOperations[0] : documentOperations?.find(d => {
    return d.name?.value === input.request.operationName
  }))?.selectionSet ?? null

  decode_({
    data: input.data,
    customScalarsIndex,
    documentPart: selectionSet,
  })
}

const decode_ = (input: {
  data: Grafaid.SomeData | null | undefined
  customScalarsIndex: CustomScalarsIndex.OutputObject
  documentPart: null | Grafaid.Nodes.SelectionSetNode
}): void => {
  const { data, customScalarsIndex, documentPart } = input
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    const documentField = documentPart?.selections.find(s => {
      return s.kind === Kind.FIELD && (s.alias?.value ?? s.name.value) === k
    }) as Grafaid.Nodes.FieldNode | undefined
    const kSchema = documentField?.name.value ?? k
    // console.log({ k, kSchema, documentField })

    const indexField = customScalarsIndex[kSchema]
    if (!indexField) continue

    const codec = indexField.o
    if (codec) {
      if (Array.isArray(v)) {
        data[k] = decodeListValue(v, codec)
      } else {
        data[k] = codec.decode(v)
      }
      continue
    }

    const indexFieldType = indexField.r
    if (indexFieldType) {
      decode_({
        data: v,
        customScalarsIndex: indexFieldType,
        documentPart: documentField?.selectionSet ?? null,
      })
      continue
    }

    throw new Error(`Unknown index item: ${String(indexField)}`)
  }
}

const decodeListValue = (value: any, codec: CodecString): any => {
  if (Array.isArray(value)) {
    return value.map(item => decodeListValue(item, codec))
  }
  return codec.decode(value)
}
