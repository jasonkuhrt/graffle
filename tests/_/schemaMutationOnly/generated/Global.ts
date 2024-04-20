import { Index } from './Index.js'

import type * as CustomScalar from '../../customScalarCodecs.js'

declare global {
  interface NamedSchemas {
    MutationOnly: {
      index: Index
      customScalars: {}
    }
  }
}
