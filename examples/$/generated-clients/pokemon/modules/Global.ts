import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      Pokemon: {
        name: 'Pokemon'
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: true
        }
        defaultSchemaUrl: null
      }
    }
  }
}
