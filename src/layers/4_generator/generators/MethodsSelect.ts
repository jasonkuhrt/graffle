// todo jsdoc
import { getNodeNameAndKind, isRootType } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { renderName, title1 } from '../helpers/render.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorMethodsSelect = createModuleGenerator(
  `MethodsSelect`,
  ({ config, code }) => {
    code.push(`import type * as $SelectionSets from './${ModuleGeneratorSelectionSets.name}.js'`)
    code.push(`import type * as $Utilities from '${config.libraryPaths.utilitiesForGenerated}'`)
    code.push(``)

    const graphqlTypeGroups = [
      config.typeMapByKind.GraphQLRootType,
      config.typeMapByKind.GraphQLObjectType,
      config.typeMapByKind.GraphQLUnionType,
      config.typeMapByKind.GraphQLInterfaceType,
    ].filter(_ => _.length > 0)

    code.push(title1(`Select Methods Interface`))
    code.push(``)

    code.push(`export interface $MethodsSelect {`)
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
      code.push(title1(titleText))
      code.push(``)

      for (const graphqlType of graphqlTypeGroup) {
        // dprint-ignore
        code.push(`
          export interface ${renderName(graphqlType)} {
            <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.${renderName(graphqlType)}>):
              $SelectionSet
          }`
        )
        code.push(``)
      }
    }
  },
)
