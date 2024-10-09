import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  type GraphQLSchema,
  GraphQLUnionType,
} from 'graphql'
import { isScalarTypeAndCustom, type NameToClassNamedType } from './schema.js'

export type KindMap =
  & {
    [Name in keyof NameToClassNamedType]: InstanceType<NameToClassNamedType[Name]>[]
  }
  & { GraphQLRootType: GraphQLObjectType[] }
  & { GraphQLScalarTypeCustom: GraphQLScalarType<any, any>[] }
  & { GraphQLScalarTypeStandard: GraphQLScalarType<any, any>[] }

export const getKindMap = (schema: GraphQLSchema): KindMap => {
  const typeMap = schema.getTypeMap()
  const typeMapValues = Object.values(typeMap)
  const typeMapByKind: KindMap = {
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

export const hasMutation = (typeMapByKind: KindMap) => typeMapByKind.GraphQLRootType.find((_) => _.name === `Mutation`)

export const hasSubscription = (typeMapByKind: KindMap) =>
  typeMapByKind.GraphQLRootType.find((_) => _.name === `Subscription`)

export const hasQuery = (typeMapByKind: KindMap) => typeMapByKind.GraphQLRootType.find((_) => _.name === `Query`)

export const getInterfaceImplementors = (typeMap: KindMap, interfaceTypeSearch: GraphQLInterfaceType) => {
  return typeMap.GraphQLObjectType.filter(objectType =>
    objectType.getInterfaces().filter(interfaceType => interfaceType.name === interfaceTypeSearch.name).length > 0
  )
}

export const hasCustomScalars = (typeMapByKind: KindMap) => {
  return typeMapByKind.GraphQLScalarTypeCustom.length > 0
}
