import { readFileSync } from 'fs'
import type {
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql'
import { GraphQLNonNull } from 'graphql'
import { buildSchema } from 'graphql'
import fs from 'node:fs'
import { Code } from './Code.js'
import type { AnyClass, AnyNamedClassName, NameToClassNamedType } from './graphql.js'
import { getTypeMapByKind, NamedNameToClass, type NameToClass } from './graphql.js'
import { entries } from './prelude.js'

const namespaceNames = {
  GraphQLEnumType: 'Enum',
  GraphQLInputObjectType: 'InputObject',
  GraphQLInterfaceType: 'Interface',
  GraphQLObjectType: 'Object',
  GraphQLScalarType: 'Scalar',
  GraphQLUnionType: 'Union',
} satisfies Record<AnyNamedClassName, string>

type AnyGraphQLField = GraphQLField<any, any, any> | GraphQLInputField
// type AnyGraphQLFieldMap = GraphQLFieldMap<any, any>
// type AnyGraphQLNonNull = GraphQLNonNull<GraphQLNullableType>
// type AnyGraphQLList = GraphQLList<GraphQLOutputType>

type AnyGraphQLFieldsType = GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType

const definePointerRenderers = <$Renderers extends { [ClassName in keyof NameToClass]: any }>(renderers: {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClass ? InstanceType<NameToClass[ClassName]> : never,
  ) => string
}) => renderers

const defineConcreteRenderers = <
  $Renderers extends { [ClassName in keyof NameToClassNamedType]: any },
>(renderers: {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClassNamedType
      ? InstanceType<NameToClassNamedType[ClassName]>
      : never,
  ) => string
}): {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClass
      ? InstanceType<NameToClass[ClassName]> | null | undefined
      : never,
  ) => string
} => {
  return Object.fromEntries(
    Object.entries(renderers).map(([key, renderer]) => {
      return [
        key,
        (node: any) => {
          if (!node) return ``
          return renderer(node) // eslint-disable-line
        },
      ]
    }),
  ) as any
}

const dispatchToPointerRenderer = (node: AnyClass): string => {
  // @ts-expect-error lookup
  const renderer = pointerRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) throw new Error(`No renderer found for class: ${node.constructor.name}`)
  return renderer(node) // eslint-disable-line
}

const dispatchToConcreteRenderer = (node: GraphQLNamedType): string => {
  // @ts-expect-error lookup
  const renderer = concreteRenderers[node.constructor.name] // eslint-disable-line
  if (!renderer) throw new Error(`No renderer found for class: ${node.constructor.name}`)
  return renderer(node) // eslint-disable-line
}

const pointerRenderers = definePointerRenderers({
  GraphQLNonNull: (node) => dispatchToPointerRenderer(node.ofType),
  GraphQLEnumType: (node) => Code.propertyAccess(namespaceNames.GraphQLEnumType, node.name),
  GraphQLInputObjectType: (node) => Code.propertyAccess(namespaceNames.GraphQLInputObjectType, node.name),
  GraphQLInterfaceType: (node) => Code.propertyAccess(namespaceNames.GraphQLInterfaceType, node.name),
  GraphQLList: (node) => Code.list(dispatchToPointerRenderer(node.ofType)),
  GraphQLObjectType: (node) => Code.propertyAccess(namespaceNames.GraphQLObjectType, node.name),
  GraphQLScalarType: (node) => `$.Scalars[${Code.quote(node.name)}]`,
  GraphQLUnionType: (node) => Code.unionItems(node.getTypes().map((_) => dispatchToPointerRenderer(_))),
})

const concreteRenderers = defineConcreteRenderers({
  GraphQLEnumType: (node) =>
    Code.export$(
      Code.union(
        node.name,
        node.getValues().map((_) => Code.quote(_.name)),
      ),
    ),
  GraphQLInputObjectType: (node) => Code.export$(Code.inter(node.name, renderFields(node))),
  GraphQLInterfaceType: (node) => Code.export$(Code.inter(node.name, renderFields(node))),
  GraphQLObjectType: (node) => Code.export$(Code.inter(node.name, renderFields(node))),
  GraphQLScalarType: () => ``,
  GraphQLUnionType: (node) =>
    Code.export$(
      Code.union(
        node.name,
        node.getTypes().map((_) => dispatchToPointerRenderer(_)),
      ),
    ),
})

const renderFields = (node: AnyGraphQLFieldsType): string => {
  return Code.fieldTypes(
    Object.values(node.getFields()).map((field) => Code.fieldType(field.name, renderField(field))),
  )
}

const renderField = (field: AnyGraphQLField): string => {
  const [fieldType, nullable] =
    field.type instanceof GraphQLNonNull ? [field.type.ofType, false] : [field.type, true]
  return nullable ? Code.nullable(dispatchToPointerRenderer(fieldType)) : dispatchToPointerRenderer(fieldType) // eslint-disable-line
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
}

const generateSchemaTypes = (input: Input) => {
  const schema = buildSchema(input.schemaSource)
  const typeMapByKind = getTypeMapByKind(schema)

  let code = ``

  code += `
    namespace $ {
      export interface Scalars {
        ${typeMapByKind.GraphQLScalarType.map((_) => {
          // todo strict mode where instead of falling back to "any" we throw an error
          const type = scalarTypeMap[_.name] || `any`
          return Code.fieldType(_.name, type)
        }).join(`\n`)}
      } 
    }
  `

  for (const [name, types] of entries(typeMapByKind)) {
    if (name === `GraphQLScalarType`) continue

    const namespaceName = name === 'GraphQLRootTypes' ? 'Root' : namespaceNames[name]
    code += Code.commentSectionTitle(namespaceName)
    code += `export namespace ${namespaceName} {\n`
    if (types.length === 0) {
      code += `// -- no types --\n`
      continue
    }
    code += types.map(dispatchToConcreteRenderer).join(`\n\n`)
    code += `}`
  }

  return code
}

// demo

const schemaSource = readFileSync(`./examples/schema.graphql`, `utf8`)
const code = generateSchemaTypes({ schemaSource })
fs.writeFileSync(`./src/demo.ts`, code, { encoding: `utf8` })
