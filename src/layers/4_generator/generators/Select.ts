// todo jsdoc
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { renderName, title1, typeTitle } from '../helpers/render.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorSchemaIndex } from './SchemaIndex.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorSelect = createModuleGenerator(
  `Select`,
  ({ config, code }) => {
    code(`import * as Data from './${ModuleGeneratorData.name}.js'`)
    code(`import type { Index } from './${ModuleGeneratorSchemaIndex.name}.js'`)
    code(`import type { InferResult } from '${config.paths.imports.grafflePackage.schema}'`)
    code(`import type * as SelectionSets from './${ModuleGeneratorSelectionSets.name}.js'`)
    code()

    code(title1(`Runtime`))
    code(`import { createSelect } from '${config.paths.imports.grafflePackage.client}'`)
    code(`export const Select = createSelect(Data.Name)`)
    code()

    code(title1(`Buildtime`))
    code()

    code(`export namespace Select {`)

    code(typeTitle(config, `Root`))

    code(...config.schema.typeMapByKind.GraphQLRootType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = InferResult.Root<$SelectionSet, Index, '${type.name}'>`
    }))

    code(typeTitle(config, `Object`))

    // TODO propagate descriptions to JSDoc
    code(...config.schema.typeMapByKind.GraphQLObjectType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = InferResult.Object<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code(typeTitle(config, `Union`))

    code(...config.schema.typeMapByKind.GraphQLUnionType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = InferResult.Union<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code(typeTitle(config, `Interface`))

    code(...config.schema.typeMapByKind.GraphQLInterfaceType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSets.${
        renderName(type)
      }> = InferResult.Interface<$SelectionSet, Index, Index['allTypes']['${type.name}']>`
    }))

    code(`}`) // namespace Select
  },
)
