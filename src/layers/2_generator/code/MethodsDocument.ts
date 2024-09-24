// todo remove use of Utils.Aug when schema errors not in use
// todo jsdoc
import { hasMutation, hasQuery } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../createCodeGenerator.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'
import { moduleNameSelectionSets } from './SelectionSets.js'

export const { generate: generateMethodsDocument, moduleName: moduleNameMethodsDocument } = createModuleGenerator(
  `MethodsDocument`,
  ({ config, code }) => {
    code.push(`import type * as SelectionSets from './${moduleNameSelectionSets}.js'`)
    code.push(`import type * as Utilities from '${config.libraryPaths.utilitiesForGenerated}'`)
    code.push(`import type { Index } from './${moduleNameSchemaIndex}.js'`)
    code.push(``)

    code.push(
      `interface DocumentInput {`,
      hasQuery(config.typeMapByKind) ? `query: Record<string, SelectionSets.Query>` : null,
      hasMutation(config.typeMapByKind) ? `mutation: Record<string, SelectionSets.Mutation>` : null,
      `}`,
    )
    code.push(``)

    code.push(`export interface Document<$Config extends Utilities.Config> {
			<$Document>(document: Utilities.ExactNonEmpty<$Document, DocumentInput>): Utilities.DocumentRunner<
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
