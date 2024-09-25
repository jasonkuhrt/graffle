import { schema } from '../../../examples/$/schemas/pokemon/schema.js'
import { serveSchema } from '../lib/serveSchema.js'

await serveSchema({ schema, log: true })
