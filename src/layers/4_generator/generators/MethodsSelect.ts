// todo jsdoc
import { Grafaid } from '../../../lib/grafaid/__.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { renderName, title1 } from '../helpers/render.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorMethodsSelect = createModuleGenerator(
  `MethodsSelect`,
  ({ config, code }) => {
    code(`import type * as $SelectionSets from './${ModuleGeneratorSelectionSets.name}.js'`)
    code(`import type * as $Utilities from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'`)
    code()

    const graphqlTypeGroups = [
      config.schema.kindMap.GraphQLRootType,
      config.schema.kindMap.GraphQLObjectType,
      config.schema.kindMap.GraphQLUnionType,
      config.schema.kindMap.GraphQLInterfaceType,
    ].filter(_ => _.length > 0)

    code(title1(`Select Methods Interface`))
    code()

    code(`export interface $MethodsSelect {`)
    for (const graphqlTypeGroup of graphqlTypeGroups) {
      for (const graphqlType of graphqlTypeGroup) {
        // dprint-ignore
        code(`${graphqlType.name}: ${renderName(graphqlType)}`)
      }
    }
    code(`}`)
    code()

    for (const graphqlTypeGroup of graphqlTypeGroups) {
      const { kind } = Grafaid.getTypeNameAndKind(graphqlTypeGroup[0]!)
      const titleText = Grafaid.Schema.isRootType(graphqlTypeGroup[0]!) ? `Root` : kind
      code(title1(titleText))
      code()

      for (const graphqlType of graphqlTypeGroup) {
        // dprint-ignore
        code(`
          export interface ${renderName(graphqlType)} {
            <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.${renderName(graphqlType)}>):
              $SelectionSet
          }`
        )
        code()
      }
    }
  },
)
