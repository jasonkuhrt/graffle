import { getNodeNameAndKind, isRootType } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../createCodeGenerator.js'
import { renderName, title1 } from '../helpers.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'
import { moduleNameSelectionSets } from './SelectionSets.js'

export const { generate: generateSelectMethods, moduleName: moduleNameSelectMethods } = createModuleGenerator(
  `SelectMethods`,
  ({ config, code }) => {
    code.push(`import type { Index } from './${moduleNameSchemaIndex}.js'`)
    code.push(`import type { ResultSet } from '${config.libraryPaths.schema}'`)
    code.push(`import type * as SelectionSets from './${moduleNameSelectionSets}.js'`)
    code.push(``)

    const graphqlTypeGroups = [
      config.typeMapByKind.GraphQLRootType,
      config.typeMapByKind.GraphQLObjectType,
      config.typeMapByKind.GraphQLUnionType,
      config.typeMapByKind.GraphQLInterfaceType,
    ].filter(_ => _.length > 0)

    code.push(title1(`Select Methods Interface`))
    code.push(``)

    code.push(`export interface $SelectMethods {`)
    for (const graphqlTypeGroup of graphqlTypeGroups) {
      for (const graphqlType of graphqlTypeGroup) {
        // dprint-ignore
        code.push(`${graphqlType.name}: ${renderName(graphqlType)}`)
      }
    }
    code.push(`}`)
    code.push(``)

    for (const graphqlTypeGroup of graphqlTypeGroups) {
      const { kind } = getNodeNameAndKind(graphqlTypeGroup[0]!)
      const titleText = isRootType(graphqlTypeGroup[0]!) ? `Root` : kind
      const ResultSetMethodName = isRootType(graphqlTypeGroup[0]!)
        ? `RootViaObject`
        : kind === `Object`
        ? `Object$`
        : kind
      code.push(title1(titleText))
      code.push(``)

      for (const graphqlType of graphqlTypeGroup) {
        // dprint-ignore
        code.push(`
          export interface ${renderName(graphqlType)} {
            <$SelectionSet extends SelectionSets.${renderName(graphqlType)}>(selectionSet: $SelectionSet):
              ResultSet.${ResultSetMethodName}<$SelectionSet, Index, Index['allTypes']['${graphqlType.name}']>
          }`
        )
        code.push(``)
      }
    }
  },
)
