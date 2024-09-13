import type { TypedQueryDocumentNode } from 'graphql'
import type { CamelCase } from 'type-fest'
import { type As, type ConfigManager, getValueAtPath } from '../../../lib/prelude.js'
import type { BaseInput, TypedDocumentString } from '../../0_functions/types.js'
import type { Schema } from '../../1_Schema/__.js'
import { createExtension } from '../../5_createExtension/createExtension.js'
import type { DocumentFn } from '../../6_client/document.js'
import type { Extension } from '../../6_client/extension.js'
import type { RawResolveOutputReturnRootType } from '../../6_client/handleOutput.js'
import type { RootMethod } from '../../6_client/RootTypeMethods.js'
import { type Config } from '../../6_client/Settings/Config.js'
import type { InputIncrementable } from '../../6_client/Settings/inputIncrementable/inputIncrementable.js'

const name = `OrThrow`

interface OrThrowExtension extends Extension {
  // @ts-expect-error fixme
  return: this['params']['AdditionalMethods'] & Methods<this['params']['Config'], this['params']['Index']>
}

const suffix = `OrThrow`

export const OrThrow = () => {
  return createExtension<OrThrowExtension>({
    name,
    builder: {
      get: ({ client, property, path }) => {
        if (!property.endsWith(suffix)) return

        // todo redesign input to allow to force throw always
        // todo pull pre-configured config from core
        const config: InputIncrementable = {
          output: {
            envelope: {
              enabled: client.internal.config.output.envelope.enabled,
              errors: {
                execution: false,
                other: false,
                // @ts-expect-error
                schema: false,
              },
            },
            errors: {
              execution: `throw`,
              other: `throw`,
              // @ts-expect-error
              schema: `throw`,
            },
          },
        }

        return (...args: [...unknown[]]) => {
          const redirectedPath = [...path, property.slice(0, suffix.length * -1)]
          const clientReconfigured = client.with(config)
          const value = getValueAtPath(clientReconfigured, redirectedPath)
          const valueType = typeof value
          if (valueType !== `function`) {
            throw new Error(`Expected function at path ${redirectedPath.join(`.`)} but got ${valueType}`)
          }
          return (value as any)(...args)
        }
      },
    },
  })
}

// dprint-ignore
type Methods<$Config extends Config, $Index extends Schema.Index> =
  & {
      // @ts-expect-error fixme
      rawStringOrThrow<$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedDocumentString<$Data, $Variables>>):    Promise<RawResolveOutputReturnRootType<OrThrowifyConfig<$Config>, $Data>>
      // @ts-expect-error fixme
      rawOrThrow      <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>): Promise<RawResolveOutputReturnRootType<OrThrowifyConfig<$Config>, $Data>>
      // @ts-expect-error fixme
      documentOrThrow: DocumentFn<OrThrowifyConfig<$Config>, $Index>          
    }
  & RootTypesMethods<$Config,$Index>

// dprint-ignore
type RootTypesMethods<$Config extends Config, $Index extends Schema.Index> = {
  [$RootTypeName in $Index['RootTypesPresent'][number] as CamelCase<$RootTypeName>]:
    // Since $RootTypeName comes from present root types, the index is guaranteed to have the root type.
    $Index['Root'][$RootTypeName] extends Schema.Object$2
      ? RootTypeMethods<$Config, $Index, $RootTypeName, $Index['Root'][$RootTypeName]>
      : never 
}

// dprint-ignore
type RootTypeMethods<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName, $Object extends Schema.Object$2> =
  & {
      // @ts-expect-error fixme
      $batchOrThrow: RootMethod<OrThrowifyConfig<$Config>, $Index, $RootTypeName>
    }
  & {
      [
        $RootTypeFieldName in
          & keyof  $Object['fields']
          & string
          as `${$RootTypeFieldName}OrThrow`
      ]:
        // @ts-expect-error fixme
        RootTypeFieldMethod<{
          Config: OrThrowifyConfig<$Config>
          Index: $Index
          RootTypeName: $RootTypeName
          RootTypeFieldName: $RootTypeFieldName
          Field: $Object['fields'][$RootTypeFieldName]
        }>
  }

// todo this changed, check tests, add new tests as needed.
// dprint-ignore
export type OrThrowifyConfig<$Config extends Config> =
  ConfigManager.Set<$Config, ['output', 'errors'], { other: 'throw', execution: 'throw', schema: 'throw' }>
