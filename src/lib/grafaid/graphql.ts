import type { GraphQLEnumValue, GraphQLError, GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql'
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
  isObjectType,
  isScalarType,
  isUnionType,
  OperationTypeNode,
} from 'graphql'
import type { Errors } from '../errors/__.js'
import { isString } from '../prelude.js'
import { Nodes } from './_Nodes.js'
import { TypedDocument } from './typed-document/__.js'

export * from './_Nodes.js'

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

export const isStandardScalarType = (type: GraphQLScalarType) => {
  return type.name in StandardScalarTypeNames
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

/**
 * Groups
 */

export type Describable =
  | GraphQLNamedType
  | AnyField

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

export const getTypeKind = <$Node extends GraphQLNamedType>(node: $Node): ClassToName<$Node> => {
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

export const getNodeDisplayName = (node: Describable) => {
  return toDisplayName(getNodeKindOld(node))
}

const toDisplayName = (nodeName: NodeNamePlus) => {
  return nodeName.replace(/^GraphQL/, ``).replace(/Type$/, ``)
}

export const isDeprecatableNode = (node: object): node is GraphQLEnumValue | AnyField => {
  return `deprecationReason` in node
}

export interface RequestInput {
  query: string | TypedDocument.TypedDocument
  variables?: Variables
  operationName?: string
}

export type Variables = {
  [key: string]: string | boolean | null | number | Variables
}

export type SomeData = Record<string, any>

export type GraphQLExecutionResultError = Errors.ContextualAggregateError<GraphQLError>

const definedOperationPattern = new RegExp(`^\\b(${Object.values(OperationTypeNode).join(`|`)})\\b`)

export const parseOperationType = (request: RequestInput): OperationTypeNode | null => {
  const { operationName, query: document } = request

  const documentUntyped = TypedDocument.unType(document)

  if (!isString(documentUntyped)) {
    for (const node of documentUntyped.definitions) {
      if (node.kind === Nodes.Kind.OPERATION_DEFINITION) {
        if (operationName ? node.name?.value === operationName : true) {
          return node.operation
        }
      }
    }
    throw new Error(`Could not parse operation type from document.`)
  }

  const definedOperations = documentUntyped.split(/[{}\n]+/).map(s => s.trim()).map(line => {
    const match = line.match(definedOperationPattern)
    if (!match) return null
    return {
      line,
      operationType: match[0] as OperationTypeNode,
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
    return OperationTypeNode.QUERY
  }

  // Continue to the full search.

  const definedOperationToAnalyze = operationName
    ? definedOperations.find(o => o.line.includes(operationName))
    : definedOperations[0]

  // Invalid: The given operation name does not show up in the document.
  if (!definedOperationToAnalyze) return null

  return definedOperationToAnalyze.operationType
}
