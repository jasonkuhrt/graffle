import type { GraphQLSchema } from 'graphql'
import type { ConfigManager } from '../../../lib/prelude.js'
import type { URLInput } from '../../0_functions/request.js'
import type { Schema } from '../../1_Schema/__.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import type { Transport } from '../../5_core/types.js'
import type { OutputChannel, OutputChannelConfig } from './Config.js'

export type Input<$Schema extends GlobalRegistry.SchemaList> = {
  /**
   * Used internally.
   *
   * When custom scalars are being used, this runtime schema is used to
   * encode/decode them before/after your application sends/receives them.
   *
   * When using root type field methods, this runtime schema is used to assist how arguments on scalars versus objects
   * are constructed into the sent GraphQL document.
   */
  readonly schemaIndex?: Schema.Index | null
  /**
   * The schema to use.
   *
   * TODO why don't we infer this from the runtime schemaIndex?
   *
   * @defaultValue 'default'
   */
  name?: $Schema['index']['name']
  // todo way to hide Relay input pattern of nested input
  // elideInputKey: true,
} & InputPrefilled<$Schema>

export type InputRaw<$Schema extends GlobalRegistry.SchemaList> = {
  schema: URLInput
  /**
   * Headers to send with the request.
   */
  headers?: HeadersInit
  /**
   * Configure output behavior, such as if errors should be returned or thrown.
   */
  output?: OutputInput<{ schemaErrors: GlobalRegistry.HasSchemaErrors<$Schema>; transport: 'http' }>
} | {
  schema: GraphQLSchema
  headers?: never
  /**
   * Configure output behavior, such as if errors should be returned or thrown.
   */
  output?: OutputInput<{ schemaErrors: GlobalRegistry.HasSchemaErrors<$Schema>; transport: 'memory' }>
}

export type OutputInput<Options extends { transport: Transport; schemaErrors: boolean }> =
  & {
    /**
     * Defaults for certain aspects of output behavior.
     */
    defaults?: {
      /**
       * The default error channel to use.
       *
       * @defaultValue `'throw'`
       */
      errorChannel?: OutputChannel
    }
    /**
     * @defaultValue `false`
     */
    envelope?: boolean | {
      /**
       * @defaultValue `true`
       */
      enabled?: boolean
      errors?: {
        execution?: boolean
        other?: boolean
      }
    }
    /**
     * Granular control of how to output errors by category.
     */
    errors?: {
      /**
       * Execution errors. These are errors you would traditionally see in the GraphQL execution result `'errors'` field.
       */
      execution?: OutputChannelConfig
      /**
       * Other errors include things like network errors thrown by fetch (when using HTTP transport), errors thrown from extensions, etc.
       */
      other?: OutputChannelConfig
    }
  }
  // & (Options['transport'] extends 'http' ? {
  //     response?: boolean
  //   }
  //   : {}) // eslint-disable-line
  & (Options['schemaErrors'] extends true ? {
      errors?: {
        schema?: false | OutputChannelConfig
      }
    }
    : {}) // eslint-disable-line

// dprint-ignore
export type InputToConfig<$Input extends Input<any>> = {
  output: {
    defaults: {
      errorChannel: ConfigManager.ReadOrDefault<$Input, ['output', 'defaults', 'errorChannel'], 'throw'>
    }
    envelope: {
      enabled:
						ConfigManager.Read<$Input, ['output','envelope']> 					  extends boolean 		? ConfigManager.Read<$Input, ['output','envelope']>
					: ConfigManager.Read<$Input, ['output','envelope','enabled']>		extends boolean 		? ConfigManager.Read<$Input, ['output','envelope','enabled']>
					: ConfigManager.Read<$Input, ['output','envelope']> 						extends object 			? true
					: false
      errors: {
        execution: ConfigManager.ReadOrDefault<$Input, ['output','envelope','errors','execution'], true>
        other: ConfigManager.ReadOrDefault<$Input, ['output','envelope','errors','other'], false> 
        schema: false // todo
      }
    }
    errors: {
      execution: ConfigManager.ReadOrDefault<$Input,['output', 'errors', 'execution'], 'default'>
      other: ConfigManager.ReadOrDefault<$Input,['output', 'errors', 'other'], 'default'>
      schema: false // todo
    }
  }
}

export type InputPrefilled<$Schema extends GlobalRegistry.SchemaList> = $Schema extends any ? (InputRaw<$Schema>)
  : never
