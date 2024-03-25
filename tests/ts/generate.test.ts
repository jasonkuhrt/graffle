import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'
import { generateFile } from '../../src/generator/generator.js'

test(`generates types from GraphQL SDL file`, async () => {
  await generateFile({
    schemaModulePath: `../../../src/Schema/__.js`,
    schemaPath: `./tests/ts/_/schema.graphql`,
    typeScriptPath: `./tests/ts/_/schema.ts`,
  })
  expect(
    await readFile(`./tests/ts/_/schema.ts`, `utf8`),
  ).toMatchSnapshot()
})
