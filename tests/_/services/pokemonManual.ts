import { serveSchema } from '../lib/serveSchema.js'
import { schema } from '../schemas/Pokemon/schema.js'

await serveSchema({ schema, log: true })
