import type { GraphQLNamedType, GraphQLScalarType } from 'graphql'
import {
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
  OperationTypeNode,
} from 'graphql'
import type { DescribableTypes, NodeNamePlus } from './schema/schema.js'

export * from './_Nodes.js'
export * from './request.js'

export const StandardScalarTypeNames = {
  String: `String`,
  ID: `ID`,
  Int: `Int`,
  Float: `Float`,
  Boolean: `Boolean`,
}

export type StandardScalarTypeNames = keyof typeof StandardScalarTypeNames

const TypeScriptPrimitiveTypeNames = {
  string: `string`,
  number: `number`,
  boolean: `boolean`,
}
type TypeScriptPrimitiveTypeNames = keyof typeof TypeScriptPrimitiveTypeNames

export const StandardScalarTypeTypeScriptMapping = {
  String: `string`,
  ID: `string`,
  Int: `number`,
  Float: `number`,
  Boolean: `boolean`,
} satisfies Record<
  StandardScalarTypeNames,
  TypeScriptPrimitiveTypeNames
>

export const operationTypeToRootType = {
  query: `Query`,
  mutation: `Mutation`,
  subscription: `Subscription`,
} as const

export const RootTypeNameToOperationName = {
  Query: OperationTypeNode.QUERY,
  Mutation: OperationTypeNode.MUTATION,
  Subscription: OperationTypeNode.SUBSCRIPTION,
} as const

export type RootTypeNameToOperationName = typeof RootTypeNameToOperationName

export const isStandardScalarType = (type: GraphQLScalarType) => {
  return type.name in StandardScalarTypeNames
}

/**
 * Groups
 */

export const getTypeNameAndKind = (
  node: GraphQLNamedType,
): { name: string; kind: 'Object' | 'Interface' | 'Union' | 'Enum' | 'Scalar' } => {
  const name = node.name
  const kind = getNodeKindOld(node).replace(`GraphQL`, ``).replace(`Type`, ``) as
    | 'Object'
    | 'Interface'
    | 'Union'
    | 'Enum'
    | 'Scalar'
  return { name, kind }
}

export const getNodeKindOld = (node: DescribableTypes): NodeNamePlus => {
  switch (true) {
    case isObjectType(node):
      return `GraphQLObjectType`
    case isInputObjectType(node):
      return `GraphQLInputObjectType`
    case isUnionType(node):
      return `GraphQLUnionType`
    case isInterfaceType(node):
      return `GraphQLInterfaceType`
    case isEnumType(node):
      return `GraphQLEnumType`
    case isScalarType(node):
      return `GraphQLScalarType`
    default:
      return `GraphQLField`
  }
}

export const getNodeDisplayName = (node: DescribableTypes) => {
  return toDisplayName(getNodeKindOld(node))
}

const toDisplayName = (nodeName: NodeNamePlus) => {
  return nodeName.replace(/^GraphQL/, ``).replace(/Type$/, ``)
}
