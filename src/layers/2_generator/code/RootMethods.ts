import { getNamedType, type GraphQLObjectType, isScalarType } from 'graphql'
import { isAllArgsNullable, RootTypeNameToOperationName } from '../../../lib/graphql.js'
import { createCodeGenerator, createModuleGenerator } from '../createCodeGenerator.js'
import { renderDocumentation, renderName } from '../helpers.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'
import { moduleNameSelectionSets } from './SelectionSets.js'

export const { moduleName: moduleNameRootMethods, generate: generateRootMethods } = createModuleGenerator(
  `RootMethods`,
  ({ config, code }) => {
    code.push(
      `import type { Config, HKT, Exact, ResolveOutputReturnRootField, ResolveOutputReturnRootType } from '${config.libraryPaths.utilitiesForGenerated}';`,
    )
    code.push(`import type { ResultSet, SelectionSet } from '${config.libraryPaths.schema}';`)
    code.push(`import type { Index } from './${moduleNameSchemaIndex}.js'`)
    code.push(`import type * as SelectionSetGen from './${moduleNameSelectionSets}.js'`)
    code.push(``)

    config.rootTypesPresent.forEach(node => {
      code.push(renderRootType({ config, node }))
      code.push(``)
    })

    code.push(`
      export interface BuilderRootMethods<$Config extends Config> {
        ${
      config.rootTypesPresent.map(node => {
        const operationName = RootTypeNameToOperationName[node.name as keyof typeof RootTypeNameToOperationName]
        return `${operationName}: ${node.name}Methods<$Config>`
      }).join(`\n`)
    }
      }
    `)
    code.push(``)

    code.push(`
      export interface BuilderRootMethodsFn extends HKT.Fn {
        // @ts-expect-error parameter is Untyped.
        return: BuilderRootMethods<this['Params']['Config']>
      }
    `)

    // console.log(code.join(`\n`))
  },
)

const renderRootType = createCodeGenerator<{ node: GraphQLObjectType }>(({ node, config, code }) => {
  const fieldMethods = renderFieldMethods({ config, node })

  code.push(`
    export interface ${node.name}Methods<$Config extends Config> {
      $batch: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.${node.name}<Index>>) =>
        Promise<
          ResolveOutputReturnRootType<
            $Config,
            Index,
            ResultSet.${node.name}<
              $SelectionSet,
              // todo if schema errors are enabled, then augment the selection set
              // AugmentRootTypeSelectionWithTypename<$Config, Index, '${node.name}', $SelectionSet>,
              Index
            >
          >
        >
      ${fieldMethods}
    }`)
})

const renderFieldMethods = createCodeGenerator<{ node: GraphQLObjectType }>(({ node, config, code }) => {
  for (const field of Object.values(node.getFields())) {
    const doc = renderDocumentation(config, field)
    const fieldTypeUnwrapped = getNamedType(field.type)
    code.push(doc)

    if (isScalarType(fieldTypeUnwrapped)) {
      // todo allow scalar fields to have directives applies still for consistency.
      //
      const isArgsAllNullable_ = isAllArgsNullable(field.args)
      const parametersCode = field.args.length > 0
        ? `<$SelectionSet>(args${isArgsAllNullable_ ? `?` : ``}: Exact<$SelectionSet, SelectionSetGen.${
          renderName(node)
        }.${renderName(field)}>)`
        : `()`

      code.push(
        `${field.name}: ${parametersCode} =>
          Promise<
            ResolveOutputReturnRootField<
              $Config,
              Index,
              '${field.name}',
              ResultSet.Field<true, Index['Root']['${node.name}']['fields']['${field.name}'], Index>
            >
          >`,
      )
    } else {
      // (selectionSet: Exact<$SelectionSet, SelectionSet.Field<Index['Root']['${node.name}']['fields']['${fieldName}'], Index>>) =>
      code.push(
        `${field.name}: <$SelectionSet>
        (selectionSet: Exact<$SelectionSet, SelectionSetGen.${renderName(node)}.${renderName(field)}>) =>
          Promise<
            ResolveOutputReturnRootField<
              $Config,
              Index,
              '${field.name}',
              ResultSet.Field<$SelectionSet, Index['Root']['${node.name}']['fields']['${field.name}'], Index>
            >
          >`,
      )
    }
  }
})
