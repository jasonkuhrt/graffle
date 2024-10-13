import { isScalar } from '../1_Schema/Hybrid/types/Scalar/Scalar.js'
import type { SchemaDrivenDataMap } from '../7_extensions/CustomScalars/schemaDrivenDataMap/types.js'

/**
 * Infer the type of a variable for the given argument.
 * This basically just transfers the inline type from the argument to the variable.
 * The argument's inline type is known from the SDDM.
 *
 * Aside: Interestingly its representation in a GraphQL operation variable is as a string, not any kind of node.
 */
export const inferVariableType = (sddmArgLike: SchemaDrivenDataMap.ArgumentOrInputField): string => {
  if (sddmArgLike.it) {
    const isRequiredIndicator = sddmArgLike.it[0] === 1 ? `!` : ``
    const namedType = inferNamedType(sddmArgLike)
    return inferTypeInline(sddmArgLike.it[1], namedType) + isRequiredIndicator
  }
  return inferNamedType(sddmArgLike)
}

const inferTypeInline = (sddmInlineType: undefined | SchemaDrivenDataMap.InlineType, typeName: string): string => {
  if (!sddmInlineType) return typeName
  const isRequiredIndicator = sddmInlineType[0] === 1 ? `!` : ``
  return `[${inferTypeInline(sddmInlineType[1], typeName)}${isRequiredIndicator}]`
}

const inferNamedType = (sddmNode: SchemaDrivenDataMap.ArgumentOrInputField): string => {
  if (isScalar(sddmNode.nt)) {
    return sddmNode.nt.name
  }

  if (sddmNode.nt?.n) {
    return sddmNode.nt.n
  }

  throw new Error(`Unknown sddm node: ${String(sddmNode)}`)
}
