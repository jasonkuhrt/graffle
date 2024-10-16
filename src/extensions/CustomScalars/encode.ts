import { applyCodec } from '../../layers/1_Schema/Hybrid/types/Scalar/Scalar.js'
import { Grafaid } from '../../lib/grafaid/__.js'
import { SchemaDrivenDataMap } from './schemaDrivenDataMap/types.js'

export const encodeRequestVariables = ({ sddm, request }: {
  sddm: SchemaDrivenDataMap
  request: Grafaid.RequestAnalyzedDocumentNodeInput
}): void => {
  const variableDefinitions = request.operation.variableDefinitions
  if (!variableDefinitions) return

  const variableDefinitionsMap = new Map(variableDefinitions.map(v => [v.variable.name.value, v]))

  const variables = request.variables ?? {}

  // todo align the iteration strategy with other func.
  for (const variableName in variables) {
    const definition = variableDefinitionsMap.get(variableName)
    if (!definition) continue // todo in a strict mode could be error.

    const value = variables[variableName]
    if (value === undefined) continue

    const namedType = Grafaid.Document.getNamedType(definition.type)
    const sddmNamedType = sddm.types[namedType.name.value]
    if (!sddmNamedType) continue // todo in a strict mode could be error.

    encodeInputFieldLike(variables, variableName, value, sddmNamedType)
  }
}

const encodeInputFieldLike = (
  object: Record<string, any>,
  name: any,
  value: any,
  sddmNode: SchemaDrivenDataMap.InputLike,
) => {
  if (SchemaDrivenDataMap.isScalar(sddmNode)) {
    object[name] = applyCodec(sddmNode.codec.encode, value)
    return
  }

  if (SchemaDrivenDataMap.isInputObject(sddmNode)) {
    // We could iterate here by two strategies:
    // 1. The number of fields in the variables object given to execute against the document operation.
    // 2. The number of custom scalar fields (direct or transient) on this schema object.
    // The optimal choice is about which is smaller.
    // TODO let users supply an algorithm choice.
    for (const nameOfFieldIsOrContainingCustomScalar of sddmNode.fcs ?? []) {
      if (!(typeof value === `object` && value !== null)) continue

      const variableValue2 = value[nameOfFieldIsOrContainingCustomScalar]
      if (variableValue2 === undefined) continue

      const sddmNode2 = sddmNode.f?.[nameOfFieldIsOrContainingCustomScalar]
      if (!sddmNode2?.nt) continue

      encodeInputFieldLike(value, nameOfFieldIsOrContainingCustomScalar, variableValue2, sddmNode2.nt)
    }
  }
}
