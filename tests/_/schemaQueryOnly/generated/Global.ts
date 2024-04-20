import { Index } from './Index.js'

declare global {
  interface NamedSchemas {
    QueryOnly: {
      index: Index
      customScalars: {}
    }
  }
}
