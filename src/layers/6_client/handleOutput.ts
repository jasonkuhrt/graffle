import type { ExecutionResult, GraphQLError } from 'graphql'
import { Errors } from '../../lib/errors/__.js'
import type { GraphQLExecutionResultError } from '../../lib/grafaid/graphql.js'
import { type Values } from '../../lib/prelude.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { TransportHttp } from '../5_request/types.js'
import type { State } from './fluent.js'
import {
  type Config,
  type ErrorCategory,
  isContextConfigTraditionalGraphQLOutput,
  type OutputChannelConfig,
  readConfigErrorCategoryOutputChannel,
} from './Settings/Config.js'

/**
 * Types of "other" Graffle Error.
 */
export type ErrorsOther =
  | Errors.ContextualError
  // Possible from http transport fetch with abort controller.
  | DOMException

export type GraffleExecutionResultVar<$Config extends Config = Config> =
  | (
    & ExecutionResult
    & ($Config['transport']['type'] extends TransportHttp ? {
        /**
         * If transport was HTTP, then the raw response is available here.
         */
        response: Response
      }
      : TransportHttp extends $Config['transport']['type'] ? {
          /**
           * If transport was HTTP, then the raw response is available here.
           */
          response?: Response
        }
      : {})
  )
  | ErrorsOther

export const handleOutput = (
  state: State,
  result: GraffleExecutionResultVar,
) => {
  if (isContextConfigTraditionalGraphQLOutput(state.config)) {
    if (result instanceof Error) throw result
    return result
  }

  const config = state.config
  const c = config.output

  const isEnvelope = c.envelope.enabled

  const isThrowOther = readConfigErrorCategoryOutputChannel(config, `other`) === `throw`
    && (!c.envelope.enabled || !c.envelope.errors.other)

  const isReturnOther = readConfigErrorCategoryOutputChannel(config, `other`) === `return`
    && (!c.envelope.enabled || !c.envelope.errors.other)

  const isThrowExecution = readConfigErrorCategoryOutputChannel(config, `execution`) === `throw`
    && (!c.envelope.enabled || !c.envelope.errors.execution)

  const isReturnExecution = readConfigErrorCategoryOutputChannel(config, `execution`) === `return`
    && (!c.envelope.enabled || !c.envelope.errors.execution)

  if (result instanceof Error) {
    if (isThrowOther) throw result
    if (isReturnOther) return result
    // todo not a graphql execution error class instance
    return isEnvelope ? { errors: [result] } : result
  }

  if (result.errors && result.errors.length > 0) {
    const error = new Errors.ContextualAggregateError(
      `One or more errors in the execution result.`,
      {},
      result.errors,
    )
    if (isThrowExecution) throw error
    if (isReturnExecution) return error
    return isEnvelope ? { ...result, errors: [...result.errors ?? [], error] } : error
  }

  if (isEnvelope) {
    return result
  }

  return result.data
}

/**
 * Types for output handling.
 */

// dprint-ignore
export type ResolveOutputGql<$Config extends Config, $Data> =
   | IfConfiguredGetOutputErrorReturns<$Config>
   | (
        $Config['output']['envelope']['enabled'] extends true
          // todo even when envelope is enabled, its possible errors can not be included in its output.
          // When not, undefined should be removed from the data property.
          ? Envelope<$Config, $Data>
          // Note 1
          // `undefined` is not a possible type because that would only happen if an error occurred.
          // If an error occurs when the envelope is disabled then either it throws or is returned.
          // No case swallows the error and returns undefined data.
          //
          // Note 2
          // null is possible because of GraphQL null propagation.
          // todo We need to integrate this reality into the the other typed non-envelope output types too. 
          : $Data | null
     )

// dprint-ignore
export type ResolveOutputReturnRootType<$Config extends Config, $Index extends SchemaIndex, $Data> =
   | IfConfiguredGetOutputErrorReturns<$Config>
   | (
        $Config['output']['envelope']['enabled'] extends true
          ? Envelope<$Config, IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, $Data>>
          : IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, $Data>
     )

// dprint-ignore
export type ResolveOutputReturnRootField<$Config extends Config, $Index extends SchemaIndex, $RootFieldName extends string, $Data> =
    | IfConfiguredGetOutputErrorReturns<$Config>
    | (
        $Config['output']['envelope']['enabled'] extends true
          // todo: a typed execution result that allows for additional error types.
          // currently it is always graphql execution error however envelope configuration can put more errors into that.
          ? Envelope<$Config, IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, { [_ in $RootFieldName]: $Data }>>
          : IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data>
      )

// dprint-ignore
type IfConfiguredGetOutputErrorReturns<$Config extends Config> =
  | (ConfigGetOutputError<$Config, 'execution'>  extends 'return'  ? GraphQLExecutionResultError  : never)
  | (ConfigGetOutputError<$Config, 'other'>      extends 'return'  ? ErrorsOther                  : never)
  | (ConfigGetOutputError<$Config, 'schema'>     extends 'return'  ? Error                        : never)

// dprint-ignore
type IfConfiguredStripSchemaErrorsFromDataRootType<$Config extends Config, $Index extends SchemaIndex, $Data> =
  & {
      [$RootFieldName in keyof $Data]: IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data[$RootFieldName]>
    }
  & {} // Simplify type display.

// dprint-ignore
type IfConfiguredStripSchemaErrorsFromDataRootField<$Config extends Config, $Index extends SchemaIndex, $Data> =
  $Config['output']['errors']['schema'] extends false
    ? $Data
    : ExcludeSchemaErrors<$Index, $Data>

// dprint-ignore
type ExcludeSchemaErrors<$Index extends SchemaIndex, $Data> =
  Exclude<
    $Data,
    $Index['error']['objectsTypename'][keyof $Index['error']['objectsTypename']]
  >

// dprint-ignore
export type ConfigGetOutputError<$Config extends Config, $ErrorCategory extends ErrorCategory> =
  $Config['output']['envelope']['enabled'] extends true
    ? ConfigGetOutputEnvelopeErrorChannel<$Config, $ErrorCategory>
    : ConfigResolveOutputErrorChannel<$Config, $Config['output']['errors'][$ErrorCategory]>

// dprint-ignore
type ConfigGetOutputEnvelopeErrorChannel<$Config extends Config, $ErrorCategory extends ErrorCategory> =
  $Config['output']['envelope']['errors'][$ErrorCategory] extends true
    ? false
    : ConfigResolveOutputErrorChannel<$Config, $Config['output']['errors'][$ErrorCategory]>

type ConfigResolveOutputErrorChannel<$Config extends Config, $Channel extends OutputChannelConfig | false> =
  $Channel extends 'default' ? $Config['output']['defaults']['errorChannel']
    : $Channel extends false ? false
    : $Channel

// dprint-ignore
// todo use ObjMap for $Data
export type Envelope<$Config extends Config, $Data = unknown, $Errors extends ReadonlyArray<Error> = ReadonlyArray<GraphQLError>> = 
	& {
			data?: $Data | null
			extensions?: ObjMap
		}
	& (
			$Config['transport']['type'] extends 'http'
			? { response: Response }
			: {}  
		)
		// todo remove use of errors type variable. Rely only on $Config.
	& (
			$Errors extends []
			? {}  
			: IsEnvelopeWithoutErrors<$Config> extends true
			? {}  
			: {
					errors?: ReadonlyArray<GraphQLError>
				}
		)

type ObjMap<T = unknown> = {
  [key: string]: T
}

// dprint-ignore
type IsEnvelopeWithoutErrors<$Config extends Config> =
  $Config['output']['envelope']['enabled'] extends true
    ? Values<$Config['output']['envelope']['errors']> extends false
      ? true
    : false
  : false
