import type { OutputChannel, OutputChannelConfig } from '../Config.js'
import type { InputOutputEnvelopeLonghand } from '../Input.js'

/**
 * Input options for configuring request methods output behavior.
 */
// dprint-ignore
export type OutputInput =
  {
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
