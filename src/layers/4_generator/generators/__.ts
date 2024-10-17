import { capitalizeFirstLetter } from '../../../lib/prelude.js'
import { defaultName } from '../config/defaults.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGenerator_ } from './_.js'

// todo remove, use config.name simply, any processing, do in config constructor
export const defaultNamespace = `Graffle`

export const ModuleGenerator__ = createModuleGenerator(
  `__`,
  ({ config, code }) => {
    const namespace = config.name === defaultName ? defaultNamespace : capitalizeFirstLetter(config.name)
    code(
      `export * as ${namespace} from './${ModuleGenerator_.name}.js'`,
    )
    return code
  },
)
