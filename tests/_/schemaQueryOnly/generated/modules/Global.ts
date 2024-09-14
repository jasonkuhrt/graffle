import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      QueryOnly: {
        name: 'QueryOnly'
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
