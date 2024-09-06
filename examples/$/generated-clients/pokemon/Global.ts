import type { Index } from './Index.js'

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
