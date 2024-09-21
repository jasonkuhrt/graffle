import type * as Data from './Data.js'
import type * as MethodsDocument from './MethodsDocument.js'
import type * as MethodsRoot from './RootMethods.js'
import type { Index } from './SchemaIndex.js'
import type * as MethodsSelect from './SelectMethods.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      QueryOnly: {
        interfaces: {
          SelectMethods: MethodsSelect.$SelectMethods
          Document: MethodsDocument.BuilderMethodsDocumentFn
          Root: MethodsRoot.BuilderMethodsRootFn
        }
        name: Data.Name
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: false
        }
        defaultSchemaUrl: null
      }
    }
  }
}
