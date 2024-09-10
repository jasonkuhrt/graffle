import { generateDocs } from './generate-docs.js'
import { generateOutputs } from './generate-outputs.js'
import { generateTests } from './generate-tests.js'
import { readExamples } from './helpers.js'

await generateOutputs()

const examples = await readExamples()

await Promise.all([
  generateTests(examples),
  generateDocs(examples),
])
