import { getNamedType, type GraphQLObjectType, isScalarType } from 'graphql'
import { isAllArgsNullable, RootTypeNameToOperationName } from '../../../lib/graphql.js'
import { createCodeGenerator, createModuleGenerator } from '../createCodeGenerator.js'
import { renderDocumentation, renderName } from '../helpers.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'
import { moduleNameSelectionSets } from './SelectionSets.js'
// { Config, HKT, Exact, ResolveOutputReturnRootField, ResolveOutputReturnRootType }
export const { moduleName: moduleNameMethodsRoot, generate: generateMethodsRoot } = createModuleGenerator(
  `RootMethods`,
  ({ config, code }) => {
    code.push(`import type * as Utils  from '${config.libraryPaths.utilitiesForGenerated}';`)
    code.push(`import type { ResultSet } from '${config.libraryPaths.schema}';`)
    code.push(`import type { Index } from './${moduleNameSchemaIndex}.js'`)
    code.push(`import type * as SelectionSet from './${moduleNameSelectionSets}.js'`)
    code.push(``)

    // todo remove when schema errors not in use
    code.push(`
      type Aug<
        $Config extends Utils.Config,
        $RootTypeName extends Index['RootTypesPresent'][number],
        $Selection,
      > = Utils.ConfigGetOutputError<$Config, 'schema'> extends 'throw'
        ? (keyof $Selection & Index['error']['rootResultFields'][$RootTypeName]) extends never
          ? $Selection
          : $Selection & Utils.SelectionSet.TypenameSelection
        : $Selection
    `)
    code.push(``)

    config.rootTypesPresent.forEach(node => {
      code.push(renderRootType({ config, node }))
      code.push(``)
    })

    code.push(`
      export interface BuilderRootMethods<$Config extends Utils.Config> {
        ${
      config.typeMapByKind.GraphQLRootType.map(node => {
        const operationName = RootTypeNameToOperationName[node.name as keyof typeof RootTypeNameToOperationName]
        return `${operationName}: ${node.name}Methods<$Config>`
      }).join(`\n`)
    }
      }
    `)
    code.push(``)

    code.push(`
      export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
        // @ts-expect-error parameter is Untyped.
        return: BuilderRootMethods<this['params']['Config']>
      }
    `)

    // console.log(code.join(`\n`))
  },
)

const renderRootType = createCodeGenerator<{ node: GraphQLObjectType }>(({ node, config, code }) => {
  const fieldMethods = renderFieldMethods({ config, node })

  code.push(`
    export interface ${node.name}Methods<$Config extends Utils.Config> {
      $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.${node.name}>) =>
        Promise<
          Utils.ResolveOutputReturnRootType<
            $Config,
            Index,
            ResultSet.${node.name}<
              Aug<$Config, '${node.name}', $SelectionSet>,
              Index
            >
          >
        >
      __typename: () =>
        Promise<
          Utils.ResolveOutputReturnRootField<
            $Config,
            Index,
            '__typename',
            '${node.name}'
          >
        >
      ${fieldMethods}
    }`)
})

const renderFieldMethods = createCodeGenerator<{ node: GraphQLObjectType }>(({ node, config, code }) => {
  for (const field of Object.values(node.getFields())) {
    const doc = renderDocumentation(config, field)
    code.push(doc)

    const fieldTypeUnwrapped = getNamedType(field.type)

    if (isScalarType(fieldTypeUnwrapped)) {
      const isArgsAllNullable_ = isAllArgsNullable(field.args)
      const parametersCode = field.args.length > 0
        ? `<$SelectionSet>(args${isArgsAllNullable_ ? `?` : ``}: Utils.Exact<$SelectionSet, SelectionSet.${
          renderName(node)
        }.${renderName(field)}$SelectionSetArguments>)`
        : `()`

      code.push(`
        ${field.name}: ${parametersCode} =>
          ${Helpers.returnType(node.name, field.name, `true`)}
      `)
    } else {
      code.push(`
        ${field.name}: <$SelectionSet>
        (selectionSet: Utils.Exact<$SelectionSet, SelectionSet.${renderName(node)}.${renderName(field)}>) =>
          ${Helpers.returnType(node.name, field.name, `$SelectionSet`)}
      `)
    }
  }
})

namespace Helpers {
  export const returnType = (rootName: string, fieldName: string, selectionSet: string) => {
    return `
      Promise<
        Utils.ResolveOutputReturnRootField<
          $Config,
          Index,
          '${fieldName}',
          ResultSet.Field<${selectionSet}, Index['Root']['${rootName}']['fields']['${fieldName}'], Index>
        >
      >
    `
  }
}
