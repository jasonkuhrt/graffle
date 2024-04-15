import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'
import { generateFiles } from './files.js'

test(`generates types from GraphQL SDL file`, async () => {
  await generateFiles({
    sourceDirPath: `./tests/ts/_/schema`,
    outputDirPath: `./tests/ts/_/schema/generated`,
    code: {
      libraryPaths: {
        schema: `../../../../../src/Schema/__.js`,
        scalars: `../../../../../src/Schema/Hybrid/types/Scalar/Scalar.js`,
      },
    },
  })
  expect(
    await readFile(`./tests/ts/_/schema/generated/SchemaBuildtime.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/ts/_/schema/generated/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/ts/_/schema/generated/SchemaRuntime.ts`, `utf8`),
  ).toMatchSnapshot()
})

test(`schema2`, async () => {
  await generateFiles({
    sourceDirPath: `./tests/_/schema`,
    outputDirPath: `./tests/_/schema/generated`,
    code: {
      libraryPaths: {
        schema: `../../../../src/Schema/__.js`,
        scalars: `../../../../src/Schema/Hybrid/types/Scalar/Scalar.js`,
      },
    },
  })
  expect(
    await readFile(`./tests/_/schema/generated/SchemaBuildtime.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/SchemaRuntime.ts`, `utf8`),
  ).toMatchSnapshot()
})
