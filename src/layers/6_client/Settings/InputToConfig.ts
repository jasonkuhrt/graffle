import type { ConfigManager } from '../../../lib/prelude.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import { Transport, type TransportHttp, type TransportMemory } from '../../5_core/types.js'
import type { TransportHttpInput } from '../transportHttp/request.js'
import { outputConfigDefault } from './Config.js'
import type { InputOutputEnvelopeLonghand, InputStatic, URLInput } from './Input.js'

// dprint-ignore
export type InputToConfig<$Input extends InputStatic<GlobalRegistry.SchemaUnion>> = {
  initialInput: $Input
  name: HandleName<$Input>
  transport: {
    type: HandleTransport<$Input>
    config: null | TransportHttpInput
  }
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
  const envelopeLonghand: InputOutputEnvelopeLonghand | undefined = typeof input.output?.envelope === `object`
    ? { enabled: true, ...input.output.envelope }
    : typeof input.output?.envelope === `boolean`
    ? { enabled: input.output.envelope }
    : undefined
  return {
    initialInput: input,
    // @ts-expect-error conditional type fixme
    name: input.name ?? defaultSchemaName,
    transport: {
      type: handleTransportType(input),
      config: input.transport ?? null,
    },
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

type HandleName<$Input extends InputStatic<GlobalRegistry.SchemaUnion>> = $Input['name'] extends string ? $Input['name']
  : GlobalRegistry.DefaultSchemaName

// dprint-ignore
type HandleTransport<$Input extends InputStatic<GlobalRegistry.SchemaUnion>> =
  $Input['schema'] extends URLInput
    ? TransportHttp
    : TransportMemory

const handleTransportType = <T extends InputStatic<GlobalRegistry.SchemaUnion>>(input: T): HandleTransport<T> => {
  // @ts-expect-error conditional type
  return input.schema instanceof URL || typeof input.schema === `string` ? Transport.http : Transport.memory
}
