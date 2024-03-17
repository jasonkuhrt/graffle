import { generateFile } from '../generator/generator.js'

await generateFile({
  schemaPath: `./examples/schema.graphql`,
  typeScriptPath: `./src/demo.ts`,
})
