import type { GraphQLEnumValue, GraphQLField, GraphQLInputField, GraphQLSchema } from 'graphql'
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql'

export type TypeMapByKind =
  & {
    [Name in keyof NameToClassNamedType]: InstanceType<NameToClassNamedType[Name]>[]
  }
  & { GraphQLRootTypes: GraphQLObjectType<any, any>[] }

export const getTypeMapByKind = (schema: GraphQLSchema) => {
  const typeMap = schema.getTypeMap()
  const typeMapValues = Object.values(typeMap)
  const typeMapByKind: TypeMapByKind = {
    GraphQLRootTypes: [],
    GraphQLScalarType: [],
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
          typeMapByKind.GraphQLRootTypes.push(type)
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

export const NameToClassNamedType = {
  GraphQLScalarType: GraphQLScalarType,
  GraphQLObjectType: GraphQLObjectType,
  GraphQLInterfaceType: GraphQLInterfaceType,
  GraphQLUnionType: GraphQLUnionType,
  GraphQLEnumType: GraphQLEnumType,
  GraphQLInputObjectType: GraphQLInputObjectType,
}

export type NameToClassNamedType = typeof NameToClassNamedType

export const NamedNameToClass = {
  GraphQLScalarType: GraphQLScalarType,
  GraphQLObjectType: GraphQLObjectType,
  GraphQLInterfaceType: GraphQLInterfaceType,
  GraphQLUnionType: GraphQLUnionType,
  GraphQLEnumType: GraphQLEnumType,
  GraphQLInputObjectType: GraphQLInputObjectType,
} as const

export type NamedNameToClass = typeof NamedNameToClass

export const NameToClass = {
  GraphQLNonNull: GraphQLNonNull,
  GraphQLList: GraphQLList,
  ...NamedNameToClass,
} as const

export type AnyGraphQLOutputField = GraphQLField<any, any, any>

export type AnyField = AnyGraphQLOutputField | GraphQLInputField

export type NameToClass = typeof NameToClass

export type NodeName = keyof NameToClass

export type NodeNamePlus = NodeName | 'GraphQLField'

export type AnyNamedClassName = keyof NamedNameToClass

export type AnyClass = InstanceType<NameToClass[keyof NameToClass]>

export const isGraphQLOutputField = (object: object): object is AnyGraphQLOutputField => {
  return `args` in object
}

/**
 * Groups
 */

export type Describable =
  | GraphQLUnionType
  | GraphQLObjectType
  | GraphQLInputObjectType
  | AnyField
  | GraphQLInterfaceType
  | GraphQLEnumType

export const getNodeName = (node: Describable): NodeNamePlus => {
  switch (true) {
    case node instanceof GraphQLObjectType:
      return `GraphQLObjectType`
    case node instanceof GraphQLInputObjectType:
      return `GraphQLInputObjectType`
    case node instanceof GraphQLUnionType:
      return `GraphQLUnionType`
    case node instanceof GraphQLInterfaceType:
      return `GraphQLInterfaceType`
    case node instanceof GraphQLEnumType:
      return `GraphQLEnumType`
    case node instanceof GraphQLScalarType:
      return `GraphQLScalarType`
    default:
      return `GraphQLField`
      throw new Error(`Unknown node type: ${node.name}`)
  }
}

// const displayNames = {
//   GraphQLEnumType: `Enum`,
//   GraphQLInputObjectType: `InputObject`,
//   GraphQLInterfaceType: `Interface`,
//   GraphQLList: `List`,
//   GraphQLNonNull: `NonNull`,
//   GraphQLObjectType: `Object`,
//   GraphQLScalarType: `Scalar`,
//   GraphQLUnionType: `Union`,
// } satisfies Record<NodeName, string>

export const getNodeDisplayName = (node: Describable) => {
  return toDisplayName(getNodeName(node))
}

const toDisplayName = (nodeName: NodeNamePlus) => {
  return nodeName.replace(/^GraphQL/, ``).replace(/Type$/, ``)
}

export const isDeprecatableNode = (node: object): node is GraphQLEnumValue | AnyField => {
  return `deprecationReason` in node
}
