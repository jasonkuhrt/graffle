import { generateDocs } from './generate-docs.js'
import { generateOutputs } from './generate-outputs.js'
import { generateTests } from './generate-tests.js'

await Promise.all([generateOutputs(), generateTests()])
await generateDocs()
