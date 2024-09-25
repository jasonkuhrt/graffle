import type { GlobalSetupContext } from 'vitest/node'
import { schema } from '../../../examples/$/schemas/pokemon/schema.js'
import { serveSchema } from '../lib/serveSchema.js'

declare module 'vitest' {
  export interface ProvidedContext {
    service: {
      url: string
    }
  }
}

export default async ({ provide }: GlobalSetupContext) => {
  const service = await serveSchema({ schema, log: true })

  provide(`service`, {
    url: service.url.href,
  })

  return service.stop
}
