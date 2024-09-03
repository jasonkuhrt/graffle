import type { Index } from './Index.js'

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
