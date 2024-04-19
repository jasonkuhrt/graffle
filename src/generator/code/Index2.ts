import { Code } from '../../lib/Code.js'
import { hasMutation, hasQuery, hasSubscription } from '../../lib/graphql.js'
import type { Config } from './generateCode.js'
import { moduleNameSchemaBuildtime } from './SchemaBuildtime2.js'

export const moduleNameIndex = `Index`

export const generateIndex = (config: Config) => {
  const namespace = `Schema`
  const code = []
  code.push(`/* eslint-disable */\n`)
  code.push(`import type * as ${namespace} from './${moduleNameSchemaBuildtime}.js'\n`)
  code.push(Code.export$(
    Code.interface$(
      `Index`,
      Code.objectFrom({
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
      }),
    ),
  ))

  return {
    code: code.join(`\n`),
    moduleName: moduleNameIndex,
  }
}
