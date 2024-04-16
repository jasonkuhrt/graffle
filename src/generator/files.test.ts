import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'

test(`generates types from GraphQL SDL file`, async () => {
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
