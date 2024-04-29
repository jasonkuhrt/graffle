import type {
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql'
import {
  type GraphQLObjectType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNamedType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import type { AnyClass, AnyGraphQLOutputField } from '../../../lib/graphql.js'
import { hasMutation, hasQuery, hasSubscription, unwrapToNamed, unwrapToNonNull } from '../../../lib/graphql.js'
import { createCodeGenerator } from '../createCodeGenerator.js'
import type { Config } from '../generateCode.js'
import { moduleNameScalar } from './Scalar.js'

export const { generate: generateRuntimeSchema, moduleName: moduleNameSchemaRuntime } = createCodeGenerator(
  `SchemaRuntime`,
  (
    config,
  ) => {
    const code: string[] = []

    code.push(`/* eslint-disable */\n`)
    code.push(
      `
      import * as $ from '${config.libraryPaths.schema}'
      import * as $Scalar from './${moduleNameScalar}.js'
    `,
    )

    code.push(
      config.typeMapByKind.GraphQLEnumType.map(type => enum$(config, type)).join(`\n`),
      config.typeMapByKind.GraphQLInputObjectType.map(type => inputObject(config, type)).join(`\n`),
      config.typeMapByKind.GraphQLObjectType.map(type => object(config, type)).join(`\n`),
      config.typeMapByKind.GraphQLUnionType.map(type => union(config, type)).join(`\n`),
      config.typeMapByKind.GraphQLInterfaceType.map(type => interface$(config, type)).join(`\n`),
      config.typeMapByKind.GraphQLRootType.map(type => object(config, type)).join(`\n`),
    )

    code.push(
      index(config),
    )

    return code.join(`\n`)
  },
)

const index = (config: Config) => {
  // todo input objects for decode/encode input object fields
  return `
    export const $Index = {
      name: "${config.name}" as const,
      Root: {
        Query ${hasQuery(config.typeMapByKind) ? `` : `:null`} ,
        Mutation ${hasMutation(config.typeMapByKind) ? `` : `:null`},
        Subscription ${hasSubscription(config.typeMapByKind) ? `` : `:null`}
      },
      objects: {
        ${config.typeMapByKind.GraphQLObjectType.map(type => type.name).join(`,\n`)}
      },
      unions: {
        ${config.typeMapByKind.GraphQLUnionType.map(type => type.name).join(`,\n`)}
      },
      interfaces: {
        ${config.typeMapByKind.GraphQLInterfaceType.map(type => type.name).join(`,\n`)}
      },
      error: {
        objects: {
          ${config.error.objects.map(type => type.name).join(`,\n`)}
        },
        objectsTypename: {
         ${config.error.objects.map(_ => `${_.name}: { __typename: "${_.name}" }`).join(`,\n`)}
        },
        rootResultFields: {
          ${
    Object.entries(config.rootTypes).map(([rootTypeName, rootType]) => {
      if (!rootType) return `${rootTypeName}: {}`

      const resultFields = Object.values(rootType.getFields()).filter((field) => {
        const type = unwrapToNamed(field.type)
        return isUnionType(type)
          && type.getTypes().some(_ => config.error.objects.some(__ => __.name === _.name))
      }).map((field) => field.name)

      return `${rootType.name}: {\n${resultFields.map(_ => `${_}: "${_}" as const`).join(`,\n`)} }`
    }).join(`,\n`)
  }
        }
      }
    }
  `
}

const union = (_config: Config, type: GraphQLUnionType) => {
  // todo probably need thunks here
  const members = type.getTypes().map(t => t.name).join(`, `)
  return `
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  export const ${type.name} = $.Union(\`${type.name}\`, [${members}])\n`
}

const interface$ = (config: Config, type: GraphQLInterfaceType) => {
  // todo probably need thunks here
  const implementors = config.typeMapByKind.GraphQLObjectType.filter(_ =>
    _.getInterfaces().filter(_ => _.name === type.name).length > 0
  ).map(_ => _.name).join(`,`)
  const fields = Object.values(type.getFields()).map((field) => {
    return `${field.name}: ${outputField(config, field)}`
  }).join(`,\n`)
  return `export const ${type.name} = $.Interface(\`${type.name}\`, {${fields}}, [${implementors}])`
}

const enum$ = (_config: Config, type: GraphQLEnumType) => {
  const members = type.getValues().map((value) => {
    return `\`${value.name}\``
  }).join(`, `)
  return `export const ${type.name} = $.Enum(\`${type.name}\`, [${members}])`
}

const object = (config: Config, type: GraphQLObjectType) => {
  const fields = Object.values(type.getFields()).map((field) => {
    return `${field.name}: ${outputField(config, field)}`
  }).join(`,\n`)
  return `
    // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
    export const ${type.name} = $.Object$(\`${type.name}\`, {
      ${fields}
    })
	`
}

const inputObject = (config: Config, type: GraphQLInputObjectType) => {
  const fields = Object.values(type.getFields()).map((field) => `${field.name}: ${inputField(config, field)}`).join(
    `,\n`,
  )
  return `
    export const ${type.name} = $.InputObject(\`${type.name}\`, {
      ${fields}
    })
	`
}
unwrapToNamed

const inputField = (config: Config, field: GraphQLInputField): string => {
  const type = buildType(`input`, config, field.type)
  const isNeedThunk = isInputObjectType(unwrapToNamed(field.type))
  return `$.Input.field(${isNeedThunk ? `() => ${type}` : type})`
}

const outputField = (config: Config, field: AnyGraphQLOutputField): string => {
  const type = buildType(`output`, config, field.type)
  return field.args.length > 0
    ? `$.field(${type}, ${renderArgs(config, field.args)})`
    : `$.field(${type})`
}

const renderArgs = (config: Config, args: readonly GraphQLArgument[]) => {
  return `$.Args({${args.map(arg => renderArg(config, arg)).join(`, `)}})`
}

const renderArg = (config: Config, arg: GraphQLArgument) => {
  const type = buildType(`input`, config, arg.type)
  return `${arg.name}: ${type}`
}

const scalar = (_config: Config, type: GraphQLScalarType) => {
  return `$Scalar.${type.name}`
}

const dispatchNamedType = (config: Config, type: AnyClass) => {
  if (isScalarType(type)) return scalar(config, type)
  if (isEnumType(type)) return type.name
  if (isObjectType(type)) return thunk(type.name)
  if (isInterfaceType(type)) return thunk(type.name)
  if (isUnionType(type)) return thunk(type.name)
  if (isInputObjectType(type)) return type.name

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
      ? `$.${ns}.Nullable(${namedTypeCode})`
      : namedTypeCode
  }

  if (isListType(nodeInner)) {
    const fieldType = `$.${ns}.List(${buildType(direction, config, nodeInner.ofType)})` as any as string
    return nullable
      ? `$.${ns}.Nullable(${fieldType})`
      : fieldType
  }

  throw new Error(`Unhandled type: ${String(node)}`)
}
