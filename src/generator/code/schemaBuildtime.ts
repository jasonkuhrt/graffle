import type {
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
} from 'graphql'
import { isEnumType, isListType, isNamedType } from 'graphql'
import _ from 'json-bigint'
import { Code } from '../../lib/Code.js'
import type {
  AnyClass,
  AnyField,
  AnyNamedClassName,
  ClassToName,
  Describable,
  NamedNameToClass,
  NameToClassNamedType,
} from '../../lib/graphql.js'
import {
  getNodeDisplayName,
  hasMutation,
  hasQuery,
  hasSubscription,
  isDeprecatableNode,
  isGraphQLOutputField,
  type NameToClass,
  unwrapToNonNull,
} from '../../lib/graphql.js'
import { entries, values } from '../../lib/prelude.js'
import type { Config } from './code.js'

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
  $Renderers extends { [ClassName in keyof NamedNameToClass]: any },
>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof NamedNameToClass ? InstanceType<NamedNameToClass[ClassName]>
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
  // @ts-expect-error fixme
  getReferenceRenderer(node)(config, node as any)

// @ts-expect-error fixme
const getReferenceRenderer = <N extends AnyClass>(node: N): (typeof referenceRenderers)[ClassToName<N>] => {
  // @ts-expect-error lookup
  const renderer = referenceRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) {
    throw new Error(`No renderer found for class: ${node.constructor.name}`)
  }
  return renderer
}

const referenceRenderers = defineReferenceRenderers({
  GraphQLEnumType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLEnumType, node.name),
  GraphQLInputObjectType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLInputObjectType, node.name),
  GraphQLInterfaceType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLInterfaceType, node.name),
  GraphQLObjectType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLObjectType, node.name),
  GraphQLUnionType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLUnionType, node.name),
  GraphQLScalarType: (_, node) => `$Scalar.${node.name}`,
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
      Code.export$(Code.type(node.name, `_.InputObject<${Code.quote(node.name)}, ${renderInputFields(config, node)}>`)),
    ),
  GraphQLInterfaceType: (config, node) => {
    const implementors = config.typeMapByKind.GraphQLObjectType.filter(_ =>
      _.getInterfaces().filter(_ => _.name === node.name).length > 0
    )
    return Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(Code.type(
        node.name,
        `_.Interface<${Code.quote(node.name)}, ${renderOutputFields(config, node)}, ${
          Code.tuple(implementors.map(_ => `Object.${_.name}`))
        }>`,
      )),
    )
  },
  GraphQLObjectType: (config, node) =>
    Code.TSDoc(
      getDocumentation(config, node),
      Code.export$(Code.type(node.name, `_.Object<${Code.quote(node.name)}, ${renderOutputFields(config, node)}>`)),
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

const renderOutputFields = (config: Config, node: AnyGraphQLFieldsType): string => {
  return Code.object(Code.fields([
    ...values(node.getFields()).map((field) =>
      Code.TSDoc(
        getDocumentation(config, field),
        Code.field(field.name, renderOutputField(config, field)),
      )
    ),
  ]))
}

const renderInputFields = (config: Config, node: AnyGraphQLFieldsType): string => {
  return Code.object(Code.fields([
    ...values(node.getFields()).map((field) =>
      Code.TSDoc(
        getDocumentation(config, field),
        Code.field(field.name, renderInputField(config, field)),
      )
    ),
  ]))
}

const renderOutputField = (config: Config, field: AnyField): string => {
  const type = buildType(`output`, config, field.type)

  const args = isGraphQLOutputField(field) && field.args.length > 0
    ? renderArgs(config, field.args)
    : null

  return `_.Field<${type}${args ? `, ${args}` : ``}>`
}

const renderInputField = (config: Config, field: AnyField): string => {
  return buildType(`input`, config, field.type)
}

const buildType = (direction: 'input' | 'output', config: Config, node: AnyClass) => {
  const ns = direction === `input` ? `Input` : `Output`
  const { ofType: nodeInner, nullable } = unwrapToNonNull(node)

  if (isNamedType(nodeInner)) {
    const namedTypeReference = dispatchToReferenceRenderer(config, nodeInner)
    // const namedTypeCode = `_.Named<${namedTypeReference}>`
    const namedTypeCode = namedTypeReference
    return nullable
      ? `_.${ns}.Nullable<${namedTypeCode}>`
      : namedTypeCode
  }

  if (isListType(nodeInner)) {
    const fieldType = `_.${ns}.List<${buildType(direction, config, nodeInner.ofType)}>` as any as string
    return nullable
      ? `_.${ns}.Nullable<${fieldType}>`
      : fieldType
  }

  throw new Error(`Unhandled type: ${String(node)}`)
}

const renderArgs = (config: Config, args: readonly GraphQLArgument[]) => {
  let hasRequiredArgs = false
  const argsRendered = `_.Args<${
    Code.object(
      Code.fields(
        args.map((arg) => {
          const { nullable } = unwrapToNonNull(arg.type)
          hasRequiredArgs = hasRequiredArgs || !nullable
          return Code.field(
            arg.name,
            buildType(`input`, config, arg.type),
          )
        }),
      ),
    )
  }>`
  return argsRendered
}

// high level

export const generateSchemaBuildtime = (config: Config) => {
  let code = ``

  code += `import type * as _ from '${config.libraryPaths.schema}'\n`
  code += `import type * as $Scalar from './Scalar.ts'\n`
  code += `\n\n`

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
                  Query: hasQuery(config.typeMapByKind) ? `Root.Query` : null,
                  Mutation: hasMutation(config.typeMapByKind) ? `Root.Mutation` : null,
                  Subscription: hasSubscription(config.typeMapByKind) ? `Root.Subscription` : null,
                }),
              },
              objects: Code.objectFromEntries(
                config.typeMapByKind.GraphQLObjectType.map(_ => [_.name, Code.propertyAccess(`Object`, _.name)]),
              ),
              unions: Code.objectFromEntries(
                config.typeMapByKind.GraphQLUnionType.map(_ => [_.name, Code.propertyAccess(`Union`, _.name)]),
              ),
            }),
          ),
        ),
      ),
    ),
  )

  for (const [name, types] of entries(config.typeMapByKind)) {
    if (name === `GraphQLScalarType`) continue
    if (name === `GraphQLCustomScalarType`) continue

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
