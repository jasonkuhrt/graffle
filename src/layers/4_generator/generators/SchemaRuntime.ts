import {
  getNamedType,
  getNullableType,
  type GraphQLArgument,
  type GraphQLEnumType,
  type GraphQLInputField,
  type GraphQLInputObjectType,
  type GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  type GraphQLOutputType,
  GraphQLScalarType,
  type GraphQLUnionType,
  isNullableType,
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
import { Code } from '../../../lib/Code.js'
import type { AnyClass, AnyGraphQLOutputField } from '../../../lib/graphql.js'
import {
  hasMutation,
  hasQuery,
  hasSubscription,
  isAllArgsNullable,
  isAllInputObjectFieldsNullable,
} from '../../../lib/graphql.js'
import type { Config } from '../config.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorScalar } from './Scalar.js'
import { ModuleGeneratorSchemaIndex } from './SchemaIndex.js'

export const ModuleGeneratorSchemaRuntime = createModuleGenerator(
  `SchemaRuntime`,
  ({ config, code }) => {
    code.push(`/* eslint-disable */\n`)
    code.push(
      `
        import * as $ from '${config.paths.imports.grafflePackage.schema}'
        import * as Data from './${ModuleGeneratorData.name}.js'
        import * as $Scalar from './${ModuleGeneratorScalar.name}.js'
        import type { Index } from './${ModuleGeneratorSchemaIndex.name}.js'
      `,
    )

    code.push(
      `export const $defaultSchemaUrl = ${
        config.options.defaultSchemaUrl ? `new URL("${config.options.defaultSchemaUrl.href}")` : `undefined`
      }`,
    )

    code.push(
      config.schema.typeMapByKind.GraphQLEnumType.map(type => enum$(config, type)).join(`\n`),
      config.schema.typeMapByKind.GraphQLInputObjectType.map(type => inputObject(config, type)).join(`\n`),
      config.schema.typeMapByKind.GraphQLObjectType.map(type => object(config, type)).join(`\n`),
      config.schema.typeMapByKind.GraphQLUnionType.map(type => union(config, type)).join(`\n`),
      config.schema.typeMapByKind.GraphQLInterfaceType.map(type => interface$(config, type)).join(`\n`),
      config.schema.typeMapByKind.GraphQLRootType.map(type => object(config, type)).join(`\n`),
    )

    code.push(
      index(config),
    )

    return code
  },
)

const index = (config: Config) => {
  const rootTypesPresence = {
    Query: hasQuery(config.schema.typeMapByKind),
    Mutation: hasMutation(config.schema.typeMapByKind),
    Subscription: hasSubscription(config.schema.typeMapByKind),
  }
  // todo input objects for decode/encode input object fields
  const unions = config.schema.typeMapByKind.GraphQLUnionType.map(type => type.name).join(`,\n`)
  const objects = config.schema.typeMapByKind.GraphQLObjectType.map(type => type.name).join(`,\n`)
  const interfaces = config.schema.typeMapByKind.GraphQLInterfaceType.map(type => type.name).join(`,\n`)
  const roots = config.schema.typeMapByKind.GraphQLRootType.map(type => type.name).join(`,\n`)
  const enums = config.schema.typeMapByKind.GraphQLEnumType.map(type => type.name).join(`,\n`)
  const allTypes = [
    roots,
    unions,
    objects,
    interfaces,
    enums,
  ].filter(_ => _).join(`,\n`)

  return `
    export const $Index: Index = {
      name: Data.Name,
      RootTypesPresent: [${
    Object.entries(rootTypesPresence).filter(([_, present]) => present).map(([_]) => Code.quote(_)).join(`, `)
  }] as const,
      RootUnion: undefined as any, // Type level only.
      Root: {
        Query ${rootTypesPresence.Query ? `` : `:null`} ,
        Mutation ${rootTypesPresence.Mutation ? `` : `:null`},
        Subscription ${rootTypesPresence.Subscription ? `` : `:null`}
      },
      allTypes: {
        ${allTypes}
      },
      objects: {
        ${objects}
      },
      unions: {
        ${unions}
      },
      interfaces: {
        ${interfaces}
      },
      error: {
        objects: {
          ${config.schema.error.objects.map(type => type.name).join(`,\n`)}
        },
        objectsTypename: {
         ${config.schema.error.objects.map(_ => `${_.name}: { __typename: "${_.name}" }`).join(`,\n`)}
        },
        rootResultFields: {
          ${hasQuery(config.schema.typeMapByKind) ? `Query: {},` : ``}
          ${hasMutation(config.schema.typeMapByKind) ? `Mutation: {},` : ``}
          ${hasSubscription(config.schema.typeMapByKind) ? `Subscription: {},` : ``}
          ${
    Object.values(config.schema.typeMapByKind.GraphQLRootType).map((rootType) => {
      const resultFields = Object.values(rootType.getFields()).filter((field) => {
        const type = getNamedType(field.type)
        return isUnionType(type)
          && type.getTypes().some(_ => config.schema.error.objects.some(__ => __.name === _.name))
      }).map((field) => field.name)

      return `${rootType.name}: {\n${resultFields.map(_ => `${_}: "${_}" as const`).join(`,\n`)} }`
    }).join(`,\n`)
  }
        }
      }
    }
  `
}

const commentTsIgnoreCircDep =
  `// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.`

const union = (_config: Config, type: GraphQLUnionType) => {
  // todo probably need thunks here
  const members = type.getTypes().map(t => t.name).join(`, `)
  return `
    ${commentTsIgnoreCircDep}
    export const ${type.name} = $.Union(\`${type.name}\`, [${members}])\n`
}

const interface$ = (config: Config, type: GraphQLInterfaceType) => {
  // todo probably need thunks here
  const implementors = config.schema.typeMapByKind.GraphQLObjectType.filter(_ =>
    _.getInterfaces().filter(_ => _.name === type.name).length > 0
  ).map(_ => _.name).join(`,`)
  const fields = Object.values(type.getFields()).map((field) => {
    // todo test case for this directive being present
    const maybeCommentTsIgnoreCircDep = isScalarTypeDirectOrNested(field.type) ? `` : commentTsIgnoreCircDep + `\n`
    return `${maybeCommentTsIgnoreCircDep}${field.name}: ${outputField(config, field)}`
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
    // todo test case for this directive being present
    const maybeCommentTsIgnoreCircDep = isScalarTypeDirectOrNested(field.type) ? `` : commentTsIgnoreCircDep + `\n`
    return `${maybeCommentTsIgnoreCircDep}${field.name}: ${outputField(config, field)}`
  }).join(`,\n`)
  return `
    ${commentTsIgnoreCircDep}
    export const ${type.name} = $.Object$(\`${type.name}\`, {
      ${fields}
    })
	`
}

const inputObject = (config: Config, type: GraphQLInputObjectType) => {
  const isFieldsAllNullable = isAllInputObjectFieldsNullable(type)
  const fields = Object.values(type.getFields()).map((field) => `${field.name}: ${inputField(config, field)}`).join(
    `,\n`,
  )
  return `
    export const ${type.name} = $.InputObject(\`${type.name}\`, {
      ${fields}
    }, ${Code.boolean(isFieldsAllNullable)})
	`
}

const inputField = (config: Config, field: GraphQLInputField): string => {
  const type = buildType(`input`, config, field.type)
  const isNeedThunk = isInputObjectType(getNamedType(field.type))
  return `$.Input.Field(${isNeedThunk ? `() => ${type}` : type})`
}

const outputField = (config: Config, field: AnyGraphQLOutputField): string => {
  const type = buildType(`output`, config, field.type)
  return field.args.length > 0
    ? `$.field(${type}, ${renderArgs(config, field.args)})`
    : `$.field(${type})`
}

const renderArgs = (config: Config, args: readonly GraphQLArgument[]) => {
  const isFieldsAllNullable = isAllArgsNullable(args)
  return `$.Args({${args.map(arg => renderArg(config, arg)).join(`, `)}}, ${Code.boolean(isFieldsAllNullable)})`
}

const renderArg = (config: Config, arg: GraphQLArgument) => {
  const type = buildType(`input`, config, arg.type)
  return `${arg.name}: $.Input.Field(${type})`
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
  const nullable = isNullableType(node)
  const nodeInner = getNullableType(node)

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

const isScalarTypeDirectOrNested = (type: GraphQLOutputType): boolean => {
  return type instanceof GraphQLScalarType
    || type instanceof GraphQLNonNull && isScalarTypeDirectOrNested(type.ofType)
    || type instanceof GraphQLList && isScalarTypeDirectOrNested(type.ofType)
}
