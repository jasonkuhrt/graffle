import { Code } from '../../lib/Code.js'
import { hasMutation, hasQuery, hasSubscription } from '../../lib/graphql.js'
import type { Config } from './code.js'

export const generateIndex = (config: Config) => {
  const namespace = `Schema`
  let code = ``
  code += `import type * as ${namespace} from './SchemaBuildtime.js'\n\n`
  code += Code.export$(
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
      }),
    ),
  )

  return code
}
