import type { TypedQueryDocumentNode } from 'graphql'
import type { CamelCase } from 'type-fest'
import type { As, ConfigManager } from '../../../lib/prelude.js'
import type { BaseInput, TypedDocumentString } from '../../0_functions/types.js'
import type { Schema } from '../../1_Schema/__.js'
import { createExtension } from '../../5_createExtension/createExtension.js'
import type { DocumentFn } from '../../6_client/document.js'
import type { Extension } from '../../6_client/extension.js'
import type { Envelope } from '../../6_client/handleOutput.js'
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
    methods: {
      invoke: ({ client, method, args }) => {
        if (method.endsWith(suffix)) {
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
          // @ts-expect-error dynamic
          // todo path to method like query.idOrThrow
          return client.with(config)[method.slice(0, suffix.length * -1)](...args)
        }
      },
    },
  })
}

// const isContextConfigOrThrowSemantics = ({ config }: Context): boolean => {
//   const isAllCategoriesThrowOrDisabled = readConfigErrorCategoryOutputChannel(config, `execution`) === `throw`
//     && readConfigErrorCategoryOutputChannel(config, `other`) === `throw`
//     && (readConfigErrorCategoryOutputChannel(config, `schema`) === `throw`
//       || readConfigErrorCategoryOutputChannel(config, `schema`) === `throw`) // todo: or false and not using schema errors

//   if (!isAllCategoriesThrowOrDisabled) return false

//   if (
//     config.output.envelope.enabled
//     && Object.values(config.output.envelope.errors.execution).filter(_ => _ === true).length > 0
//   ) {
//     return false
//   }

//   return true
// }

// const contextConfigSetOrThrow = <$Context extends Context>(context: $Context): $Context => {
//   if (isContextConfigOrThrowSemantics(context)) return context

//   return updateContextConfig(context, {
//     ...context.config,
//     output: {
//       ...context.config.output,
//       errors: {
//         execution: `throw`,
//         other: `throw`,
//         schema: `throw`,
//       },
//       envelope: {
//         ...context.config.output.envelope,
//         errors: {
//           execution: false,
//           other: false,
//           schema: false,
//         },
//       },
//     },
//   })
// }

// const updateContextConfig = <$Context extends Context>(context: $Context, config: Config): $Context => {
//   return { ...context, config: { ...context.config, ...config } }
// }

// dprint-ignore
type Methods<$Config extends Config, $Index extends Schema.Index> =
  & {
      rawStringOrThrow<$Data, $Variables>(input: BaseInput<TypedDocumentString<$Data, $Variables>>):    Promise<Envelope<$Config, $Data, []>>
      rawOrThrow      <$Data, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>): Promise<Envelope<$Config, $Data, []>>
    }
  & {
      [_ in $Index['RootTypesPresent'][number] as $Index['Root'][_] extends null ? never : RootTypeToRootTypeProperty<_>]:
        RootTypeMethods<$Config, $Index, _>
    }
  & (
      $Index['RootTypesPresent'][number] extends never
        ? {}
        : {
            documentOrThrow: DocumentFn<As<OrThrowifyConfig<$Config>, Config>, $Index>          
          }
    )

// dprint-ignore
type RootTypeMethods<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  $Index['Root'][$RootTypeName] extends Schema.Object$2 ? (
      & {
          // @ts-expect-error fixme
          $batchOrThrow: RootMethod<OrThrowifyConfig<$Config>, $Index, $RootTypeName>
        }
      & {
        [
          $RootTypeFieldName in
            & keyof $Index['Root'][$RootTypeName]['fields']
            & string as `${$RootTypeFieldName}OrThrow`
        ]:
          // @ts-expect-error fixme
          RootTypeFieldMethod<{
            Config: OrThrowifyConfig<$Config>
            Index: $Index
            RootTypeName: $RootTypeName
            RootTypeFieldName: $RootTypeFieldName
            Field: $Index['Root'][$RootTypeName]['fields'][$RootTypeFieldName]
          }>
      }
    )
    : {}

type RootTypeToRootTypeProperty<T> = CamelCase<T>

// todo this changed, check tests, add new tests as needed.
// dprint-ignore
export type OrThrowifyConfig<$Config extends Config> =
  ConfigManager.Set<$Config, ['output', 'errors'], { other: 'throw', execution: 'throw', schema: 'throw' }>

// .document().runOrThrow()

// runOrThrow: <
//   $Name extends keyof $Document & string,
//   $Params extends (IsMultipleKeys<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
// >(...params: $Params) => Promise<
//   ResolveOutputReturnRootType<
//     // @ts-expect-error fixme
//     OrThrowifyConfig<$Config>,
//     $Index,
//     // @ts-expect-error fixme
//     ResultSet.Root<GetRootTypeSelection<OrThrowifyConfig<$Config>, $Index, $Document[$Name]>, $Index, GetRootType<$Document[$Name]>>>
// >

// type IntersectReturnTypeWith<T extends (...args: any) => any, U> = (
//   ...args: Parameters<T>
// ) => ReturnType<T> & U

// // Example function
// type MyFunction = (x: number, y: string) => { a: number }

// // Example object type
// type Additional = { b: string }

// // Apply the utility type
// type MergedFunction = IntersectReturnTypeWith<MyFunction, Additional>

// // Test
// const example: MergedFunction = (x, y) => {
//   return {
//     a: x,
//     b: y,
//   }
// }

// // example will have a return type of { a: number; b: string }
