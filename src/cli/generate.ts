import { generateFile } from '../lib/generateTypes.js'

await generateFile({
  schemaPath: `./examples/schema.graphql`,
  typeScriptPath: `./src/demo.ts`,
})
