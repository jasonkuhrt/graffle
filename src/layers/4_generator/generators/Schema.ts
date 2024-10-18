import type { SchemaDrivenDataMap } from '../../../entrypoints/utilities-for-generated.js'
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import { entries, isObjectEmpty, values } from '../../../lib/prelude.js'
import type { SchemaKit } from '../../1_Schema/__.js'
import type { Config } from '../config/config.js'
import type { GlobalRegistry } from '../globalRegistry.js'
import { identifiers } from '../helpers/identifiers.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { createCodeGenerator } from '../helpers/moduleGeneratorRunner.js'
import { getDocumentation, title1 } from '../helpers/render.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorMethodsRoot } from './MethodsRoot.js'
import { ModuleGeneratorScalar } from './Scalar.js'

/**
 * A generic schema type. Any particular schema will be a subtype of this, with
 * additional specificity such as on objects where here `Record` is used.
 */
export interface Schema<
  $Extensions extends GlobalRegistry.TypeExtensions = GlobalRegistry.TypeExtensions,
> {
  name: GlobalRegistry.SchemaNames
  RootTypesPresent: ('Query' | 'Mutation' | 'Subscription')[]
  RootUnion: SchemaKit.Output.RootType
  Root: {
    Query: null | SchemaKit.Output.ObjectQuery
    Mutation: null | SchemaKit.Output.ObjectMutation
    Subscription: null | SchemaKit.Output.ObjectSubscription
  }
  allTypes: Record<
    string,
    | SchemaKit.Hybrid.Enum
    | SchemaKit.Output.ObjectQuery
    | SchemaKit.Output.ObjectMutation
    | SchemaKit.Output.Object$2
    | SchemaKit.Output.Union
    | SchemaKit.Output.Interface
  >
  objects: Record<string, SchemaKit.Output.Object$2>
  unions: Record<string, SchemaKit.Output.Union>
  interfaces: Record<string, SchemaKit.Output.Interface>
  customScalars: {
    input: SchemaDrivenDataMap
  }
  extensions: $Extensions
}

export const ModuleGeneratorSchema = createModuleGenerator(
  `Schema`,
  ({ config, code }) => {
    code(`import type * as $ from '${config.paths.imports.grafflePackage.schema}'`)
    code(`import type * as $Scalar from './${ModuleGeneratorScalar.name}.js'`)
    code(`\n\n`)

    code(`export namespace ${identifiers.Schema} {`)
    // todo do we need kind namespaces?
    for (const [name, types] of entries(config.schema.kindMap)) {
      if (name === `GraphQLScalarType`) continue
      if (name === `GraphQLScalarTypeCustom`) continue
      if (name === `GraphQLScalarTypeStandard`) continue

      const namespaceName = name === `GraphQLRootType` ? `Root` : namespaceNames[name]
      code()
      code(title1(namespaceName))
      code()
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
    code(`}`)

    code(SchemaGenerator({ config }))
  },
)

export const SchemaGenerator = createCodeGenerator(
  ({ config, code }) => {
    code()
    code(title1(`Schema`))
    code()

    // todo methods root is unused
    code(`
      import type * as Data from './${ModuleGeneratorData.name}.js'
      import type * as ${identifiers.MethodsRoot} from './${ModuleGeneratorMethodsRoot.name}.js'
      import type * as ${identifiers.Utilities} from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'
    `)
    code()

    const rootTypesPresence = {
      Query: Grafaid.Schema.KindMap.hasQuery(config.schema.kindMap),
      Mutation: Grafaid.Schema.KindMap.hasMutation(config.schema.kindMap),
      Subscription: Grafaid.Schema.KindMap.hasSubscription(config.schema.kindMap),
    }

    const root = config.schema.kindMap.GraphQLRootType.map(_ =>
      [_.name, `${identifiers.Schema}.Root.${_.name}`] as const
    )

    const objects = config.schema.kindMap.GraphQLObjectType.map(_ =>
      [_.name, `${identifiers.Schema}.Object.${_.name}`] as const
    )
    const unions = config.schema.kindMap.GraphQLUnionType.map(_ =>
      [_.name, `${identifiers.Schema}.Union.${_.name}`] as const
    )
    const interfaces = config.schema.kindMap.GraphQLInterfaceType.map(
      _ => [_.name, `${identifiers.Schema}.Interface.${_.name}`] as const,
    )
    const enums = config.schema.kindMap.GraphQLEnumType.map(
      _ => [_.name, `${identifiers.Schema}.Enum.${_.name}`] as const,
    )

    const schema: Code.TermObject = {
      name: `Data.Name`,
      RootTypesPresent: `[${config.schema.kindMap.GraphQLRootType.map((_) => Code.string(_.name)).join(`, `)}]`,
      RootUnion: config.schema.kindMap.GraphQLRootType.map(_ => `${identifiers.Schema}.Root.${_.name}`)
        .join(`|`),
      Root: {
        Query: rootTypesPresence.Query ? `${identifiers.Schema}.Root.Query` : null,
        Mutation: rootTypesPresence.Mutation ? `${identifiers.Schema}.Root.Mutation` : null,
        Subscription: rootTypesPresence.Subscription ? `${identifiers.Schema}.Root.Subscription` : null,
      },
      allTypes: Code.objectFromEntries([
        ...root,
        ...enums,
        ...objects,
        ...unions,
        ...interfaces,
      ]),
      objects: Code.objectFromEntries(objects),
      unions: Code.objectFromEntries(unions),
      interfaces: Code.objectFromEntries(interfaces),
      customScalars: `${identifiers.Utilities}.SchemaIndexBase['customScalars']`,
      extensions: `Utilities.GlobalRegistry.TypeExtensions`,
    }

    // --- Extensions ---
    // If the extensions object is populated it will override the default generic type.

    const extensions: Code.TermObject = {}

    config.extensions.forEach(_ => {
      _.onSchema?.({ config, schema: extensions })
    })
    if (!isObjectEmpty(extensions)) {
      schema[`extensions`] = extensions
    }

    // ---

    code(
      `export interface ${identifiers.Schema} extends Utilities.SchemaIndexBase
        ${Code.termObject(schema)}
      `,
    )
  },
)

const namespaceNames = {
  GraphQLEnumType: `Enum`,
  GraphQLInputObjectType: `InputObject`,
  GraphQLInterfaceType: `Interface`,
  GraphQLObjectType: `Object`,
  GraphQLScalarType: `Scalar`,
  GraphQLUnionType: `Union`,
} satisfies Record<Grafaid.Schema.AnyNamedClassName, string>

type AnyGraphQLFieldsType =
  | Grafaid.Schema.ObjectType
  | Grafaid.Schema.InterfaceType
  | Grafaid.Schema.InputObjectType

const defineReferenceRenderers = <
  $Renderers extends { [ClassName in keyof Grafaid.Schema.NamedNameToClass]: any },
>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof Grafaid.Schema.NamedNameToClass
        ? InstanceType<Grafaid.Schema.NamedNameToClass[ClassName]>
        : never,
    ) => string
  },
) => renderers

const defineConcreteRenderers = <
  $Renderers extends { [ClassName in keyof Grafaid.Schema.NameToClassNamedType]: any },
>(
  renderers: {
    [ClassName in keyof $Renderers]: (
      config: Config,
      node: ClassName extends keyof Grafaid.Schema.NameToClassNamedType
        ? InstanceType<Grafaid.Schema.NameToClassNamedType[ClassName]>
        : never,
    ) => string
  },
): {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof Grafaid.Schema.NameToClass
      ? InstanceType<Grafaid.Schema.NameToClass[ClassName]> | null | undefined
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

const dispatchToReferenceRenderer = (config: Config, type: Grafaid.Schema.Types): string => {
  const renderer = (referenceRenderers as any)[type.constructor.name]
  if (!renderer) throw new Error(`No renderer found for class: ${type.constructor.name}`)
  return renderer(config, type as any)
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
  node: Grafaid.Schema.NamedTypes,
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
    const implementors = Grafaid.Schema.KindMap.getInterfaceImplementors(config.schema.kindMap, node)
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

const renderOutputField = (config: Config, field: Grafaid.Schema.InputOrOutputField): string => {
  const type = buildType(`output`, config, field.type)

  const args = Grafaid.Schema.isGraphQLOutputField(field) && field.args.length > 0
    ? renderArgs(config, field.args)
    : null

  return `$.Field<'${field.name}', ${type}${args ? `, ${args}` : `, null`}>`
}

const renderInputField = (config: Config, field: Grafaid.Schema.InputOrOutputField): string => {
  return `$.Input.Field<${buildType(`input`, config, field.type)}>`
}

const buildType = (direction: 'input' | 'output', config: Config, node: Grafaid.Schema.Types) => {
  const ns = direction === `input` ? `Input` : `Output`
  const nullable = Grafaid.Schema.isNullableType(node)
  const nodeInner = Grafaid.Schema.getNullableType(node)

  if (Grafaid.Schema.isNamedType(nodeInner)) {
    const namedTypeReference = dispatchToReferenceRenderer(config, nodeInner)
    // const namedTypeCode = `_.Named<${namedTypeReference}>`
    const namedTypeCode = namedTypeReference
    return nullable
      ? `$.${ns}.Nullable<${namedTypeCode}>`
      : namedTypeCode
  }

  if (Grafaid.Schema.isListType(nodeInner)) {
    const fieldType = `$.${ns}.List<${buildType(direction, config, nodeInner.ofType)}>` as any as string
    return nullable
      ? `$.${ns}.Nullable<${fieldType}>`
      : fieldType
  }

  throw new Error(`Unhandled type: ${String(node)}`)
}

const renderArgs = (config: Config, args: readonly Grafaid.Schema.Argument[]) => {
  const code = `$.Args<${
    Code.object(
      Code.fields(
        args.map((arg) => renderArg(config, arg)),
      ),
    )
  }, ${Code.boolean(Grafaid.Schema.Args.isAllArgsNullable(args))}>`
  return code
}

const renderArg = (config: Config, arg: Grafaid.Schema.Argument) => {
  // const { nullable } = unwrapToNonNull(arg.type)
  // hasRequiredArgs = hasRequiredArgs || !nullable
  const type = buildType(`input`, config, arg.type)
  return Code.field(arg.name, `$.Input.Field<${type}>`)
}
