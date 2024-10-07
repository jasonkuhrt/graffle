import type { GraphQLSchema } from 'graphql'
import {
  type GraphQLArgument,
  GraphQLEnumType,
  type GraphQLField,
  type GraphQLInputField,
  GraphQLInterfaceType,
  type GraphQLNamedOutputType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql'
import {
  getNamedType,
  GraphQLInputObjectType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import { casesExhausted } from '../prelude.js'

export {
  getNullableType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  type GraphQLType,
  GraphQLUnionType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNullableType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'

export const isHasCustomScalars = (
  node: GraphQLNamedOutputType | GraphQLField<any, any> | GraphQLInputObjectType,
): boolean => {
  if (isInputObjectType(node)) {
    return isHasCustomScalarInputs(node)
  }

  return isHasCustomScalarOutputs(node) || isHasCustomScalarInputs(node)
}

export const isHasCustomScalarOutputs = (
  node:
    | GraphQLNamedOutputType
    | GraphQLField<any, any>,
): boolean => {
  return isHasCustomScalarOutputs_(node, [])
}

const isHasCustomScalarOutputs_ = (
  node: GraphQLNamedOutputType | GraphQLField<any, any>,
  typePath: string[],
): boolean => {
  if (isGraphQLField(node)) {
    const fieldType = getNamedType(node.type)
    return isHasCustomScalarOutputs_(fieldType, typePath)
  }

  if (isEnumType(node)) {
    return false
  }

  if (isScalarType(node)) {
    return isScalarTypeAndCustom(node)
  }

  if (typePath.includes(node.name)) {
    // End Via Short-Circuit: We've already come from this type.
    return false
  } else {
    typePath = [...typePath, node.name]
  }

  if (isObjectType(node) || isInterfaceType(node)) {
    return Object.values(node.getFields()).some(field => isHasCustomScalarOutputs_(field, typePath))
  }

  if (isUnionType(node)) {
    return node.getTypes().some(type => isHasCustomScalarOutputs_(type, typePath))
  }

  throw casesExhausted(node)
}

export const isHasCustomScalarInputs = (
  node:
    | GraphQLNamedOutputType
    | GraphQLInputObjectType
    | GraphQLInputField
    | GraphQLArgument
    | GraphQLField<any, any>,
): boolean => {
  return isHasCustomScalarInputs_(node, [])
}

const isHasCustomScalarInputs_ = (
  node: GraphQLInputObjectType | GraphQLNamedOutputType | GraphQLArgument | GraphQLField<any, any>,
  typePath: string[],
): boolean => {
  if (isGraphQLArgumentOrInputField(node)) {
    return isHasCustomScalarInputs_(getNamedType(node.type), typePath)
  }

  if (isGraphQLField(node)) {
    const fieldType = getNamedType(node.type)
    return node.args.some(arg => isHasCustomScalarInputs_(arg, typePath))
      || (isObjectType(fieldType) && isHasCustomScalarInputs_(fieldType, typePath))
  }

  if (isEnumType(node)) {
    return false
  }

  if (isScalarType(node)) {
    return isScalarTypeAndCustom(node)
  }

  if (typePath.includes(node.name)) {
    // End Via Short-Circuit: We've already come from this type.
    return false
  } else {
    typePath = [...typePath, node.name]
  }

  if (isInputObjectType(node)) {
    return Object.values(node.getFields()).some(field => isHasCustomScalarInputs_(field, typePath))
  }

  if (isObjectType(node) || isInterfaceType(node)) {
    return Object.values(node.getFields()).some(field => isHasCustomScalarInputs_(field, typePath))
  }

  if (isUnionType(node)) {
    return false
  }

  throw casesExhausted(node)
}

export const isGraphQLArgumentOrInputField = (value: object): value is GraphQLArgument | GraphQLInputField => {
  return `defaultValue` in value
}

export const isGraphQLField = (value: object): value is GraphQLField<any, any> => {
  return `args` in value
}

export const isScalarTypeCustom = (node: GraphQLScalarType): boolean => {
  return node.astNode !== undefined
}

export const isScalarTypeAndCustom = (node: unknown): node is GraphQLScalarType => {
  return isScalarType(node) && node.astNode !== undefined
}

export const getInterfaceImplementors = (typeMap: TypeMapByKind, interfaceTypeSearch: GraphQLInterfaceType) => {
  return typeMap.GraphQLObjectType.filter(objectType =>
    objectType.getInterfaces().filter(interfaceType => interfaceType.name === interfaceTypeSearch.name).length > 0
  )
}

export type TypeMapByKind =
  & {
    [Name in keyof NameToClassNamedType]: InstanceType<NameToClassNamedType[Name]>[]
  }
  & { GraphQLRootType: GraphQLObjectType[] }
  & { GraphQLScalarTypeCustom: GraphQLScalarType<any, any>[] }
  & { GraphQLScalarTypeStandard: GraphQLScalarType<any, any>[] }

export const NameToClassNamedType = {
  GraphQLScalarType: GraphQLScalarType,
  GraphQLObjectType: GraphQLObjectType,
  GraphQLInterfaceType: GraphQLInterfaceType,
  GraphQLUnionType: GraphQLUnionType,
  GraphQLEnumType: GraphQLEnumType,
  GraphQLInputObjectType: GraphQLInputObjectType,
}

export type NameToClassNamedType = typeof NameToClassNamedType

export const getTypeMapByKind = (schema: GraphQLSchema) => {
  const typeMap = schema.getTypeMap()
  const typeMapValues = Object.values(typeMap)
  const typeMapByKind: TypeMapByKind = {
    GraphQLRootType: [],
    GraphQLScalarType: [],
    GraphQLScalarTypeCustom: [],
    GraphQLScalarTypeStandard: [],
    GraphQLEnumType: [],
    GraphQLInputObjectType: [],
    GraphQLInterfaceType: [],
    GraphQLObjectType: [],
    GraphQLUnionType: [],
  }
  for (const type of typeMapValues) {
    if (type.name.startsWith(`__`)) continue
    switch (true) {
      case type instanceof GraphQLScalarType:
        typeMapByKind.GraphQLScalarType.push(type)
        if (isScalarTypeAndCustom(type)) {
          typeMapByKind.GraphQLScalarTypeCustom.push(type)
        } else {
          typeMapByKind.GraphQLScalarTypeStandard.push(type)
        }
        break
      case type instanceof GraphQLEnumType:
        typeMapByKind.GraphQLEnumType.push(type)
        break
      case type instanceof GraphQLInputObjectType:
        typeMapByKind.GraphQLInputObjectType.push(type)
        break
      case type instanceof GraphQLInterfaceType:
        typeMapByKind.GraphQLInterfaceType.push(type)
        break
      case type instanceof GraphQLObjectType:
        if (type.name === `Query` || type.name === `Mutation` || type.name === `Subscription`) {
          typeMapByKind.GraphQLRootType.push(type)
        } else {
          typeMapByKind.GraphQLObjectType.push(type)
        }
        break
      case type instanceof GraphQLUnionType:
        typeMapByKind.GraphQLUnionType.push(type)
        break
      default:
        // skip
        break
    }
  }
  return typeMapByKind
}
