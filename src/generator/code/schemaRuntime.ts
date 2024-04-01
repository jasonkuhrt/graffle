import type { GraphQLEnumType, GraphQLInterfaceType, GraphQLScalarType, GraphQLUnionType } from 'graphql'
import {
  type GraphQLObjectType,
  isEnumType,
  isInterfaceType,
  isListType,
  isNamedType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import type { AnyClass, AnyField } from '../../lib/graphql.js'
import { hasMutation, hasQuery, hasSubscription, unwrapToNonNull } from '../../lib/graphql.js'
import type { Config } from './code.js'

export const generateRuntimeSchema = (
  config: Config,
) => {
  const code: string[] = []
  code.push(
    `
    import * as _ from '${config.libraryPaths.schema}'
    import * as $Scalar from './Scalar.js'
    `,
  )

  code.push(
    config.typeMapByKind.GraphQLEnumType.map(type => enum$(config, type)).join(`\n`),
    config.typeMapByKind.GraphQLRootTypes.map(type => object(config, type)).join(`\n`),
    config.typeMapByKind.GraphQLObjectType.map(type => object(config, type)).join(`\n`),
    config.typeMapByKind.GraphQLUnionType.map(type => union(config, type)).join(`\n`),
    config.typeMapByKind.GraphQLInterfaceType.map(type => interface$(config, type)).join(`\n`),
  )

  code.push(
    index(config),
  )

  return code.join(`\n`)
}

const index = (config: Config) => {
  // todo input objects for decode/encode input object fields
  return `
    export const $Index = {
      Root: {
        Query ${hasQuery(config.typeMapByKind) ? `` : `:null`} ,
        Mutation ${hasMutation(config.typeMapByKind) ? `` : `:null`},
        Subscription ${hasSubscription(config.typeMapByKind) ? `` : `:null`}
      },
      objects: {
        ${config.typeMapByKind.GraphQLObjectType.map(_ => `${_.name}`).join(`,\n`)},
      },
      unions: {
        ${config.typeMapByKind.GraphQLUnionType.map(_ => `${_.name}`).join(`,\n`)},
      }
    }
  `
}

const union = (config: Config, type: GraphQLUnionType) => {
  // todo probably need thunks here
  const members = type.getTypes().map(t => t.name).join(`, `)
  return `export const ${type.name} = _.Union(\`${type.name}\`, [${members}])\n`
}

const interface$ = (config: Config, type: GraphQLInterfaceType) => {
  // todo probably need thunks here
  const implementors = config.typeMapByKind.GraphQLObjectType.filter(_ =>
    _.getInterfaces().filter(_ => _.name === type.name).length > 0
  ).map(_ => _.name).join(`,`)
  const fields = Object.values(type.getFields()).map((field) => {
    return `${field.name}: ${outputField(config, field)}`
  }).join(`,\n`)
  return `export const ${type.name} = _.Interface(\`${type.name}\`, {${fields}}, [${implementors}])`
}

const enum$ = (config: Config, type: GraphQLEnumType) => {
  const members = type.getValues().map((value) => {
    return `\`${value.name}\``
  }).join(`, `)
  return `export const ${type.name} = _.Enum(\`${type.name}\`, [${members}])`
}

const object = (config: Config, type: GraphQLObjectType) => {
  const fields = Object.values(type.getFields()).map((field) => {
    return `${field.name}: ${outputField(config, field)}`
  }).join(`,\n`)
  return `
    export const ${type.name} = _.Object(\`${type.name}\`, {
      ${fields}
    })
	`
}

const outputField = (config: Config, field: AnyField): string => {
  const type = buildType(`output`, config, field.type)

  // const args = isGraphQLOutputField(field) && field.args.length > 0
  //   ? renderArgs(config, field.args)
  //   : null

  // return `_.Output.field<${type}${args ? `, ${args}` : ``}>`
  return `_.Output.field(${type})`
}

const scalar = (config: Config, type: GraphQLScalarType) => {
  return `$Scalar.${type.name}`
}

const dispatchNamedType = (config: Config, type: AnyClass) => {
  if (isScalarType(type)) return scalar(config, type)
  if (isEnumType(type)) return type.name
  if (isObjectType(type)) return thunk(type.name)
  if (isInterfaceType(type)) return thunk(type.name)
  if (isUnionType(type)) return thunk(type.name)

  throw new Error(`Unhandled type: ${String(type)}`)
}

const thunk = (code: string) => `() => ${code}`

const buildType = (direction: 'input' | 'output', config: Config, node: AnyClass) => {
  const ns = direction === `input` ? `Input` : `Output`
  const { ofType: nodeInner, nullable } = unwrapToNonNull(node)

  if (isNamedType(nodeInner)) {
    const namedTypeReference = dispatchNamedType(config, nodeInner)
    const namedTypeCode = namedTypeReference
    return nullable
      ? `_.${ns}.Nullable(${namedTypeCode})`
      : namedTypeCode
  }

  if (isListType(nodeInner)) {
    const fieldType = `_.${ns}.List(${buildType(direction, config, nodeInner.ofType)})` as any as string
    return nullable
      ? `_.${ns}.Nullable(${fieldType})`
      : fieldType
  }

  throw new Error(`Unhandled type: ${String(node)}`)
}
