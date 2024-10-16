import type * as Data from './Data.js'
import type * as MethodsDocument from './MethodsDocument.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as MethodsSelect from './MethodsSelect.js'
import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobal {
    export interface Schemas {
      Pokemon: {
        name: Data.Name
        index: Index
        interfaces: {
          MethodsSelect: MethodsSelect.$MethodsSelect
          Document: MethodsDocument.BuilderMethodsDocumentFn
          Root: MethodsRoot.BuilderMethodsRootFn
        }
        customScalars: {}

        /**
         * http://localhost:3000/graphql
         */
        defaultSchemaUrl: string
      }
    }
  }
}
