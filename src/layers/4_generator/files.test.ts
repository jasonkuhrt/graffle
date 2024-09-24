import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'

test(`schema2`, async () => {
  expect(
    await readFile(`./tests/_/schema/generated/modules/Client.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/__.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/_.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/modules/Error.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/modules/Select.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/modules/SchemaIndex.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/modules/SchemaBuildtime.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/modules/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schema/generated/modules/SchemaRuntime.ts`, `utf8`),
  ).toMatchSnapshot()
})
