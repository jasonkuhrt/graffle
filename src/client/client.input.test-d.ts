import { test } from 'vitest'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

test(`works`, () => {
  create({ schemaIndex: $Index, schema, name: `QueryOnly`, returnMode: `graphql` })
  create({ schemaIndex: $Index, schema, name: `QueryOnly`, returnMode: `data` })
  create({ schemaIndex: $Index, schema, name: `QueryOnly`, returnMode: `dataAndErrors` })
  // @ts-expect-error bad returnMode
  create({ schemaIndex: $Index, schema, name: `QueryOnly`, returnMode: `successData` })

  create({ schemaIndex: $Index, schema, name: `default`, returnMode: `graphql` })
  create({ schemaIndex: $Index, schema, name: `default`, returnMode: `data` })
  create({ schemaIndex: $Index, schema, name: `default`, returnMode: `dataAndErrors` })
  create({ schemaIndex: $Index, schema, name: `default`, returnMode: `successData` })

  create({ schemaIndex: $Index, schema, returnMode: `graphql` })
  create({ schemaIndex: $Index, schema, returnMode: `data` })
  create({ schemaIndex: $Index, schema, returnMode: `dataAndErrors` })
  create({ schemaIndex: $Index, schema, returnMode: `successData` })
})
