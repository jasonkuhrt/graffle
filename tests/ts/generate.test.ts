import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'
import { generateFile } from '../../src/generator/generator.js'

test(`generates types from GraphQL SDL file`, async () => {
  await generateFile({
    schemaModulePath: `../../../../src/Schema/__.js`,
    scalarsModulePath: `../../../../src/Schema/NamedType/Scalar/Scalar.js`,
    schemaPath: `./tests/ts/_/schema.graphql`,
    outputDirPath: `./tests/ts/_/schema`,
  })
  expect(
    await readFile(`./tests/ts/_/schema/Schema.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/ts/_/schema/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
})
