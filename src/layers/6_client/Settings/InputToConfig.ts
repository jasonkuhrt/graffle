import type { IsUnknown } from 'type-fest'
import type { ConfigManager } from '../../../lib/prelude.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import { Transport } from '../../5_request/types.js'
import { defaultMethodMode } from '../transportHttp/request.js'
import { outputConfigDefault, type TransportConfigHttp, type TransportConfigMemory } from './Config.js'
import type { InputOutputEnvelopeLonghand, InputStatic, URLInput } from './Input.js'

// dprint-ignore
export type InputToConfig<$Input extends InputStatic<GlobalRegistry.SchemaUnion>> = {
  initialInput: $Input
  name: HandleName<$Input>
  schemaIndex: ConfigManager.OrDefault<$Input['schemaIndex'], null>
  transport: HandleTransport<$Input>
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

export const defaultSchemaName: GlobalRegistry.DefaultSchemaName = `default`

export const inputToConfig = <$Input extends InputStatic<GlobalRegistry.SchemaUnion>>(
  input: $Input,
): InputToConfig<$Input> => {
  const outputEnvelopeLonghand: InputOutputEnvelopeLonghand | undefined = typeof input.output?.envelope === `object`
    ? { enabled: true, ...input.output.envelope }
    : typeof input.output?.envelope === `boolean`
    ? { enabled: input.output.envelope }
    : undefined

  const transport = handleTransport(input)

  return {
    initialInput: input,
    // @ts-expect-error conditional type fixme
    name: input.name ?? defaultSchemaName,
    transport,
    schemaIndex: input.schemaIndex ?? null as any,
    output: {
      defaults: {
        // @ts-expect-error conditional type
        errorChannel: input.output?.defaults?.errorChannel ?? outputConfigDefault.defaults.errorChannel,
      },
      envelope: {
        // @ts-expect-error conditional type
        enabled: outputEnvelopeLonghand?.enabled ?? outputConfigDefault.envelope.enabled,
        errors: {
          // @ts-expect-error conditional type
          execution: outputEnvelopeLonghand?.errors?.execution ?? outputConfigDefault.envelope.errors.execution,
          // @ts-expect-error conditional type
          other: outputEnvelopeLonghand?.errors?.other ?? outputConfigDefault.envelope.errors.other,
          // @ts-expect-error conditional type

          schema: outputEnvelopeLonghand?.errors?.schema ?? outputConfigDefault.envelope.errors.schema,
        },
      },
      errors: {
        // @ts-expect-error conditional type
        execution: input.output?.errors?.execution ?? outputConfigDefault.errors.execution,
        // @ts-expect-error conditional type
        other: input.output?.errors?.other ?? outputConfigDefault.errors.other,
        // @ts-expect-error conditional type

        schema: input.output?.errors?.schema ?? outputConfigDefault.errors.schema,
      },
    },
  }
}

type HandleName<$Input extends InputStatic<GlobalRegistry.SchemaUnion>> = $Input['name'] extends string ? $Input['name']
  : GlobalRegistry.DefaultSchemaName

// dprint-ignore
type HandleTransport<$Input extends InputStatic<GlobalRegistry.SchemaUnion>> =
  $Input['schema'] extends URLInput         ? TransportConfigHttp :
  // When the client is generated via introspection of a URL then the schema defaults to that URL.
  // This is the only case when schema can be unknown from so we can assume that transport is HTTP.
  IsUnknown<$Input['schema']> extends true  ? TransportConfigHttp
                                            : TransportConfigMemory

const handleTransport = <T extends InputStatic<GlobalRegistry.SchemaUnion>>(input: T): HandleTransport<T> => {
  if (input.schema instanceof URL || typeof input.schema === `string`) {
    return {
      type: Transport.http,
      url: input.schema,
      config: {
        methodMode: input.transport?.methodMode ?? defaultMethodMode,
        ...input.transport,
      },
    } as any
  }
  return {
    type: Transport.memory,
    schema: input.schema,
  } as any
}
