// todo remove use of Utils.Aug when schema errors not in use
// todo jsdoc
import { identifiers } from '../helpers/identifiers.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorSchema } from './Schema.js'
import { ModuleGeneratorSelectionSets } from './SelectionSets.js'

export const ModuleGeneratorMethodsDocument = createModuleGenerator(
  `MethodsDocument`,
  ({ config, code }) => {
    code(`import type * as SelectionSets from './${ModuleGeneratorSelectionSets.name}.js'`)
    code(`import type * as Utilities from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'`)
    code(`import type { ${identifiers.Schema} } from './${ModuleGeneratorSchema.name}.js'`)
    code()

    code(`export interface Document<$Config extends Utilities.Config> {
			<$Document>(document: Utilities.ExactNonEmpty<$Document, SelectionSets.$Document>): Utilities.DocumentRunner<
				$Config,
				${identifiers.Schema},
				// @ts-expect-error We use Exact instead of constraint on this function. TypeScript does not see that as
				// Satisfying the constraint on the DocumentRunner type.
				$Document
			>
		}`)
    code()

    code(`
      export interface BuilderMethodsDocumentFn extends Utilities.TypeFunction.Fn {
        // @ts-expect-error parameter is Untyped.
        return: Document<this['params']['config']>
      }
    `)
  },
)
