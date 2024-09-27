import { readFile } from 'fs/promises'
import { describe } from 'node:test'
import { expect, test } from 'vitest'



test(`schema2`, async () => {
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/Client.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/__.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/_.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/Error.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/Select.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/SchemaIndex.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/SchemaBuildtime.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/Scalar.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/SchemaRuntime.ts`, `utf8`),
  ).toMatchSnapshot()
})
