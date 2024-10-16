import type { GraphQLSchema } from 'graphql'
import type { SchemaDrivenDataMap } from '../../../extensions/CustomScalars/schemaDrivenDataMap/types.js'
import type { RequireProperties } from '../../../lib/prelude.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { TransportHttp, TransportMemory } from '../../5_request/types.js'
import type { Extension } from '../extension/extension.js'
import type { TransportHttpInput } from '../transportHttp/request.js'
import type { InputStatic } from './Input.js'

export type OutputChannel = 'throw' | 'return'

export type OutputChannelConfig = 'throw' | 'return' | 'default'

export type ErrorCategory = 'execution' | 'other'

export const readConfigErrorCategoryOutputChannel = (
  config: Config,
  errorCategory: ErrorCategory,
): OutputChannel | false => {
  if (config.output.errors[errorCategory] === `default`) {
    return config.output.defaults.errorChannel
  }
  return config.output.errors[errorCategory]
}

export const traditionalGraphqlOutput = {
  defaults: { errorChannel: `throw` },
  envelope: { enabled: true, errors: { execution: true, other: false } },
  errors: { execution: `default`, other: `default` },
} satisfies OutputConfig

export const traditionalGraphqlOutputThrowing: OutputConfig = {
  ...traditionalGraphqlOutput,
  envelope: {
    ...traditionalGraphqlOutput.envelope,
    errors: {
      ...traditionalGraphqlOutput.envelope.errors,
      execution: false,
    },
  },
}

export const isContextConfigTraditionalGraphQLOutput = (config: Config) => {
  return config.output.envelope.enabled && config.output.envelope.errors.execution
    && !config.output.envelope.errors.other
}

export type OutputConfig = {
  defaults: {
    errorChannel: OutputChannel
  }
  envelope: {
    enabled: boolean
    errors: {
      execution: boolean
      other: boolean
    }
  }
  errors: {
    execution: OutputChannelConfig
    other: OutputChannelConfig
  }
}

export const outputConfigDefault: OutputConfigDefault = {
  defaults: {
    errorChannel: `throw`,
  },
  envelope: {
    enabled: false,
    errors: {
      execution: true,
      other: false,
    },
  },
  errors: {
    execution: `default`,
    other: `default`,
  },
}

export type OutputConfigDefault = {
  defaults: {
    errorChannel: 'throw'
  }
  envelope: {
    enabled: false
    errors: {
      execution: true
      other: false
    }
  }
  errors: {
    execution: 'default'
    other: 'default'
  }
}

export interface TransportConfigHttp {
  type: TransportHttp
  url: string | URL
  config: RequireProperties<TransportHttpInput, 'methodMode'>
}

export interface TransportConfigMemory {
  type: TransportMemory
  schema: GraphQLSchema
}

export type Config = {
  /**
   * The initial input that was given to derive this config.
   */
  initialInput: InputStatic
  typeHooks: {
    onRequestResult: Extension.Hooks.OnRequestResult[]
  }
  name: GlobalRegistry.SchemaNames
  output: OutputConfig
  schemaMap: SchemaDrivenDataMap | null
  transport: TransportConfigHttp | TransportConfigMemory
}
