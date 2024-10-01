import type * as Data from './Data.js'
import type * as MethodsDocument from './MethodsDocument.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as MethodsSelect from './MethodsSelect.js'
import type * as SchemaCustomScalarIndex from './SchemaCustomScalarIndex.js'
import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
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
        // schemaCustomScalarsIndex: SchemaCustomScalarIndex
        featureOptions: {
          schemaErrors: true
        }
        /**
         * http://localhost:3000/graphql
         */
        defaultSchemaUrl: string
      }
    }
  }
}
