import type { GraphQLSchema } from 'graphql'
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

export const getTypeMapByKind = (schema: GraphQLSchema) => {
  const typeMap = schema.getTypeMap()
  const typeMapValues = Object.values(typeMap)
  const typeMapByKind: {
    [Name in keyof NameToClassNamedType]: InstanceType<NameToClassNamedType[Name]>[]
  } & { GraphQLRootTypes: GraphQLObjectType<any, any>[] } = {
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

export const NameToClass = {
  GraphQLNonNull: GraphQLNonNull,
  GraphQLScalarType: GraphQLScalarType,
  GraphQLObjectType: GraphQLObjectType,
  GraphQLInterfaceType: GraphQLInterfaceType,
  GraphQLUnionType: GraphQLUnionType,
  GraphQLEnumType: GraphQLEnumType,
  GraphQLInputObjectType: GraphQLInputObjectType,
  GraphQLList: GraphQLList,
} as const

export type NameToClass = typeof NameToClass

export type AnyClass = InstanceType<NameToClass[keyof NameToClass]>
