import type {
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'
import { GraphQLNonNull, isEnumType, isListType, isNamedType } from 'graphql'
import { buildSchema } from 'graphql'
import _ from 'json-bigint'
import fs from 'node:fs/promises'
import { Code } from '../lib/Code.js'
import type {
  AnyClass,
  AnyField,
  AnyNamedClassName,
  ClassToName,
  Describable,
  NameToClassNamedType,
  TypeMapByKind,
} from '../lib/graphql.js'
import {
  getNodeDisplayName,
  getTypeMapByKind,
  isDeprecatableNode,
  isGraphQLOutputField,
  type NameToClass,
} from '../lib/graphql.js'
import { entries, values } from '../lib/prelude.js'

const namespaceNames = {
  GraphQLEnumType: `Enum`,
  GraphQLInputObjectType: `InputObject`,
  GraphQLInterfaceType: `Interface`,
  GraphQLObjectType: `Object`,
  GraphQLScalarType: `Scalar`,
  GraphQLUnionType: `Union`,
} satisfies Record<AnyNamedClassName, string>

type AnyGraphQLFieldsType =
  | GraphQLObjectType
  | GraphQLInterfaceType
  | GraphQLInputObjectType

const defineReferenceRenderers = <
  $Renderers extends { [ClassName in keyof NameToClass]: any },
>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof NameToClass ? InstanceType<NameToClass[ClassName]>
        : never,
    ) => string
  },
) => renderers

const defineConcreteRenderers = <
  $Renderers extends { [ClassName in keyof NameToClassNamedType]: any },
>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof NameToClassNamedType ? InstanceType<NameToClassNamedType[ClassName]>
        : never,
    ) => string
  },
): {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClass ? InstanceType<NameToClass[ClassName]> | null | undefined
      : never,
  ) => string
} => {
  return Object.fromEntries(
    Object.entries(renderers).map(([key, renderer]) => {
      return [
        key,
        (config: Config, node: any) => {
          if (!node) return ``
          return renderer(config, node) // eslint-disable-line
        },
      ]
    }),
  ) as any
}

const dispatchToReferenceRenderer = (config: Config, node: AnyClass): string =>
  getReferenceRenderer(node)(config, node as any)

const getReferenceRenderer = <N extends AnyClass>(node: N): (typeof referenceRenderers)[ClassToName<N>] => {
  // @ts-expect-error lookup
  const renderer = referenceRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) {
    throw new Error(`No renderer found for class: ${node.constructor.name}`)
  }
  return renderer
}

const referenceRenderers = defineReferenceRenderers({
  GraphQLNonNull: (config, node) => dispatchToReferenceRenderer(config, node.ofType),
  GraphQLEnumType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLEnumType, node.name),
  GraphQLInputObjectType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLInputObjectType, node.name),
  GraphQLInterfaceType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLInterfaceType, node.name),
  GraphQLObjectType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLObjectType, node.name),
  GraphQLUnionType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLUnionType, node.name),
  GraphQLList: (config, node) => `_.List<${(buildType(config, node.ofType))}>`,
  GraphQLScalarType: (_, node) => `_.Scalar.${node.name}`,
})

const dispatchToConcreteRenderer = (
  config: Config,
  node: GraphQLNamedType,
): string => {
  // @ts-expect-error lookup
  const renderer = concreteRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) {
    throw new Error(`No renderer found for class: ${node.constructor.name}`)
  }
  return renderer(config, node) // eslint-disable-line
}

const concreteRenderers = defineConcreteRenderers({
  GraphQLEnumType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(
        Code.type(
          node.name,
          `_.Enum<${Code.quote(node.name)}, ${Code.tuple(node.getValues().map((_) => Code.quote(_.name)))} >`,
        ),
      ),
    ),
  GraphQLInputObjectType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(Code.interface$(node.name, renderFields(config, node))),
    ),
  GraphQLInterfaceType: (config, node) => {
    const implementors = config.typeMapByKind.GraphQLObjectType.filter(_ =>
      _.getInterfaces().filter(_ => _.name === node.name).length > 0
    )
    return Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(Code.type(
        node.name,
        `_.Interface<${Code.quote(node.name)}, ${renderFields(config, node)}, ${
          Code.tuple(implementors.map(_ => `Object.${_.name}`))
        }>`,
      )),
    )
  },
  GraphQLObjectType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(Code.type(node.name, `_.Object<${Code.quote(node.name)}, ${renderFields(config, node)}>`)),
    ),
  GraphQLScalarType: () => ``,
  GraphQLUnionType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(
        Code.type(
          node.name,
          `_.Union<${Code.quote(node.name)},${
            Code.tuple(
              node
                .getTypes()
                .map(
                  (_) => dispatchToReferenceRenderer(config, _),
                ),
            )
          }>`,
        ),
      ),
    ),
})

const getDocumentation = (config: Config, node: Describable) => {
  const generalDescription = node.description
    ?? (config.TSDoc.noDocPolicy === `message` ? defaultDescription(node) : null)

  const deprecationDescription = isDeprecatableNode(node) && node.deprecationReason
    ? `@deprecated ${node.deprecationReason}`
    : null

  const enumMemberDescriptions: string[] = isEnumType(node)
    ? node
      .getValues()
      .map((_) => {
        const deprecationDescription = _.deprecationReason
          ? `(DEPRECATED: ${_.deprecationReason})`
          : null
        const generalDescription = _.description
          ? _.description
          : config.TSDoc.noDocPolicy === `message`
          ? `Missing description.`
          : null
        if (!generalDescription && !deprecationDescription) return null
        const content = [generalDescription, deprecationDescription]
          .filter((_) => _ !== null)
          .join(` `)
        return [_, content] as const
      })
      .filter((_): _ is [GraphQLEnumValue, string] => _ !== null)
      .map(([node, description]) => {
        const content = `"${node.name}" - ${description}`
        return content
      })
    : []
  const enumMemberDescription = enumMemberDescriptions.length > 0
    ? `Members\n${enumMemberDescriptions.join(`\n`)}`
    : null
  if (!enumMemberDescription && !generalDescription && !deprecationDescription) {
    return null
  }
  const content = [
    generalDescription,
    enumMemberDescription,
    deprecationDescription,
  ]
    .filter((_) => _ !== null)
    .join(`\n\n`)
  return content
}

const defaultDescription = (node: Describable) => `There is no documentation for this ${getNodeDisplayName(node)}.`

const renderFields = (config: Config, node: AnyGraphQLFieldsType): string => {
  return Code.object(Code.fields([
    ...values(node.getFields()).map((field) =>
      Code.TSDoc(
        getDocumentation(config, field),
        Code.field(field.name, renderField(config, field)),
      )
    ),
  ]))
}

const buildType = (config: Config, node: AnyClass) => {
  const { node: nodeInner, nullable } = unwrapNonNull(node)

  if (isNamedType(nodeInner)) {
    const namedTypeReference = dispatchToReferenceRenderer(config, nodeInner)
    // const namedTypeCode = `_.Named<${namedTypeReference}>`
    const namedTypeCode = namedTypeReference
    return nullable
      ? `_.Nullable<${namedTypeCode}>`
      : namedTypeCode
  }

  if (isListType(nodeInner)) {
    const fieldType = `_.List<${buildType(config, nodeInner.ofType)}>` as any as string
    return nullable
      ? `_.Nullable<${fieldType}>`
      : fieldType
  }

  throw new Error(`Unhandled type: ${String(node)}`)
}

// const getNamedType = (config: Config, node: AnyClass): GraphQLNamedType => {
//   if (isNamedType(node)) return node
//   if (isNonNullType(node)) return getNamedType(config, node.ofType)
//   if (isListType(node)) return getNamedType(config, node.ofType)
//   throw new Error(`Unhandled type: ${String(node)}`)
// }

const renderField = (config: Config, field: AnyField): string => {
  const type = buildType(config, field.type)

  const args = isGraphQLOutputField(field) && field.args.length > 0
    ? renderArgs(config, field.args)
    : null

  return `_.Field<${type}${args ? `, ${args}` : ``}>`
}

const renderArgs = (config: Config, args: readonly GraphQLArgument[]) => {
  let hasRequiredArgs = false
  const argsRendered = `_.Args<${
    Code.object(
      Code.fields(
        args.map((arg) => {
          const { node, nullable } = unwrapNonNull(arg.type)
          hasRequiredArgs = hasRequiredArgs || !nullable
          return Code.field(
            arg.name,
            nullable
              ? `_.Nullable<${dispatchToReferenceRenderer(config, node)}>`
              : dispatchToReferenceRenderer(config, node),
          )
        }),
      ),
    )
  }>`
  return argsRendered
  return Code.objectFrom({
    type: { type: argsRendered },
    // allOptional: { type: !hasRequiredArgs },
  })
}

const unwrapNonNull = (
  node: AnyClass,
): { node: AnyClass; nullable: boolean } => {
  const [nodeUnwrapped, nullable] = node instanceof GraphQLNonNull ? [node.ofType, false] : [node, true]
  return { node: nodeUnwrapped, nullable }
}

const scalarTypeMap: Record<string, 'string' | 'number' | 'boolean'> = {
  ID: `string`,
  Int: `number`,
  String: `string`,
  Float: `number`,
  Boolean: `boolean`,
}

// high level

interface Input {
  schemaModulePath?: string
  schemaSource: string
  options?: {
    TSDoc?: {
      noDocPolicy?: 'message' | 'ignore'
    }
  }
}

interface Config {
  schema: GraphQLSchema
  typeMapByKind: TypeMapByKind
  TSDoc: {
    noDocPolicy: 'message' | 'ignore'
  }
}

const resolveOptions = (input: Input): Config => {
  const schema = buildSchema(input.schemaSource)
  return {
    schema,
    typeMapByKind: getTypeMapByKind(schema),
    TSDoc: {
      noDocPolicy: input.options?.TSDoc?.noDocPolicy ?? `ignore`,
    },
  }
}

export const generateCode = (input: Input) => {
  const config = resolveOptions(input)
  const { typeMapByKind } = config

  const hasQuery = typeMapByKind.GraphQLRootTypes.find(
    (_) => _.name === `Query`,
  )
  const hasMutation = typeMapByKind.GraphQLRootTypes.find(
    (_) => _.name === `Mutation`,
  )
  const hasSubscription = typeMapByKind.GraphQLRootTypes.find(
    (_) => _.name === `Subscription`,
  )

  let code = ``

  const schemaModulePath = input.schemaModulePath ?? `graphql-client/alpha/schema`

  code += `import type * as _ from ${Code.quote(schemaModulePath)}\n\n`

  code += Code.export$(
    Code.namespace(
      `$`,
      Code.group(
        Code.export$(
          Code.interface$(
            `Index`,
            Code.objectFrom({
              Root: {
                type: Code.objectFrom({
                  Query: hasQuery ? `Root.Query` : null,
                  Mutation: hasMutation ? `Root.Mutation` : null,
                  Subscription: hasSubscription ? `Root.Subscription` : null,
                }),
              },
              objects: Code.objectFromEntries(
                typeMapByKind.GraphQLObjectType.map(_ => [_.name, Code.propertyAccess(`Object`, _.name)]),
              ),
              // unionMemberNames: Code.objectFromEntries(
              //   typeMapByKind.GraphQLUnionType.map(
              //     (_) => [_.name, Code.unionItems(_.getTypes().map(_ => Code.quote(_.name)))],
              //   ),
              // ),
              unions: {
                type: Code.objectFrom(
                  {
                    Union: {
                      type: typeMapByKind.GraphQLUnionType.length > 0
                        ? Code.unionItems(
                          typeMapByKind.GraphQLUnionType.map(
                            (_) => Code.propertyAccess(`Union`, _.name),
                          ),
                        )
                        : null,
                    },
                  },
                ),
              },
              scalars: `Scalars`,
            }),
          ),
        ),
        Code.export$(
          Code.interface$(
            `Scalars`,
            Code.objectFromEntries(typeMapByKind.GraphQLScalarType.map((_) => {
              // todo strict mode where instead of falling back to "any" we throw an error
              const type = scalarTypeMap[_.name] || `string`
              return [_.name, type]
            })),
          ),
        ),
      ),
    ),
  )

  for (const [name, types] of entries(typeMapByKind)) {
    if (name === `GraphQLScalarType`) continue

    const namespaceName = name === `GraphQLRootTypes` ? `Root` : namespaceNames[name]
    code += Code.commentSectionTitle(namespaceName)
    code += Code.export$(
      Code.namespace(
        namespaceName,
        types.length === 0
          ? `// -- no types --\n`
          : types
            .map((_) => dispatchToConcreteRenderer(config, _))
            .join(`\n\n`),
      ),
    )
  }

  return code
}

export const generateFile = async (params: {
  schemaPath: string
  typeScriptPath: string
  schemaModulePath?: string
}) => {
  // todo use @dprint/formatter
  const schemaSource = await fs.readFile(params.schemaPath, `utf8`)
  const code = generateCode({ schemaSource, ...params })
  await fs.writeFile(params.typeScriptPath, code, { encoding: `utf8` })
}
