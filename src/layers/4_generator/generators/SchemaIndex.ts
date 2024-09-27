import { getNamedType, isUnionType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { hasMutation, hasQuery, hasSubscription } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorMethodsRoot } from './MethodsRoot.js'
import { ModuleGeneratorSchemaBuildtime } from './SchemaBuildtime.js'

export const ModuleGeneratorSchemaIndex = createModuleGenerator(
  `SchemaIndex`,
  ({ config, code }) => {
    const SchemaBuildtimeNamespace = `Schema`
    const MethodsRootNamespace = `MethodsRoot`
    code.push(`/* eslint-disable */`)
    code.push(`import type * as Data from './${ModuleGeneratorData.name}.js'`)
    code.push(`import type * as ${SchemaBuildtimeNamespace} from './${ModuleGeneratorSchemaBuildtime.name}.js'`)
    code.push(`import type * as ${MethodsRootNamespace} from './${ModuleGeneratorMethodsRoot.name}.js'`)
    code.push(``)

    const rootTypesPresence = {
      Query: hasQuery(config.schema.typeMapByKind),
      Mutation: hasMutation(config.schema.typeMapByKind),
      Subscription: hasSubscription(config.schema.typeMapByKind),
    }

    const root = config.schema.typeMapByKind.GraphQLRootType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Root.${_.name}`] as const
    )

    const objects = config.schema.typeMapByKind.GraphQLObjectType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`] as const
    )
    const unions = config.schema.typeMapByKind.GraphQLUnionType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Union.${_.name}`] as const
    )
    const interfaces = config.schema.typeMapByKind.GraphQLInterfaceType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Interface.${_.name}`] as const,
    )
    const enums = config.schema.typeMapByKind.GraphQLEnumType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Enum.${_.name}`] as const,
    )

    code.push(Code.export$(
      Code.interface$(
        `Index`,
        Code.objectFrom({
          name: `Data.Name`,
          RootTypesPresent: `[${
            config.schema.typeMapByKind.GraphQLRootType.map((_) => Code.quote(_.name)).join(`, `)
          }]`,
          RootUnion: config.schema.typeMapByKind.GraphQLRootType.map(_ => `${SchemaBuildtimeNamespace}.Root.${_.name}`)
            .join(`|`),
          Root: {
            type: Code.objectFrom({
              Query: rootTypesPresence.Query ? `${SchemaBuildtimeNamespace}.Root.Query` : null,
              Mutation: rootTypesPresence.Mutation ? `${SchemaBuildtimeNamespace}.Root.Mutation` : null,
              Subscription: rootTypesPresence.Subscription ? `${SchemaBuildtimeNamespace}.Root.Subscription` : null,
            }),
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
          // todo jsdoc comment saying:
          // Objects that match this pattern name: /.../
          error: Code.objectFrom({
            objects: Code.objectFromEntries(
              config.schema.error.objects.map(_ => [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`]),
            ),
            objectsTypename: Code.objectFromEntries(
              config.schema.error.objects.map(_ => [_.name, `{ __typename: "${_.name}" }`]),
            ),
            rootResultFields: `{
              ${hasQuery(config.schema.typeMapByKind) ? `Query: {}` : ``}
              ${hasMutation(config.schema.typeMapByKind) ? `Mutation: {}` : ``}
              ${hasSubscription(config.schema.typeMapByKind) ? `Subscription: {}` : ``}
              ${
              Object.values(config.schema.typeMapByKind.GraphQLRootType).map((rootType) => {
                const resultFields = Object.values(rootType.getFields()).filter((field) => {
                  const type = getNamedType(field.type)
                  return isUnionType(type)
                    && type.getTypes().some(_ => config.schema.error.objects.some(__ => __.name === _.name))
                }).map((field) => field.name)

                return `${rootType.name}: {\n${resultFields.map(_ => `${_}: "${_}"`).join(`,\n`)} }`
              }).join(`\n`)
            }
          }`,
          }),
        }),
      ),
    ))

    return code
  },
)
