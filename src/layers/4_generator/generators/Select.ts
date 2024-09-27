// todo jsdoc
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { renderName, title1, typeTitle } from '../helpers/render.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorSchemaIndex } from './SchemaIndex.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorSelect = createModuleGenerator(
  `Select`,
  ({ config, code }) => {
    code.push(`import * as Data from './${ModuleGeneratorData.name}.js'`)
    code.push(`import type { Index } from './${ModuleGeneratorSchemaIndex.name}.js'`)
    code.push(`import type { ResultSet } from '${config.paths.imports.grafflePackage.schema}'`)
    code.push(`import type * as SelectionSets from './${ModuleGeneratorSelectionSets.name}.js'`)
    code.push(``)

    code.push(title1(`Runtime`))
    code.push(`import { createSelect } from '${config.paths.imports.grafflePackage.client}'`)
    code.push(`export const Select = createSelect(Data.Name)`)
    code.push(``)

    code.push(title1(`Buildtime`))
    code.push(``)

    code.push(`export namespace Select {`)

    code.push(typeTitle(config, `Root`))

    code.push(...config.schema.typeMapByKind.GraphQLRootType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Root<$SelectionSet, Index, '${type.name}'>`
    }))

    code.push(typeTitle(config, `Object`))

    // TODO propagate descriptions to JSDoc
    code.push(...config.schema.typeMapByKind.GraphQLObjectType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code.push(typeTitle(config, `Union`))

    code.push(...config.schema.typeMapByKind.GraphQLUnionType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Union<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code.push(typeTitle(config, `Interface`))

    code.push(...config.schema.typeMapByKind.GraphQLInterfaceType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = ResultSet.Interface<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code.push(`}`) // namespace Select
  },
)
