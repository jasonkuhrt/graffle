import { capitalizeFirstLetter } from '../../../lib/prelude.js'
import { createModuleGenerator } from '../createCodeGenerator.js'
import { defaultName } from '../generateCode.js'
import { moduleName_ } from './_.js'

export const defaultNamespace = `Graffle`

export const { generate: generate__, moduleName: moduleName__ } = createModuleGenerator(
  `__`,
  ({ config, code }) => {
    const namespace = config.name === defaultName ? defaultNamespace : capitalizeFirstLetter(config.name)
    code.push(
      `export * as ${namespace} from './${moduleName_}.js'`,
    )
    return code
  },
)
