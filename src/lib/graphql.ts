import type {
  DocumentNode,
  GraphQLEnumValue,
  GraphQLError,
  GraphQLField,
  GraphQLInputField,
  GraphQLSchema,
} from 'graphql'
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
  isListType,
  isNonNullType,
} from 'graphql'
import type { Errors } from './errors/__.js'

export type TypeMapByKind =
  & {
    [Name in keyof NameToClassNamedType]: InstanceType<NameToClassNamedType[Name]>[]
  }
  & { GraphQLRootType: GraphQLObjectType[] }
  & { GraphQLScalarTypeCustom: GraphQLScalarType<any, any>[] }
  & { GraphQLScalarTypeStandard: GraphQLScalarType<any, any>[] }

export const standardScalarTypeNames = {
  String: `String`,
  ID: `ID`,
  Int: `Int`,
  Float: `Float`,
  Boolean: `Boolean`,
}

export const RootTypeName = {
  Query: `Query`,
  Mutation: `Mutation`,
  Subscription: `Subscription`,
} as const

export const operationTypeNameToRootTypeName = {
  query: `Query`,
  mutation: `Mutation`,
  subscription: `Subscription`,
} as const

export const rootTypeNameToOperationName = {
  Query: `query`,
  Mutation: `mutation`,
  Subscription: `subscription`,
} as const

export type RootTypeName = keyof typeof RootTypeName

export const isStandardScalarType = (type: GraphQLScalarType) => {
  return type.name in standardScalarTypeNames
}

export const isCustomScalarType = (type: GraphQLScalarType) => {
  return !isStandardScalarType(type)
}

export const unwrapToNamed = (
  type: AnyClass,
): AnyClass => {
  if (isNonNullType(type)) return unwrapToNamed(unwrapToNonNull(type).ofType)
  if (isListType(type)) return unwrapToNamed(type.ofType)
  return type
}

export const unwrapToNonNull = (
  type: AnyClass,
): { ofType: AnyClass; nullable: boolean } => {
  const [nodeUnwrapped, nullable] = type instanceof GraphQLNonNull ? [type.ofType, false] : [type, true]
  return { ofType: nodeUnwrapped, nullable }
}

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
        if (isCustomScalarType(type)) {
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

export type ClassToName<C> = C extends GraphQLScalarType ? `GraphQLScalarType`
  : C extends GraphQLObjectType ? `GraphQLObjectType`
  : C extends GraphQLInterfaceType ? `GraphQLInterfaceType`
  : C extends GraphQLUnionType ? `GraphQLUnionType`
  : C extends GraphQLEnumType ? `GraphQLEnumType`
  : C extends GraphQLInputObjectType ? `GraphQLInputObjectType`
  : C extends GraphQLList<any> ? `GraphQLList`
  : C extends GraphQLNonNull<any> ? `GraphQLNonNull`
  : never

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

export type AnyGraphQLOutputField = GraphQLField<any, any>

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

export const hasQuery = (typeMapByKind: TypeMapByKind) => typeMapByKind.GraphQLRootType.find((_) => _.name === `Query`)

export const hasMutation = (typeMapByKind: TypeMapByKind) =>
  typeMapByKind.GraphQLRootType.find((_) => _.name === `Mutation`)

export const hasSubscription = (typeMapByKind: TypeMapByKind) =>
  typeMapByKind.GraphQLRootType.find((_) => _.name === `Subscription`)

export type StandardScalarVariables = {
  [key: string]: string | boolean | null | number | StandardScalarVariables
}

export type GraphQLExecutionResultError = Errors.ContextualAggregateError<GraphQLError>

export const OperationTypes = {
  query: `query`,
  mutation: `mutation`,
  subscription: `subscription`,
} as const

type OperationTypeQuery = typeof OperationTypes['query']
type OperationTypeMutation = typeof OperationTypes['mutation']
type OperationTypeSubscription = typeof OperationTypes['subscription']

export type OperationTypeName = OperationTypeQuery | OperationTypeMutation
export type OperationTypeNameAll = OperationTypeName | OperationTypeSubscription

export const OperationTypeAccessTypeMap = {
  query: `read`,
  mutation: `write`,
  subscription: `read`,
} as const

export const isOperationTypeName = (value: unknown): value is OperationTypeName =>
  value === `query` || value === `mutation`

export type GraphQLRequestEncoded = {
  query: string
  variables?: StandardScalarVariables
  operationName?: string
}

export type GraphQLRequestInput = {
  document: string | DocumentNode
  variables?: StandardScalarVariables
  operationName?: string
}

const definedOperationPattern = new RegExp(`^\\b(${Object.values(OperationTypes).join(`|`)})\\b`)

export const parseGraphQLOperationType = (request: GraphQLRequestEncoded): OperationTypeNameAll | null => {
  const { operationName, query: document } = request

  const definedOperations = document.split(/[{}\n]+/).map(s => s.trim()).map(line => {
    const match = line.match(definedOperationPattern)
    if (!match) return null
    return {
      line,
      operationType: match[0] as OperationTypeNameAll,
    }
  }).filter(Boolean)

  // Handle obviously invalid cases that are zero cost to compute.

  // The given operation name will not match to anything.
  if (definedOperations.length > 1 && !request.operationName) return null

  // An operation name is required but was not given.
  if (definedOperations.length === 0 && request.operationName) return null

  // Handle optimistically assumed valid case short circuits.

  if (definedOperations.length === 0) {
    // Assume that the implicit query syntax is being used.
    // This is a non-validated optimistic approach for performance, not aimed at correctness.
    // For example its not checked if the document is actually of the syntactic form `{ ... }`
    return OperationTypes.query
  }

  // Continue to the full search.

  const definedOperationToAnalyze = operationName
    ? definedOperations.find(o => o?.line.includes(operationName))
    : definedOperations[0]

  // Invalid: The given operation name does not show up in the document.
  if (!definedOperationToAnalyze) return null

  return definedOperationToAnalyze.operationType
}
