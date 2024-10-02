import type {
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedOutputType,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql'
import {
  getNamedType,
  type GraphQLInputObjectType,
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
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  type GraphQLType,
  isInputObjectType,
  isListType,
  isNullableType,
  isObjectType,
  isScalarType,
} from 'graphql'

export const isHasCustomScalarInputs = (
  node:
    | GraphQLInputObjectType
    | GraphQLObjectType
    | GraphQLScalarType
    | GraphQLEnumType
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
    // End
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

// const isOutput

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
