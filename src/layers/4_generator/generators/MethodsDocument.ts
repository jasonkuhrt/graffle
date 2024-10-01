// todo remove use of Utils.Aug when schema errors not in use
// todo jsdoc
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorSchemaIndex } from './SchemaIndex.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorMethodsDocument = createModuleGenerator(
  `MethodsDocument`,
  ({ config, code }) => {
    code.push(`import type * as SelectionSets from './${ModuleGeneratorSelectionSets.name}.js'`)
    code.push(`import type * as Utilities from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'`)
    code.push(`import type { Index } from './${ModuleGeneratorSchemaIndex.name}.js'`)
    code.push(``)

    code.push(`export interface Document<$Config extends Utilities.Config> {
			<$Document>(document: Utilities.ExactNonEmpty<$Document, SelectionSets.$Document>): Utilities.DocumentRunner<
				$Config,
				Index,
				// @ts-expect-error We use Exact instead of constraint on this function. TypeScript does not see that as
				// Satisfying the constraint on the DocumentRunner type.
				$Document
			>
		}`)
    code.push(``)

    code.push(`
      export interface BuilderMethodsDocumentFn extends Utilities.HKT.Fn {
        // @ts-expect-error parameter is Untyped.
        return: Document<this['params']['config']>
      }
    `)
  },
)
