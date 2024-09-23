import { getNamedType, isUnionType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { hasMutation, hasQuery, hasSubscription } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../createCodeGenerator.js'
import { moduleNameData } from './Data.js'
import { moduleNameMethodsRoot } from './MethodsRoot.js'
import { moduleNameSchemaBuildtime } from './SchemaBuildtime.js'

export const { generate: generateSchemaIndex, moduleName: moduleNameSchemaIndex } = createModuleGenerator(
  `SchemaIndex`,
  ({ config, code }) => {
    const SchemaBuildtimeNamespace = `Schema`
    const MethodsRootNamespace = `MethodsRoot`
    code.push(`/* eslint-disable */`)
    code.push(`import type * as Data from './${moduleNameData}.js'`)
    code.push(`import type * as ${SchemaBuildtimeNamespace} from './${moduleNameSchemaBuildtime}.js'`)
    code.push(`import type * as ${MethodsRootNamespace} from './${moduleNameMethodsRoot}.js'`)
    code.push(``)

    const rootTypesPresence = {
      Query: hasQuery(config.typeMapByKind),
      Mutation: hasMutation(config.typeMapByKind),
      Subscription: hasSubscription(config.typeMapByKind),
    }

    const root = config.typeMapByKind.GraphQLRootType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Root.${_.name}`] as const
    )

    const objects = config.typeMapByKind.GraphQLObjectType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`] as const
    )
    const unions = config.typeMapByKind.GraphQLUnionType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Union.${_.name}`] as const
    )
    const interfaces = config.typeMapByKind.GraphQLInterfaceType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Interface.${_.name}`] as const,
    )
    const enums = config.typeMapByKind.GraphQLEnumType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Enum.${_.name}`] as const,
    )

    code.push(Code.export$(
      Code.interface$(
        `Index`,
        Code.objectFrom({
          name: `Data.Name`,
          RootTypesPresent: `[${config.rootTypesPresent.map((_) => Code.quote(_.name)).join(`, `)}]`,
          RootUnion: config.rootTypesPresent.map(_ => `${SchemaBuildtimeNamespace}.Root.${_.name}`).join(`|`),
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
              config.error.objects.map(_ => [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`]),
            ),
            objectsTypename: Code.objectFromEntries(
              config.error.objects.map(_ => [_.name, `{ __typename: "${_.name}" }`]),
            ),
            rootResultFields: `{
          ${
              Object.entries(config.rootTypes).map(([rootTypeName, rootType]) => {
                if (!rootType) return `${rootTypeName}: {}`

                const resultFields = Object.values(rootType.getFields()).filter((field) => {
                  const type = getNamedType(field.type)
                  return isUnionType(type)
                    && type.getTypes().some(_ => config.error.objects.some(__ => __.name === _.name))
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
