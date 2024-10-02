import type {
  DocumentNode,
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLError,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
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
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNonNullType,
  isObjectType,
  isScalarType,
  isUnionType,
  OperationTypeNode,
} from 'graphql'
import type { Errors } from '../errors/__.js'
import { isScalarTypeAndCustom } from './nodesSchema.js'

export * from './_Nodes.js'

export type TypeMapByKind =
  & {
    [Name in keyof NameToClassNamedType]: InstanceType<NameToClassNamedType[Name]>[]
  }
  & { GraphQLRootType: GraphQLObjectType[] }
  & { GraphQLScalarTypeCustom: GraphQLScalarType<any, any>[] }
  & { GraphQLScalarTypeStandard: GraphQLScalarType<any, any>[] }

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

export type TypeNamedKind = `Enum` | `InputObject` | `Interface` | `Object` | `Scalar` | `Union`

export type TypeMapKind = TypeNamedKind | `Root`

export const RootTypeName = {
  Query: `Query`,
  Mutation: `Mutation`,
  Subscription: `Subscription`,
} as const

export const isRootType = (value: unknown): value is GraphQLObjectType => {
  return isObjectType(value) && value.name in RootTypeName
}

export type RootTypeNameQuery = typeof RootTypeName['Query']
export type RootTypeNameMutation = typeof RootTypeName['Mutation']
export type RootTypeNameSubscription = typeof RootTypeName['Subscription']

export const operationTypeNameToRootTypeName = {
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

export type RootTypeName = keyof typeof RootTypeName

export const isStandardScalarType = (type: GraphQLScalarType) => {
  return type.name in StandardScalarTypeNames
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

export const hasCustomScalars = (typeMapByKind: TypeMapByKind) => {
  return typeMapByKind.GraphQLScalarTypeCustom.length > 0
}

/**
 * Groups
 */

export type Describable =
  | GraphQLNamedType
  | AnyField

export const getNodeNameAndKind = (
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

export const getNodeKind = <$Node extends GraphQLNamedType>(node: $Node): ClassToName<$Node> => {
  switch (true) {
    case isObjectType(node):
      return `GraphQLObjectType` as ClassToName<$Node>
    case isInputObjectType(node):
      return `GraphQLInputObjectType` as ClassToName<$Node>
    case isUnionType(node):
      return `GraphQLUnionType` as ClassToName<$Node>
    case isInterfaceType(node):
      return `GraphQLInterfaceType` as ClassToName<$Node>
    case isEnumType(node):
      return `GraphQLEnumType` as ClassToName<$Node>
    case isScalarType(node):
      return `GraphQLScalarType` as ClassToName<$Node>
    default:
      throw new Error(`Unknown node kind: ${String(node)}`)
  }
}

export const getNodeKindOld = (node: Describable): NodeNamePlus => {
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
  return toDisplayName(getNodeKindOld(node))
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

export type Variables = Record<string, unknown>

export type StandardScalarVariables = {
  [key: string]: string | boolean | null | number | StandardScalarVariables
}

export type SomeData = Record<string, any>

export type GraphQLExecutionResultError = Errors.ContextualAggregateError<GraphQLError>

export const OperationTypes = {
  query: `query`,
  mutation: `mutation`,
  subscription: `subscription`,
} as const

export namespace OperationType {
  export type Query = typeof OperationTypes['query']
  export type Mutation = typeof OperationTypes['mutation']
  export type Subscription = typeof OperationTypes['subscription']
}

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
  }).filter(_ => _ !== null)
  // console.log(definedOperations)

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
    ? definedOperations.find(o => o.line.includes(operationName))
    : definedOperations[0]

  // Invalid: The given operation name does not show up in the document.
  if (!definedOperationToAnalyze) return null

  return definedOperationToAnalyze.operationType
}

export const isAllArgsNonNullType = (args: readonly GraphQLArgument[]) => {
  return args.every(_ => isNonNullType(_.type))
}

export const isAllArgsNullable = (args: readonly GraphQLArgument[]) => {
  return !args.some(_ => isNonNullType(_.type))
}
export const analyzeArgsNullability = (args: readonly GraphQLArgument[]) => {
  let required = 0
  let optional = 0
  const total = args.length
  args.forEach(_ => {
    if (isNonNullType(_.type)) {
      required++
    } else {
      optional++
    }
  })
  return {
    hasAny: total > 0,
    isAllNullable: optional === total,
    required,
    optional,
    total,
  }
}

export const isAllInputObjectFieldsNullable = (node: GraphQLInputObjectType) => {
  return Object.values(node.getFields()).some(_ => !isNonNullType(_.type))
}
