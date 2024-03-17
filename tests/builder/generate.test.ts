import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'
import { generateFile } from '../../src/generator/generator.js'

test(`generates types from GraphQL SDL file`, async () => {
  await generateFile({
    schemaPath: `./tests/builder/_/schema.graphql`,
    typeScriptPath: `./tests/builder/_/schema.ts`,
  })
  expect(
    await readFile(`./tests/builder/_/schema.ts`, `utf8`),
  ).toMatchSnapshot()
})
