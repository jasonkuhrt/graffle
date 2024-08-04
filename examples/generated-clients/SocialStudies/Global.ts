import type { Index } from './Index.js'

declare global {
  export namespace GraphQLRequestTypes {
    export interface Schemas {
      SocialStudies: {
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: true
        }
      }
    }
  }
}
