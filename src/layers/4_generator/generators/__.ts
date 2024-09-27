import { capitalizeFirstLetter } from '../../../lib/prelude.js'
import { defaultName } from '../generate.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGenerator_ } from './_.js'

export const defaultNamespace = `Graffle`

export const ModuleGenerator__ = createModuleGenerator(
  `__`,
  ({ config, code }) => {
    const namespace = config.name === defaultName ? defaultNamespace : capitalizeFirstLetter(config.name)
    code.push(
      `export * as ${namespace} from './${ModuleGenerator_.name}.js'`,
    )
    return code
  },
)
