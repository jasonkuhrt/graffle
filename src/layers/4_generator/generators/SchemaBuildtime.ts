import type {
  GraphQLArgument,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
} from 'graphql'
import { getNullableType, isListType, isNamedType, isNullableType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import type { Nodes } from '../../../lib/grafaid/graphql.js'
import {
  type AnyClass,
  type AnyField,
  type AnyNamedClassName,
  type ClassToName,
  type NamedNameToClass,
} from '../../../lib/grafaid/graphql.js'
import { entries, values } from '../../../lib/prelude.js'
import type { Config } from '../config.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { getDocumentation } from '../helpers/render.js'
import { ModuleGeneratorScalar } from './Scalar.js'

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
  $Renderers extends { [ClassName in keyof Nodes.$Schema.NameToClassNamedType]: any },
>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof Nodes.$Schema.NameToClassNamedType
        ? InstanceType<Nodes.$Schema.NameToClassNamedType[ClassName]>
        : never,
    ) => string
  },
): {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof Grafaid.NameToClass ? InstanceType<Grafaid.NameToClass[ClassName]> | null | undefined
      : never,
  ) => string
} => {
  return Object.fromEntries(
    Object.entries(renderers).map(([key, renderer]) => {
      return [
        key,
        (config: Config, node: any) => {
          if (!node) return ``
          return renderer(config, node)
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
  const renderer = referenceRenderers[node.constructor.name]
  if (!renderer) {
    throw new Error(`No renderer found for class: ${node.constructor.name}`)
  }
  return renderer
}

const referenceRenderers = defineReferenceRenderers({
  GraphQLEnumType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLEnumType, node.name),
  GraphQLInputObjectType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLInputObjectType, node.name),
  GraphQLInterfaceType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLInterfaceType, node.name),
  GraphQLObjectType: (_, node) => {
    return Code.propertyAccess(namespaceNames.GraphQLObjectType, node.name)
  },
  GraphQLUnionType: (_, node) => Code.propertyAccess(namespaceNames.GraphQLUnionType, node.name),
  GraphQLScalarType: (_, node) => `$Scalar.${node.name}`,
})

const dispatchToConcreteRenderer = (
  config: Config,
  node: GraphQLNamedType,
): string => {
  // @ts-expect-error lookup
  const renderer = concreteRenderers[node.constructor.name]
  if (!renderer) {
    throw new Error(`No renderer found for class: ${node.constructor.name}`)
  }
  return renderer(config, node)
}

const concreteRenderers = defineConcreteRenderers({
  GraphQLEnumType: (config, node) =>
    Code.TSDocWithBlock(
      getDocumentation(config, node),
      Code.export$(
        Code.type(
          node.name,
          `$.Enum<${Code.string(node.name)}, ${Code.tuple(node.getValues().map((_) => Code.string(_.name)))} >`,
        ),
      ),
    ),
  GraphQLInputObjectType: (config, node) => {
    const doc = getDocumentation(config, node)
    const isAllFieldsNullable = Grafaid.Schema.isAllInputObjectFieldsNullable(node)
    const source = Code.export$(
      Code.type(
        node.name,
        `$.InputObject<${Code.string(node.name)}, ${renderInputFields(config, node)}, ${
          Code.boolean(isAllFieldsNullable)
        }>`,
      ),
    )
    return Code.TSDocWithBlock(doc, source)
  },
  GraphQLInterfaceType: (config, node) => {
    const implementors = Grafaid.Schema.KindMap.getInterfaceImplementors(config.schema.typeMapByKind, node)
    return Code.TSDocWithBlock(
      getDocumentation(config, node),
      Code.export$(Code.type(
        node.name,
        `$.Interface<${Code.string(node.name)}, ${renderOutputFields(config, node)}, ${
          Code.tuple(implementors.map(_ => `Object.${_.name}`))
        }>`,
      )),
    )
  },
  GraphQLObjectType: (config, node) => {
    const maybeRootTypeName = (Grafaid.Schema.RootTypeName as Record<string, Grafaid.Schema.RootTypeName>)[node.name]
    const type = maybeRootTypeName
      ? `$.Output.Object${maybeRootTypeName}<${renderOutputFields(config, node)}>`
      : `$.Object$2<${Code.string(node.name)}, ${renderOutputFields(config, node)}>`
    const doc = getDocumentation(config, node)
    const source = Code.export$(Code.type(node.name, type))
    return Code.TSDocWithBlock(doc, source)
  },
  GraphQLScalarType: () => ``,
  GraphQLUnionType: (config, node) =>
    Code.TSDocWithBlock(
      getDocumentation(config, node),
      Code.export$(
        Code.type(
          node.name,
          `$.Union<${Code.string(node.name)},${
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

const renderOutputFields = (config: Config, node: AnyGraphQLFieldsType): string => {
  return Code.object(Code.fields([
    ...values(node.getFields()).map((field) =>
      Code.TSDocWithBlock(
        getDocumentation(config, field),
        Code.field(field.name, renderOutputField(config, field)),
      )
    ),
  ]))
}

const renderInputFields = (config: Config, node: AnyGraphQLFieldsType): string => {
  return Code.object(Code.fields([
    ...values(node.getFields()).map((field) =>
      Code.TSDocWithBlock(
        getDocumentation(config, field),
        Code.field(field.name, renderInputField(config, field)),
      )
    ),
  ]))
}

const renderOutputField = (config: Config, field: AnyField): string => {
  const type = buildType(`output`, config, field.type)

  const args = Grafaid.Schema.isGraphQLOutputField(field) && field.args.length > 0
    ? renderArgs(config, field.args)
    : null

  return `$.Field<'${field.name}', ${type}${args ? `, ${args}` : `, null`}>`
}

const renderInputField = (config: Config, field: AnyField): string => {
  return `$.Input.Field<${buildType(`input`, config, field.type)}>`
}

const buildType = (direction: 'input' | 'output', config: Config, node: AnyClass) => {
  const ns = direction === `input` ? `Input` : `Output`
  const nullable = isNullableType(node)
  const nodeInner = getNullableType(node)

  if (isNamedType(nodeInner)) {
    const namedTypeReference = dispatchToReferenceRenderer(config, nodeInner)
    // const namedTypeCode = `_.Named<${namedTypeReference}>`
    const namedTypeCode = namedTypeReference
    return nullable
      ? `$.${ns}.Nullable<${namedTypeCode}>`
      : namedTypeCode
  }

  if (isListType(nodeInner)) {
    const fieldType = `$.${ns}.List<${buildType(direction, config, nodeInner.ofType)}>` as any as string
    return nullable
      ? `$.${ns}.Nullable<${fieldType}>`
      : fieldType
  }

  throw new Error(`Unhandled type: ${String(node)}`)
}

const renderArgs = (config: Config, args: readonly GraphQLArgument[]) => {
  const code = `$.Args<${
    Code.object(
      Code.fields(
        args.map((arg) => renderArg(config, arg)),
      ),
    )
  }, ${Code.boolean(Grafaid.Schema.Args.isAllArgsNullable(args))}>`
  return code
}

const renderArg = (config: Config, arg: GraphQLArgument) => {
  // const { nullable } = unwrapToNonNull(arg.type)
  // hasRequiredArgs = hasRequiredArgs || !nullable
  const type = buildType(`input`, config, arg.type)
  return Code.field(arg.name, `$.Input.Field<${type}>`)
}

// high level

export const ModuleGeneratorSchemaBuildtime = createModuleGenerator(
  `SchemaBuildtime`,
  ({ config, code }) => {
    code(`import type * as $ from '${config.paths.imports.grafflePackage.schema}'`)
    code(`import type * as $Scalar from './${ModuleGeneratorScalar.name}.js'`)
    code(`\n\n`)

    for (const [name, types] of entries(config.schema.typeMapByKind)) {
      if (name === `GraphQLScalarType`) continue
      if (name === `GraphQLScalarTypeCustom`) continue
      if (name === `GraphQLScalarTypeStandard`) continue

      const namespaceName = name === `GraphQLRootType` ? `Root` : namespaceNames[name]
      code(Code.commentSectionTitle(namespaceName))
      code(Code.export$(
        Code.namespace(
          namespaceName,
          types.length === 0
            ? `// -- no types --\n`
            : types
              .map((_) => dispatchToConcreteRenderer(config, _))
              .join(`\n\n`),
        ),
      ))
    }

    return code
  },
)
