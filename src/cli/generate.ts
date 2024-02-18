import { generateFile } from '../lib/generate.js'

await generateFile({
  schemaPath: `./examples/schema.graphql`,
  typeScriptPath: `./src/demo.ts`,
})
