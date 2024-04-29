import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameIndex } from './Index.js'

export const { generate: generateSelect, moduleName: moduleNameSelect } = createCodeGenerator(
  `Select`,
  (config) => {
    const title = (title: string) => {
      const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
      return titleDecorated
    }
    const typeTitle = (typeName: string) => {
      // @ts-expect-error ignoreme
      // eslint-disable-next-line
      const hasItems = config.typeMapByKind[`GraphQL${typeName}Type`]?.length > 0
      const title = `${typeName} Types`
      const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
      if (hasItems) {
        return titleDecorated
      } else {
        return `${titleDecorated}\n// -- None --\n`
      }
    }

    const code: string[] = []

    code.push(`import { Index } from './${moduleNameIndex}.js'`)
    code.push(`import { SelectionSet, ResultSet } from '${config.libraryPaths.schema}'`)
    code.push(``)

    code.push(title(`Runtime`))
    code.push(`import { createSelect } from '${config.libraryPaths.client}'`)
    code.push(`export const Select = createSelect('default')`)
    code.push(``)

    code.push(typeTitle(`Root`))

    code.push(...config.typeMapByKind.GraphQLRootType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Root<Index, '${type.name}'>> = ResultSet.Root<$SelectionSet, Index, '${type.name}'>\n`
    }))

    code.push(typeTitle(`Object`))

    // TODO propagate descriptions to JSDoc
    code.push(...config.typeMapByKind.GraphQLObjectType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Object<Index['objects']['${type.name}'], Index>> = ResultSet.Object$<$SelectionSet, Index['objects']['${type.name}'], Index>\n`
    }))

    code.push(typeTitle(`Union`))

    code.push(...config.typeMapByKind.GraphQLUnionType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Union<Index['unions']['${type.name}'], Index>> = ResultSet.Union<$SelectionSet, Index['unions']['${type.name}'], Index>\n`
    }))

    code.push(typeTitle(`Interface`))

    code.push(...config.typeMapByKind.GraphQLInterfaceType.map((type) => {
      return `export type ${type.name}<$SelectionSet extends SelectionSet.Interface<Index['interfaces']['${type.name}'], Index>> = ResultSet.Interface<$SelectionSet, Index['interfaces']['${type.name}'], Index>\n`
    }))

    return code.join(`\n`)
  },
)
