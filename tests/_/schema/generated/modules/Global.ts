import type * as Data from './Data.js'
import type * as MethodsDocument from './MethodsDocument.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as MethodsSelect from './MethodsSelect.js'
import type * as Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      default: {
        interfaces: {
          MethodsSelect: MethodsSelect.$MethodsSelect
          Document: MethodsDocument.BuilderMethodsDocumentFn
          Root: MethodsRoot.BuilderMethodsRootFn
        }
        name: Data.Name
        index: Index
        customScalars: {
          Date: Scalar.Date
        }
        featureOptions: {
          schemaErrors: true
        }
        defaultSchemaUrl: null
      }
    }
  }
}
