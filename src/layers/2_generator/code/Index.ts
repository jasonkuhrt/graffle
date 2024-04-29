import { isUnionType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { hasMutation, hasQuery, hasSubscription, unwrapToNamed } from '../../../lib/graphql.js'
import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameSchemaBuildtime } from './SchemaBuildtime.js'

export const { generate: generateIndex, moduleName: moduleNameIndex } = createCodeGenerator(
  `Index`,
  (config) => {
    const namespace = `Schema`
    const code = []
    code.push(`/* eslint-disable */\n`)
    code.push(`import type * as ${namespace} from './${moduleNameSchemaBuildtime}.js'\n`)

    code.push(Code.export$(
      Code.interface$(
        `Index`,
        Code.objectFrom({
          name: Code.quote(config.name),
          Root: {
            type: Code.objectFrom({
              Query: hasQuery(config.typeMapByKind) ? `${namespace}.Root.Query` : null,
              Mutation: hasMutation(config.typeMapByKind) ? `${namespace}.Root.Mutation` : null,
              Subscription: hasSubscription(config.typeMapByKind) ? `${namespace}.Root.Subscription` : null,
            }),
          },
          objects: Code.objectFromEntries(
            config.typeMapByKind.GraphQLObjectType.map(_ => [_.name, `${namespace}.Object.${_.name}`]),
          ),
          unions: Code.objectFromEntries(
            config.typeMapByKind.GraphQLUnionType.map(_ => [_.name, `${namespace}.Union.${_.name}`]),
          ),
          interfaces: Code.objectFromEntries(
            config.typeMapByKind.GraphQLInterfaceType.map(_ => [_.name, `${namespace}.Interface.${_.name}`]),
          ),
          // todo jsdoc comment saying:
          // Objects that match this pattern name: /.../
          error: Code.objectFrom({
            objects: Code.objectFromEntries(
              config.error.objects.map(_ => [_.name, `${namespace}.Object.${_.name}`]),
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
