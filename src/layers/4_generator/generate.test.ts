import { readFile } from 'fs/promises'
import { expect, test } from 'vitest'

// todo replace with snapshot via glob
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
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/SchemaDrivenDataMap.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/MethodsDocument.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/MethodsRoot.ts`, `utf8`),
  ).toMatchSnapshot()
  expect(
    await readFile(`./tests/_/schemas/kitchen-sink/graffle/modules/MethodsSelect.ts`, `utf8`),
  ).toMatchSnapshot()
})
