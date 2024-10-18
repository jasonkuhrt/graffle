import type { GlobalRegistry } from '../../layers/4_generator/globalRegistry.js'

declare global {
  namespace GraffleGlobal {
    // interface Schema {
    //   SchemaErrors: {
    //     objectNames: string
    //   }
    // }
    namespace SchemaDrivenDataMap {
      interface OutputObject {
        /**
         * Is this output object an error object?
         */
        e?: 1
      }
      interface OutputField {
        /**
         * Is this output field a result field?
         */
        r?: 1
      }
    }
  }
}

export type GeneratedExtensions = GlobalRegistry.Extensions<{
  Schema: {
    SchemaErrors: {
      objectNames: string
    }
  }
}>
