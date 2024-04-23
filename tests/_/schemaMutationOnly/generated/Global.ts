import { Index } from './Index.js'

declare global {
  interface NamedSchemas {
    MutationOnly: {
      index: Index
      customScalars: {}
      featureOptions: {
        schemaErrors: false
      }
    }
  }
}
