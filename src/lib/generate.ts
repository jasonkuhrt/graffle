// todo Emit JSDoc from GraphQL descriptions
import type { GraphQLEnumValue, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLNamedType } from 'graphql'
import { GraphQLNonNull, GraphQLObjectType, isEnumType } from 'graphql'
import { buildSchema } from 'graphql'
import _ from 'json-bigint'
import fs from 'node:fs/promises'
import { Code } from './Code.js'
import type { AnyClass, AnyField, AnyNamedClassName, Describable, NameToClassNamedType } from './graphql.js'
import { getNodeDisplayName, getTypeMapByKind, isDeprecatableNode, type NameToClass } from './graphql.js'
import { entries, values } from './prelude.js'

const namespaceNames = {
  GraphQLEnumType: `Enum`,
  GraphQLInputObjectType: `InputObject`,
  GraphQLInterfaceType: `Interface`,
  GraphQLObjectType: `Object`,
  GraphQLScalarType: `Scalar`,
  GraphQLUnionType: `Union`,
} satisfies Record<AnyNamedClassName, string>

type AnyGraphQLFieldsType = GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType

const definePointerRenderers = <$Renderers extends { [ClassName in keyof NameToClass]: any }>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof NameToClass ? InstanceType<NameToClass[ClassName]> : never,
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

const dispatchToPointerRenderer = (config: Config, node: AnyClass): string => {
  // @ts-expect-error lookup
  const renderer = pointerRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) throw new Error(`No renderer found for class: ${node.constructor.name}`)
  return renderer(config, node) // eslint-disable-line
}

const dispatchToConcreteRenderer = (config: Config, node: GraphQLNamedType): string => {
  // @ts-expect-error lookup
  const renderer = concreteRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) throw new Error(`No renderer found for class: ${node.constructor.name}`)
  return renderer(config, node) // eslint-disable-line
}

const pointerRenderers = definePointerRenderers({
  GraphQLNonNull: (config, node) => dispatchToPointerRenderer(config, node.ofType),
  GraphQLEnumType: (config, node) => Code.propertyAccess(namespaceNames.GraphQLEnumType, node.name),
  GraphQLInputObjectType: (config, node) => Code.propertyAccess(namespaceNames.GraphQLInputObjectType, node.name),
  GraphQLInterfaceType: (config, node) => Code.propertyAccess(namespaceNames.GraphQLInterfaceType, node.name),
  GraphQLList: (config, node) => Code.list(dispatchToPointerRenderer(config, node.ofType)),
  GraphQLObjectType: (config, node) => Code.propertyAccess(namespaceNames.GraphQLObjectType, node.name),
  GraphQLScalarType: (config, node) => `$.Scalars[${Code.quote(node.name)}]`,
  GraphQLUnionType: (config, node) => Code.propertyAccess(namespaceNames.GraphQLUnionType, node.name),
})

const concreteRenderers = defineConcreteRenderers({
  GraphQLEnumType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(
        Code.union(
          node.name,
          node.getValues().map((_) => Code.quote(_.name)),
        ),
      ),
    ),
  GraphQLInputObjectType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(Code.interface$(
        node.name,
        renderFields(config, node),
      )),
    ),
  GraphQLInterfaceType: (config, node) =>
    Code.TSDoc(getDocumentation(config, node), Code.export$(Code.interface$(node.name, renderFields(config, node)))),
  GraphQLObjectType: (config, node) =>
    Code.TSDoc(getDocumentation(config, node), Code.export$(Code.interface$(node.name, renderFields(config, node)))),
  GraphQLScalarType: () => ``,
  GraphQLUnionType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(
        Code.union(
          node.name,
          node.getTypes().map((_) => dispatchToPointerRenderer(config, _) + `& { $$union:true}`),
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
    ? node.getValues()
      .map(_ => {
        const deprecationDescription = _.deprecationReason ? `(DEPRECATED: ${_.deprecationReason})` : null
        const generalDescription = _.description
          ? _.description
          : (config.TSDoc.noDocPolicy === `message` ? `Missing description.` : null)
        if (!generalDescription && !deprecationDescription) return null
        const content = [generalDescription, deprecationDescription].filter(_ => _ !== null).join(` `)
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
  if (!enumMemberDescription && !generalDescription && !deprecationDescription) return null
  const content = [generalDescription, enumMemberDescription, deprecationDescription].filter(_ => _ !== null)
    .join(`\n\n`)
  return content
}

const defaultDescription = (node: Describable) => `There is no documentation for this ${getNodeDisplayName(node)}.`

const renderFields = (config: Config, node: AnyGraphQLFieldsType): string => {
  const __typenameField = node instanceof GraphQLObjectType ? [Code.field(`__typename`, `"${node.name}"`)] : []
  return Code.fields(
    [
      ...__typenameField,
      ...values(node.getFields()).map((field) =>
        Code.TSDoc(getDocumentation(config, field), Code.field(field.name, renderField(config, field)))
      ),
    ],
  )
}

const renderField = (config: Config, field: AnyField): string => {
  const [node, nullable] = field.type instanceof GraphQLNonNull ? [field.type.ofType, false] : [field.type, true]
  return nullable ? Code.nullable(dispatchToPointerRenderer(config, node)) : dispatchToPointerRenderer(config, node) // eslint-disable-line
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
  schemaSource: string
  options?: {
    TSDoc?: {
      noDocPolicy?: 'message' | 'ignore'
    }
  }
}

interface Config {
  TSDoc: {
    noDocPolicy: 'message' | 'ignore'
  }
}

const resolveOptions = (options: Input['options']): Config => {
  return {
    TSDoc: {
      noDocPolicy: options?.TSDoc?.noDocPolicy ?? `ignore`,
    },
  }
}

export const generateCode = (input: Input) => {
  const schema = buildSchema(input.schemaSource)
  const typeMapByKind = getTypeMapByKind(schema)
  const config = resolveOptions(input.options)

  const hasQuery = typeMapByKind.GraphQLRootTypes.find((_) => _.name === `Query`)
  const hasMutation = typeMapByKind.GraphQLRootTypes.find((_) => _.name === `Mutation`)
  const hasSubscription = typeMapByKind.GraphQLRootTypes.find((_) => _.name === `Subscription`)

  let code = ``

  code += Code.export$(Code.namespace(
    `$`,
    Code.group(
      Code.export$(
        Code.interface$(
          `Index`,
          Code.fields([
            Code.field(
              `Root`,
              Code.object(
                Code.fields([
                  Code.field(`Query`, hasQuery ? `Root.Query` : `null`),
                  Code.field(`Mutation`, hasMutation ? `Root.Mutation` : `null`),
                  Code.field(`Subscription`, hasSubscription ? `Root.Subscription` : `null`),
                ]),
              ),
            ),
            Code.field(
              `unions`,
              Code.object(
                Code.fields([
                  Code.field(
                    `Union`,
                    typeMapByKind.GraphQLUnionType.length > 0
                      ? Code.unionItems(typeMapByKind.GraphQLUnionType.map(_ => `Union.${_.name}`))
                      : `null`,
                  ),
                ]),
              ),
            ),
            Code.field(`scalars`, `Scalars`),
          ]),
        ),
      ),
      Code.export$(Code.interface$(
        `Scalars`,
        `
    ${
          typeMapByKind.GraphQLScalarType.map((_) => {
            // todo strict mode where instead of falling back to "any" we throw an error
            const type = scalarTypeMap[_.name] || `string`
            return Code.field(_.name, type)
          }).join(`\n`)
        }
  `,
      )),
    ),
  ))

  for (const [name, types] of entries(typeMapByKind)) {
    if (name === `GraphQLScalarType`) continue

    const namespaceName = name === `GraphQLRootTypes` ? `Root` : namespaceNames[name]
    code += Code.commentSectionTitle(namespaceName)
    code += Code.export$(Code.namespace(
      namespaceName,
      types.length === 0
        ? `// -- no types --\n`
        : types.map(_ => dispatchToConcreteRenderer(config, _)).join(`\n\n`),
    ))
  }

  return code
}

export const generateFile = async (params: { schemaPath: string; typeScriptPath: string }) => {
  // todo use @dprint/formatter
  const schemaSource = await fs.readFile(params.schemaPath, `utf8`)
  const code = generateCode({ schemaSource })
  await fs.writeFile(params.typeScriptPath, code, { encoding: `utf8` })
}
