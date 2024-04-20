import { Index } from './Index.js'

import type * as CustomScalar from '../../../../_/customScalarCodecs.js'

declare global {
  interface NamedSchemas {
    MigrateMe: {
      index: Index
      customScalars: {
        Date: CustomScalar.Date
      }
    }
  }
}
