import { Kind, parse } from 'graphql'
import type { Grafaid } from '../../lib/grafaid/__.js'
import { operationTypeNameToRootTypeName, parseOperationType } from '../../lib/grafaid/graphql.js'
import { unType } from '../../lib/grafaid/typed-document/TypedDocument.js'
import { isString } from '../../lib/prelude.js'
import { applyCodec } from '../1_Schema/Hybrid/types/Scalar/Scalar.js'
import { SchemaDrivenDataMap } from './schemaDrivenDataMap/types.js'

/**
 * If a document is given then aliases will be decoded as well.
 */
export const decodeCustomScalars = (input: {
  data: Grafaid.SomeData | null | undefined
  sddm: SchemaDrivenDataMap
  request: Grafaid.RequestInput
}) => {
  const rootType = parseOperationType(input.request)
  if (!rootType) return

  const sddmOutputObject = input.sddm.roots[operationTypeNameToRootTypeName[rootType]]
  if (!sddmOutputObject) return

  const queryUntyped = unType(input.request.query)
  // todo expose an option to optimize string interface by not parsing it. Explain the caveat of losing support for custom scalars in aliased positions.
  // const document = isString(queryUntyped) ? null : queryUntyped
  const document = (isString(queryUntyped) ? parse(queryUntyped) : queryUntyped) as Grafaid.Nodes.DocumentNode | null
  const documentOperations = document?.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION)
  const selectionSet = (documentOperations?.length === 1 ? documentOperations[0] : documentOperations?.find(d => {
    return d.name?.value === input.request.operationName
  }))?.selectionSet ?? null

  decode_({
    data: input.data,
    sddmOutputObject,
    documentPart: selectionSet,
  })
}

const decode_ = (input: {
  data: Grafaid.SomeData | null | undefined
  sddmOutputObject: SchemaDrivenDataMap.OutputObject
  documentPart: null | Grafaid.Nodes.SelectionSetNode
}): void => {
  const { data, sddmOutputObject, documentPart } = input
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    // todo: test case of a custom scalar whose encoded value would be falsy in JS, like 0 or empty string
    if (v === null) continue

    const documentField = findDocumentField(documentPart, k)

    const kSchema = documentField?.name.value ?? k

    const sddmOutputField = sddmOutputObject.f[kSchema]
    if (!sddmOutputField) continue

    const sddmNode = sddmOutputField.nt

    // console.log(sddmNode)
    if (SchemaDrivenDataMap.isScalar(sddmNode)) {
      data[k] = applyCodec(sddmNode.codec.decode, v)
    } else if (SchemaDrivenDataMap.isOutputObject(sddmNode)) {
      decode_({
        data: v,
        sddmOutputObject: sddmNode,
        documentPart: documentField?.selectionSet ?? null,
      })
    } else {
      // enums not decoded.
    }
  }
}

const findDocumentField = (
  selectionSet: null | Grafaid.Nodes.SelectionSetNode,
  k: string,
): Grafaid.Nodes.FieldNode | null => {
  if (!selectionSet) return null

  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.FIELD && (selection.alias?.value ?? selection.name.value) === k) {
      return selection
    }
    if (selection.kind === Kind.INLINE_FRAGMENT) {
      const result = findDocumentField(selection.selectionSet, k)
      if (result !== null) return result
    }
  }

  return null
}
