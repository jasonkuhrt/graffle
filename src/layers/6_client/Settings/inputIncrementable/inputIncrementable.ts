import type { GlobalRegistry } from '../../../4_generator/globalRegistry.js'
import type { Transport, TransportMemory } from '../../../5_request/types.js'
import type { TransportHttpInput } from '../../transportHttp/request.js'
import type { Config } from '../Config.js'
import type { NormalizeInput } from '../InputToConfig.js'
import type { OutputInput } from './output.js'

// dprint-ignore
export type WithInput<$Context extends IncrementableInputContext = IncrementableInputContext> =
  & {
      /**
       * Configure output behavior, such as if errors should be returned or thrown.
       */
      output?: OutputInput
    }
  & (
      $Context['transport']['type'] extends TransportMemory
      ? { transport?: never }
      : { transport?: TransportHttpInput }
    )

export type IncrementableInputContext = {
  name: GlobalRegistry.SchemaNames
  transport: {
    type: Transport
  }
}

// dprint-ignore
export type AddIncrementalInput<$Config extends Config, $Input extends WithInput> =
  & Omit<NormalizeInput<$Config['initialInput'] & $Input>, 'typeHooks'>
  & {
      typeHooks: $Config['typeHooks']
    }
