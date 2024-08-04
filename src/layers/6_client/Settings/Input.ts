import type { GraphQLSchema } from 'graphql'
import type { ConfigManager } from '../../../lib/prelude.js'
import type { URLInput } from '../../0_functions/request.js'
import type { Schema } from '../../1_Schema/__.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import type { TransportHttp, TransportMemory } from '../../5_core/types.js'
import { Transport } from '../../5_core/types.js'
import type { InputPrefilled } from '../prefilled.js'
import { type OutputChannel, type OutputChannelConfig, outputConfigDefault } from './Config.js'

export type InputOutputEnvelopeLonghand = {
  /**
   * @defaultValue `true`
   */
  enabled?: boolean
  errors?: {
    execution?: boolean
    other?: boolean
  }
}

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
   * Headers to send with each sent request.
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
    envelope?: boolean | InputOutputEnvelopeLonghand
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
      envelope?: {
        errors?: {
          schema?: boolean
        }
      }
      errors?: {
        schema?: false | OutputChannelConfig
      }
    }
    : {}) // eslint-disable-line

// dprint-ignore
export type InputToConfig<$Input extends Input<any>> = {
  transport: InferTransport<$Input>
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
        schema: ConfigManager.ReadOrDefault<$Input, ['output','envelope','errors','schema'], false>
      }
    }
    errors: {
      execution: ConfigManager.ReadOrDefault<$Input,['output', 'errors', 'execution'], 'default'>
      other: ConfigManager.ReadOrDefault<$Input,['output', 'errors', 'other'], 'default'>
      schema: ConfigManager.ReadOrDefault<$Input,['output', 'errors', 'schema'], false>
    }
  }
}

export const inputToConfig = <T extends Input<any>>(input: T): InputToConfig<T> => {
  const envelopeLonghand: InputOutputEnvelopeLonghand | undefined = typeof input.output?.envelope === `object`
    ? { enabled: true, ...input.output.envelope }
    : typeof input.output?.envelope === `boolean`
    ? { enabled: input.output.envelope }
    : undefined
  return {
    transport: inferTransport(input),
    output: {
      defaults: {
        // @ts-expect-error conditional type
        errorChannel: input.output?.defaults?.errorChannel ?? outputConfigDefault.defaults.errorChannel,
      },
      envelope: {
        // @ts-expect-error conditional type
        enabled: envelopeLonghand?.enabled ?? outputConfigDefault.envelope.enabled,
        errors: {
          // @ts-expect-error conditional type
          execution: envelopeLonghand?.errors?.execution ?? outputConfigDefault.envelope.errors.execution,
          // @ts-expect-error conditional type
          other: envelopeLonghand?.errors?.other ?? outputConfigDefault.envelope.errors.other,
          // @ts-expect-error conditional type
          // eslint-disable-next-line
          schema: envelopeLonghand?.errors?.schema ?? outputConfigDefault.envelope.errors.schema,
        },
      },
      errors: {
        // @ts-expect-error conditional type
        execution: input.output?.errors?.execution ?? outputConfigDefault.errors.execution,
        // @ts-expect-error conditional type
        other: input.output?.errors?.other ?? outputConfigDefault.errors.other,
        // @ts-expect-error conditional type
        // eslint-disable-next-line
        schema: input.output?.errors?.schema ?? outputConfigDefault.errors.schema,
      },
    },
  }
}

type InferTransport<$Input extends Input<any>> = $Input['schema'] extends URLInput ? TransportHttp : TransportMemory

const inferTransport = <T extends Input<any>>(input: T): InferTransport<T> => {
  // @ts-expect-error conditional type
  return input.schema instanceof URL || typeof input.schema === `string` ? Transport.http : Transport.memory
}
