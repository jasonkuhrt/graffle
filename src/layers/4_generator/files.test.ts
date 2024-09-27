import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'

test(`schema2`, async () => {
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/Client.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/__.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/_.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/Error.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/Select.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/SchemaIndex.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/SchemaBuildtime.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/KitchenSink/graffle/modules/SchemaRuntime.ts`, `utf8`),
  ).toMatchSnapshot()
})
