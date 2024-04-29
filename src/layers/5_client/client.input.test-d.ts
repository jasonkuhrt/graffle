import { test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { QueryOnly } from '../../../tests/_/schemaQueryOnly/generated/__.js'

test(`works`, () => {
  Graffle.create({ schema, returnMode: `graphql` })
  Graffle.create({ schema, returnMode: `data` })
  Graffle.create({ schema, returnMode: `dataAndErrors` })
  Graffle.create({ schema, returnMode: `successData` })

  QueryOnly.create({ schema, returnMode: `graphql` })
  QueryOnly.create({ schema, returnMode: `data` })
  QueryOnly.create({ schema, returnMode: `dataAndErrors` })
  // @ts-expect-error bad returnMode
  QueryOnly.create({ schema, name: `QueryOnly`, returnMode: `successData` })
})
