import type { GlobalRegistry } from '../../../4_generator/globalRegistry.js'
import type { OutputChannel, OutputChannelConfig } from '../Config.js'
import type { InputOutputEnvelopeLonghand } from '../Input.js'
import type { IncrementableInputContext } from './inputIncrementable.js'

/**
 * Input options for configuring request methods output behavior.
 */
// dprint-ignore
export type OutputInput<$Context extends IncrementableInputContext> =
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
  & (
      GlobalRegistry.HasSchemaErrorsViaName<$Context['name']> extends true
      ? {
          envelope?: {
            errors?: {
              schema?: boolean
            }
          }
          errors?: {
            schema?: false | OutputChannelConfig
          }
        }
      : {}  
    )
