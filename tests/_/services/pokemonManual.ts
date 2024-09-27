import { serveSchema } from '../lib/serveSchema.js'
import { schema } from '../schemas/pokemon/schema.js'

await serveSchema({ schema, log: true })
