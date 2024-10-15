// todo remove use of Utils.Aug when schema errors not in use
import { Grafaid } from '../../../lib/grafaid/__.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { createCodeGenerator } from '../helpers/moduleGeneratorRunner.js'
import { renderDocumentation, renderName } from '../helpers/render.js'
import { ModuleGeneratorSchemaIndex } from './SchemaIndex.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorMethodsRoot = createModuleGenerator(
  `MethodsRoot`,
  ({ config, code }) => {
    code(`import { type Simplify } from 'type-fest'`)
    code(`import type * as Utils  from '${config.paths.imports.grafflePackage.utilitiesForGenerated}';`)
    code(`import type { InferResult } from '${config.paths.imports.grafflePackage.schema}';`)
    code(`import type { Index } from './${ModuleGeneratorSchemaIndex.name}.js'`)
    code(`import type * as SelectionSet from './${ModuleGeneratorSelectionSets.name}.js'`)
    code()

    code()

    config.schema.typeMapByKind.GraphQLRootType.forEach(node => {
      code(renderRootType({ config, node }))
      code()
    })

    code(`
      export interface BuilderMethodsRoot<$Config extends Utils.Config> {
        ${
      config.schema.typeMapByKind.GraphQLRootType.map(node => {
        const operationName =
          Grafaid.RootTypeNameToOperationName[node.name as keyof typeof Grafaid.RootTypeNameToOperationName]
        return `${operationName}: ${node.name}Methods<$Config>`
      }).join(`\n`)
    }
      }
    `)
    code()

    code(`
      export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
        // @ts-expect-error parameter is Untyped.
        return: BuilderMethodsRoot<this['params']['config']>
      }
    `)

    // console.log(code.join(`\n`))
  },
)

const renderRootType = createCodeGenerator<{ node: Grafaid.Schema.ObjectType }>(({ node, config, code }) => {
  const fieldMethods = renderFieldMethods({ config, node })

  code(`
    export interface ${node.name}Methods<$Config extends Utils.Config> {
      // todo Use a static type here?
      $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.${node.name}>) =>
        Promise<
          Simplify<
            Utils.HandleOutput<
              $Config,
              InferResult.${node.name}<
                Utils.AddTypenameToSelectedRootTypeResultFields<$Config, Index, '${node.name}', $SelectionSet>,
                Index
              >
            >
          >
        >
      // todo Use a static type here?
      __typename: () =>
        Promise<
          Simplify<
            Utils.HandleOutputGraffleRootField<
              $Config,
              { __typename: '${node.name}' },
              '__typename'
            >
          >
        >
      ${fieldMethods}
    }`)
})

const renderFieldMethods = createCodeGenerator<{ node: Grafaid.Schema.ObjectType }>(({ node, config, code }) => {
  for (const field of Object.values(node.getFields())) {
    const doc = renderDocumentation(config, field)
    code(doc)

    const fieldTypeUnwrapped = Grafaid.Schema.getNamedType(field.type)

    const isOptional = Grafaid.Schema.isScalarType(fieldTypeUnwrapped)
      && Grafaid.Schema.Args.isAllArgsNullable(field.args)

    // dprint-ignore
    code(`
      ${field.name}: <$SelectionSet>(selectionSet${isOptional ? `?` : ``}: Utils.Exact<$SelectionSet, SelectionSet.${renderName(node)}.${renderName(field)}>) =>
        ${Helpers.returnType(node.name, field.name, `$SelectionSet`)}
    `)
  }
})

namespace Helpers {
  export const returnType = (rootName: string, fieldName: string, selectionSet: string) => {
    return `
      Promise<
        Simplify<
          Utils.HandleOutputGraffleRootField<
            $Config,
            InferResult.${rootName}<{ ${fieldName}: ${selectionSet}}, Index>,
            '${fieldName}'
          >
        >
      >
    `
  }
}
