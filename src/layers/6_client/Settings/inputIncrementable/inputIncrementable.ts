import type { GlobalRegistry } from '../../../2_generator/globalRegistry.js'
import type { Transport, TransportMemory } from '../../../5_core/types.js'
import type { Config } from '../Config.js'
import type { InputToConfig } from '../InputToConfig.js'
import type { OutputInput } from './output.js'
import type { RequestInputOptions } from './request.js'

// dprint-ignore
export type InputIncrementable<$Context extends IncrementableInputContext = IncrementableInputContext> =
  & {
      /**
       * Configure output behavior, such as if errors should be returned or thrown.
       */
      output?: OutputInput<$Context>
    }
  & (
      $Context['transport'] extends TransportMemory
      ? { request?: never }
      : { request?: RequestInputOptions }
    )
// type x = (never|{})  & {x:1}

export type IncrementableInputContext = {
  name: GlobalRegistry.SchemaNames
  transport: Transport
}

// dprint-ignore
export type AddIncrementalInput<$Config extends Config, $Input extends InputIncrementable> =
  InputToConfig<$Config['initialInput'] & $Input>
