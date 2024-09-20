// todo jsdoc
import { createModuleGenerator } from '../createCodeGenerator.js'
import { renderName, title1, typeTitle } from '../helpers.js'
import { moduleNameData } from './Data.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'
import { moduleNameSelectionSets } from './SelectionSets.js'

export const { generate: generateSelect, moduleName: moduleNameSelect } = createModuleGenerator(
  `Select`,
  ({ config, code }) => {
    code.push(`import * as Data from './${moduleNameData}.js'`)
    code.push(`import type { Index } from './${moduleNameSchemaIndex}.js'`)
    code.push(`import type { ResultSet } from '${config.libraryPaths.schema}'`)
    code.push(`import type * as SelectionSets from './${moduleNameSelectionSets}.js'`)
    code.push(``)

    code.push(title1(`Runtime`))
    code.push(`import { createSelect } from '${config.libraryPaths.client}'`)
    code.push(`export const Select = createSelect(Data.Name)`)
    code.push(``)

    code.push(title1(`Buildtime`))
    code.push(``)

    code.push(`export namespace Select {`)

    code.push(typeTitle(config, `Root`))

    code.push(...config.typeMapByKind.GraphQLRootType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Root<$SelectionSet, Index, '${type.name}'>`
    }))

    code.push(typeTitle(config, `Object`))

    // TODO propagate descriptions to JSDoc
    code.push(...config.typeMapByKind.GraphQLObjectType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code.push(typeTitle(config, `Union`))

    code.push(...config.typeMapByKind.GraphQLUnionType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Union<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code.push(typeTitle(config, `Interface`))

    code.push(...config.typeMapByKind.GraphQLInterfaceType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Interface<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code.push(`}`) // namespace Select
  },
)
