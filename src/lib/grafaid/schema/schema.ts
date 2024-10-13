import {
  type GraphQLArgument,
  GraphQLEnumType,
  type GraphQLEnumValue,
  type GraphQLField,
  type GraphQLInputField,
  GraphQLInterfaceType,
  GraphQLList,
  type GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNonNullType,
  isObjectType,
  isUnionType,
} from 'graphql'
import { GraphQLInputObjectType, isScalarType } from 'graphql'

export {
  getNamedType,
  getNullableType,
  type GraphQLArgument as Argument,
  GraphQLEnumType as EnumType,
  type GraphQLEnumValue as EnumValue,
  type GraphQLField as Field,
  type GraphQLInputField as InputField,
  GraphQLInputObjectType as InputObjectType,
  type GraphQLInputType as InputTypes,
  GraphQLInterfaceType as InterfaceType,
  GraphQLList as ListType,
  type GraphQLNamedType as NamedTypes,
  GraphQLNonNull as NonNullType,
  GraphQLObjectType as ObjectType,
  GraphQLScalarType as ScalarType,
  GraphQLSchema as Schema,
  type GraphQLType as Types,
  GraphQLUnionType as UnionType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNamedType,
  isNonNullType,
  isNullableType,
  isObjectType,
  isRequiredArgument,
  isRequiredInputField,
  isScalarType,
  isUnionType,
} from 'graphql'

export * as Args from './args.js'
export * as CustomScalars from './customScalars.js'
export * as KindMap from './kindMap.js'

export type DeprecatableNodes = GraphQLEnumValue | InputOrOutputField

export const isDeprecatableNode = (node: object): node is DeprecatableNodes => {
  return `deprecationReason` in node
}

export type InputOrOutputField = GraphQLField<any, any> | GraphQLInputField

export type AnyNamedClassName = keyof NamedNameToClass

export type NamedNameToClass = typeof NamedNameToClass

export type NameToClass = typeof NameToClass

export const NamedNameToClass = {
  GraphQLScalarType: GraphQLScalarType,
  GraphQLObjectType: GraphQLObjectType,
  GraphQLInterfaceType: GraphQLInterfaceType,
  GraphQLUnionType: GraphQLUnionType,
  GraphQLEnumType: GraphQLEnumType,
  GraphQLInputObjectType: GraphQLInputObjectType,
} as const

export const NameToClass = {
  GraphQLNonNull: GraphQLNonNull,
  GraphQLList: GraphQLList,
  ...NamedNameToClass,
} as const

export type DescribableTypes =
  | GraphQLNamedType
  | InputOrOutputField

export const isGraphQLOutputField = (object: object): object is GraphQLField<any, any> => {
  return `args` in object
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

export const isAllInputObjectFieldsNullable = (node: GraphQLInputObjectType) => {
  return Object.values(node.getFields()).some(_ => !isNonNullType(_.type))
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

export const RootTypeName = {
  Query: `Query`,
  Mutation: `Mutation`,
  Subscription: `Subscription`,
} as const

export type RootTypeName = keyof typeof RootTypeName

export type RootTypeNameQuery = typeof RootTypeName['Query']

export type RootTypeNameMutation = typeof RootTypeName['Mutation']

export type RootTypeNameSubscription = typeof RootTypeName['Subscription']

export const isRootType = (value: unknown): value is GraphQLObjectType => {
  return isObjectType(value) && value.name in RootTypeName
}

export type NodeName = keyof NameToClass

export type NodeNamePlus = NodeName | 'GraphQLField'

// export type AnyClass = InstanceType<NameToClass[keyof NameToClass]>

// dprint-ignore
export type ClassToName<C> =
    C extends GraphQLScalarType ? `GraphQLScalarType`
  : C extends GraphQLObjectType ? `GraphQLObjectType`
  : C extends GraphQLInterfaceType ? `GraphQLInterfaceType`
  : C extends GraphQLUnionType ? `GraphQLUnionType`
  : C extends GraphQLEnumType ? `GraphQLEnumType`
  : C extends GraphQLInputObjectType ? `GraphQLInputObjectType`
  : C extends GraphQLList<any> ? `GraphQLList`
  : C extends GraphQLNonNull<any> ? `GraphQLNonNull`
  : never

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

export type TypeNamedKind = `Enum` | `InputObject` | `Interface` | `Object` | `Scalar` | `Union`

export type NamedTypeKind = TypeNamedKind | `Root`
