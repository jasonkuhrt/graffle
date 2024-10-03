import type { GraphQLError } from 'graphql'
import type { Simplify } from 'type-fest'
import { Errors } from '../../lib/errors/__.js'
import type { GraphQLExecutionResultError } from '../../lib/graphql-plus/graphql.js'
import { isRecordLikeObject, type SimplifyExceptError, type Values } from '../../lib/prelude.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { ErrorsOther, GraffleExecutionResultVar, InterfaceTypedRequestContext, RequestContext } from './client.js'
import {
  type Config,
  type ErrorCategory,
  isContextConfigTraditionalGraphQLOutput,
  type OutputChannelConfig,
  readConfigErrorCategoryOutputChannel,
} from './Settings/Config.js'

export const handleOutput = (
  context: RequestContext,
  result: GraffleExecutionResultVar,
) => {
  if (isContextConfigTraditionalGraphQLOutput(context.config)) {
    if (result instanceof Error) throw result
    return result
  }

  const c = context.config.output

  const isEnvelope = c.envelope.enabled

  const isThrowOther = readConfigErrorCategoryOutputChannel(context.config, `other`) === `throw`
    && (!c.envelope.enabled || !c.envelope.errors.other)

  const isReturnOther = readConfigErrorCategoryOutputChannel(context.config, `other`) === `return`
    && (!c.envelope.enabled || !c.envelope.errors.other)

  const isThrowExecution = readConfigErrorCategoryOutputChannel(context.config, `execution`) === `throw`
    && (!c.envelope.enabled || !c.envelope.errors.execution)

  const isReturnExecution = readConfigErrorCategoryOutputChannel(context.config, `execution`) === `return`
    && (!c.envelope.enabled || !c.envelope.errors.execution)

  const isThrowSchema = readConfigErrorCategoryOutputChannel(context.config, `schema`) === `throw`

  const isReturnSchema = readConfigErrorCategoryOutputChannel(context.config, `schema`) === `return`

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

  if (isTypedContext(context)) {
    if (c.errors.schema !== false) {
      if (!isRecordLikeObject(result.data)) throw new Error(`Expected data to be an object.`)
      const schemaErrors = Object.entries(result.data).map(([rootFieldName, rootFieldValue]) => {
        // todo this check would be nice but it doesn't account for aliases right now. To achieve this we would
        // need to have the selection set available to use and then do a costly analysis for all fields that were aliases.
        // So costly that we would probably instead want to create an index of them on the initial encoding step and
        // then make available down stream. Also, note, here, the hardcoding of Query, needs to be any root type.
        // const isResultField = Boolean(schemaIndex.error.rootResultFields.Query[rootFieldName])
        // if (!isResultField) return null
        // if (!isPlainObject(rootFieldValue)) return new Error(`Expected result field to be an object.`)
        if (!isRecordLikeObject(rootFieldValue)) return null

        const __typename = rootFieldValue[`__typename`]
        if (typeof __typename !== `string`) {
          return new Error(`Expected __typename to be selected and a string.`)
        }

        const isErrorObject = Boolean(
          context.schemaIndex.error.objectsTypename[__typename],
        )
        if (!isErrorObject) return null
        // todo extract message
        // todo allow mapping error instances to schema errors
        return new Error(`Failure on field ${rootFieldName}: ${__typename}`)
      }).filter((_): _ is Error => _ !== null)

      const error = (schemaErrors.length === 1)
        ? schemaErrors[0]!
        : schemaErrors.length > 0
        ? new Errors.ContextualAggregateError(
          `Two or more schema errors in the execution result.`,
          {},
          schemaErrors,
        )
        : null
      if (error) {
        if (isThrowSchema) throw error
        if (isReturnSchema) {
          return isEnvelope ? { ...result, errors: [...result.errors ?? [], error] } : error
        }
      }
    }
  }

  if (isEnvelope) {
    return result
  }

  return result.data
}

const isTypedContext = (context: RequestContext): context is InterfaceTypedRequestContext => `schemaIndex` in context

/**
 * Types for output handling.
 */

// dprint-ignore
export type RawResolveOutputReturnRootType<$Config extends Config, $Data> =
  SimplifyExceptError<
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
 >

// dprint-ignore
export type ResolveOutputReturnRootType<$Config extends Config, $Index extends SchemaIndex, $Data> =
  SimplifyExceptError<
   | IfConfiguredGetOutputErrorReturns<$Config>
   | (
        $Config['output']['envelope']['enabled'] extends true
          ? Envelope<$Config, IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, $Data>>
          : IfConfiguredStripSchemaErrorsFromDataRootType<$Config, $Index, $Data>
     )
 >

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
  Simplify<{
    [$RootFieldName in keyof $Data]: IfConfiguredStripSchemaErrorsFromDataRootField<$Config, $Index, $Data[$RootFieldName]>
  }>

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
  Simplify<
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
    >

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
