import { createCodeGenerator } from '../createCodeGenerator.js'
import { title, typeTitle } from '../helpers.js'
import { moduleNameIndex } from './Index.js'

export const { generate: generateSelect, moduleName: moduleNameSelect } = createCodeGenerator(
  `Select`,
  (config) => {
    const code: string[] = []

    code.push(`import { Index } from './${moduleNameIndex}.js'`)
    code.push(`import { SelectionSet, ResultSet } from '${config.libraryPaths.schema}'`)
    code.push(``)

    code.push(
      title(`Runtime`),
      `import { createSelect } from '${config.libraryPaths.client}'`,
      `export const Select = createSelect('default')`,
      ``,
      title(`Buildtime`),
      ``,
      `export namespace Select {`,
      typeTitle(config, `Root`),
    )

    code.push(...config.typeMapByKind.GraphQLRootType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Root<Index, '${type.name}'>> = ResultSet.Root<$SelectionSet, Index, '${type.name}'>\n`
    }))

    code.push(typeTitle(config, `Object`))

    // TODO propagate descriptions to JSDoc
    code.push(...config.typeMapByKind.GraphQLObjectType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Object<Index['objects']['${type.name}'], Index>> = ResultSet.Object$<$SelectionSet, Index['objects']['${type.name}'], Index>\n`
    }))

    code.push(typeTitle(config, `Union`))

    code.push(...config.typeMapByKind.GraphQLUnionType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Union<Index['unions']['${type.name}'], Index>> = ResultSet.Union<$SelectionSet, Index['unions']['${type.name}'], Index>\n`
    }))

    code.push(typeTitle(config, `Interface`))

    code.push(...config.typeMapByKind.GraphQLInterfaceType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Interface<Index['interfaces']['${type.name}'], Index>> = ResultSet.Interface<$SelectionSet, Index['interfaces']['${type.name}'], Index>\n`
    }))

    code.push(`}`) // namespace Select

    return code.join(`\n`)
  },
)
