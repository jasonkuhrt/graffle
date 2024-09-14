import { isUnionType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { hasMutation, hasQuery, hasSubscription, unwrapToNamed } from '../../../lib/graphql.js'
import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameSchemaBuildtime } from './SchemaBuildtime.js'

export const { generate: generateIndex, moduleName: moduleNameIndex } = createCodeGenerator(
  `SchemaIndex`,
  (config) => {
    const SchemaNamespace = `Schema`
    const code = []
    code.push(`/* eslint-disable */\n`)
    code.push(`import type * as ${SchemaNamespace} from '../${moduleNameSchemaBuildtime}.js'\n`)

    const rootTypesPresence = {
      Query: hasQuery(config.typeMapByKind),
      Mutation: hasMutation(config.typeMapByKind),
      Subscription: hasSubscription(config.typeMapByKind),
    }

    code.push(Code.export$(
      Code.interface$(
        `Index`,
        Code.objectFrom({
          name: Code.quote(config.name),
          RootTypesPresent: `[${
            Object.entries(rootTypesPresence).filter(([_, present]) => present).map(([_]) => Code.quote(_)).join(`, `)
          }]`,
          Root: {
            type: Code.objectFrom({
              Query: rootTypesPresence.Query ? `${SchemaNamespace}.Root.Query` : null,
              Mutation: rootTypesPresence.Mutation ? `${SchemaNamespace}.Root.Mutation` : null,
              Subscription: rootTypesPresence.Subscription ? `${SchemaNamespace}.Root.Subscription` : null,
            }),
          },
          objects: Code.objectFromEntries(
            config.typeMapByKind.GraphQLObjectType.map(_ => [_.name, `${SchemaNamespace}.Object.${_.name}`]),
          ),
          unions: Code.objectFromEntries(
            config.typeMapByKind.GraphQLUnionType.map(_ => [_.name, `${SchemaNamespace}.Union.${_.name}`]),
          ),
          interfaces: Code.objectFromEntries(
            config.typeMapByKind.GraphQLInterfaceType.map(_ => [_.name, `${SchemaNamespace}.Interface.${_.name}`]),
          ),
          // todo jsdoc comment saying:
          // Objects that match this pattern name: /.../
          error: Code.objectFrom({
            objects: Code.objectFromEntries(
              config.error.objects.map(_ => [_.name, `${SchemaNamespace}.Object.${_.name}`]),
            ),
            objectsTypename: Code.objectFromEntries(
              config.error.objects.map(_ => [_.name, `{ __typename: "${_.name}" }`]),
            ),
            rootResultFields: `{
          ${
              Object.entries(config.rootTypes).map(([rootTypeName, rootType]) => {
                if (!rootType) return `${rootTypeName}: {}`

                const resultFields = Object.values(rootType.getFields()).filter((field) => {
                  const type = unwrapToNamed(field.type)
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

    return code.join(`\n`)
  },
)
