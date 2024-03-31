import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'
import { generateFiles } from '../../src/generator/schemaBuildtime.js'

test(`generates types from GraphQL SDL file`, async () => {
  await generateFiles({
    schemaModulePath: `../../../../src/Schema/__.js`,
    scalarsModulePath: `../../../../src/Schema/NamedType/Scalar/Scalar.js`,
    schemaPath: `./tests/ts/_/schema.graphql`,
    outputDirPath: `./tests/ts/_/schema`,
  })
  expect(
    await readFile(`./tests/ts/_/schema/SchemaBuildtime.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/ts/_/schema/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/ts/_/schema/SchemaRuntime.ts`, `utf8`),
  ).toMatchSnapshot()
})
