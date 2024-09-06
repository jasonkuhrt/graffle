import { printSchema } from 'graphql'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { schema } from './schema.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sdl = printSchema(schema)
const path = join(__dirname, `./schema.graphql`)
writeFileSync(path, sdl)

console.log(`GraphQL SDL has been written to ${path}`)
