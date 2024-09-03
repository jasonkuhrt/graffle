import type { Index } from './Index.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      SocialStudies: {
        name: 'SocialStudies'
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: true
        }
        /**
         * https://countries.trevorblades.com/graphql
         */
        defaultSchemaUrl: string
      }
    }
  }
}
