import type { GraphQLObjectType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { RootTypeNameToOperationName } from '../../../lib/graphql.js'
import { createCodeGenerator, createModuleGenerator } from '../createCodeGenerator.js'
import { getDocumentation } from '../helpers.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'

export const { moduleName: moduleNameRootMethods, generate: generateRootMethods } = createModuleGenerator(
  `RootMethods`,
  ({ config, code }) => {
    code.push(`import type { Config, HKT } from '${config.libraryPaths.utilitiesForGenerated}';`)
    code.push(`import type { ResultSet } from '${config.libraryPaths.schema}';`)
    code.push(`import type { Index } from './${moduleNameSchemaIndex}.js'`)
    config.rootTypesPresent.forEach(root => {
      code.push(renderRoot({ config, node: root }))
    })

    code.push(`
      export interface BuilderRootMethods<$Config extends Config> {
        ${
      config.rootTypesPresent.map(_ =>
        `${RootTypeNameToOperationName[_.name as keyof typeof RootTypeNameToOperationName]}: ${_.name}Methods<$Config>`
      ).join(`\n`)
    }
      }
    `)
    code.push(`
      export interface BuilderRootMethodsFn extends HKT.Fn {
        // @ts-expect-error parameter is Untyped.
        return: BuilderRootMethods<this['Params']['Config']>
      }
    `)

    return code
  },
)

const renderRoot = createCodeGenerator<{ node: GraphQLObjectType }>(({ node, config, code }) => {
  const fieldMethods = renderRootMethodProperties({ config, node })

  code.push(`
    export interface ${node.name}Methods<$Config extends Config> {
      $batch: 'todo'
      ${fieldMethods}
    }`)

  return code
})

const renderRootMethodProperties = createCodeGenerator<{ node: GraphQLObjectType }>(({ node, config, code }) => {
  for (const [fieldName, _field] of Object.entries(node.getFields())) {
    const doc = Code.TSDoc(getDocumentation(config, _field))
    code.push(doc)
    // todo selectionSet constraint
    code.push(
      `${fieldName}: <$SelectionSet>(selectionSet: $SelectionSet) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['${node.name}']['fields']['${fieldName}'], Index>>`,
    )
  }
  return code
})
