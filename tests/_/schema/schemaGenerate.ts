import { printSchema } from 'graphql'
import fs from 'node:fs/promises'
import { schema } from './schema.js'

await fs.writeFile(
  `./tests/_/schema/schema.graphql`,
  printSchema(schema),
)
