import _ from 'json-bigint'
import { expect } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { createConfig } from './config.js'

test(`can load schema from custom path`, async () => {
  const customPathFile = `./tests/_/fixtures/custom.graphql`
  const config = await createConfig({ sourceSchema: { type: `sdl`, dirOrFilePath: customPathFile } })
  const field = config.schema.instance.getQueryType()?.getFields()[`customNamedSchemaFile`]
  expect(config.paths.project.inputs.schema).toEqual(customPathFile)
  expect(config.schema.sdl).toMatchSnapshot()
  expect(field).toBeDefined()
})

test(`can load schema from custom dir using default file name`, async () => {
  const customPathDir = `tests/_/fixtures`
  const config = await createConfig({ sourceSchema: { type: `sdl`, dirOrFilePath: customPathDir } })
  const field = config.schema.instance.getQueryType()?.getFields()[`defaultNamedSchemaFile`]
  expect(config.paths.project.inputs.schema).toEqual(customPathDir + `/schema.graphql`)
  expect(config.schema.sdl).toMatchSnapshot()
  expect(field).toBeDefined()
})

test(`can introspect schema from url`, async ({ pokemonService }) => {
  const config = await createConfig({ sourceSchema: { type: `url`, url: pokemonService.url } })
  expect(config.paths.project.inputs.schema).toEqual(null)
  expect(config.schema.sdl).toMatchSnapshot()
})
