import fs from 'node:fs/promises'
import { ModuleGeneratorSchemaDrivenDataMap } from '../../../extensions/CustomScalars/schemaDrivenDataMap/generator.js'
import { createConfig } from '../config/config.js'
import type { Input } from '../config/input.js'
import { ModuleGenerator_ } from '../generators/_.js'
import { ModuleGenerator__ } from '../generators/__.js'
import { ModuleGeneratorClient } from '../generators/Client.js'
import { ModuleGeneratorData } from '../generators/Data.js'
import { ModuleGeneratorGlobal } from '../generators/global.js'
import { ModuleGeneratorMethodsDocument } from '../generators/MethodsDocument.js'
import { ModuleGeneratorMethodsRoot } from '../generators/MethodsRoot.js'
import { ModuleGeneratorMethodsSelect } from '../generators/MethodsSelect.js'
import { ModuleGeneratorScalar } from '../generators/Scalar.js'
import { ModuleGeneratorSchema } from '../generators/Schema.js'
import { ModuleGeneratorSchemaBuildtime } from '../generators/SchemaBuildtime.js'
import { ModuleGeneratorSelect } from '../generators/Select.js'
import { ModuleGeneratorSelectionSets } from '../generators/SelectionSets.js'

const moduleGenerators = [
  ModuleGeneratorGlobal,
  ModuleGeneratorClient,
  ModuleGeneratorData,
  ModuleGeneratorScalar,
  // Packaging Stuff
  ModuleGenerator__,
  ModuleGenerator_,
  // Schema Stuff
  ModuleGeneratorSchema,
  ModuleGeneratorSchemaBuildtime,
  ModuleGeneratorSchemaDrivenDataMap,
  // Interface Stuff
  ModuleGeneratorSelectionSets,
  ModuleGeneratorSelect,
  ModuleGeneratorMethodsSelect,
  ModuleGeneratorMethodsRoot,
  ModuleGeneratorMethodsDocument,
]

export const generate = async (input: Input) => {
  const config = await createConfig(input)

  const generatedModules = moduleGenerators
    .map(generator => generator.generate(config))
    .map(code => ({
      ...code,
      content: config.formatter.formatText(code.content),
    }))

  if (config.paths.project.outputs.sdl && config.schema.via !== `sdl`) {
    await fs.writeFile(config.paths.project.outputs.sdl, config.schema.sdl)
  }

  // todo clear directory before generating so that removed or renamed files are cleaned up.
  await fs.mkdir(config.paths.project.outputs.root, { recursive: true })
  await fs.mkdir(config.paths.project.outputs.modules, { recursive: true })

  await Promise.all(
    generatedModules.map((generatedModule) => {
      const isExportsModule = generatedModule.name.match(/^_+$/) !== null
      // dprint-ignore
      const filePath = `${config.paths.project.outputs.root}/${isExportsModule ? `` : `modules/`}${generatedModule.name}.ts`
      return fs.writeFile(filePath, generatedModule.content)
    }),
  )
}
