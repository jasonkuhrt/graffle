import { Errors } from '../../lib/errors/__.js'
import { isPlainObject } from '../../lib/prelude.js'
import { Transport } from '../5_core/types.js'
import type { Context, GraffleExecutionResultVar, TypedContext } from './client.js'
import { isContextConfigTraditionalGraphQLOutput, readConfigErrorCategoryOutputChannel } from './Settings/Config.js'

export const handleOutput = (
  context: Context,
  result: GraffleExecutionResultVar,
) => {
  // If core errors caused by an abort error then raise it as a direct error.
  // This is an expected possible error. Possible when user cancels a request.
  if (context.config.transport === Transport.http && result instanceof Error && isAbortError(result.cause)) {
    result = result.cause
  }

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
    return isEnvelope ? result : error
  }

  {
    if (isTypedContext(context)) {
      if (c.errors.schema !== false) {
        if (!isPlainObject(result.data)) throw new Error(`Expected data to be an object.`)
        const schemaErrors = Object.entries(result.data).map(([rootFieldName, rootFieldValue]) => {
          // todo this check would be nice but it doesn't account for aliases right now. To achieve this we would
          // need to have the selection set available to use and then do a costly analysis for all fields that were aliases.
          // So costly that we would probably instead want to create an index of them on the initial encoding step and
          // then make available down stream. Also, note, here, the hardcoding of Query, needs to be any root type.
          // const isResultField = Boolean(schemaIndex.error.rootResultFields.Query[rootFieldName])
          // if (!isResultField) return null
          // if (!isPlainObject(rootFieldValue)) return new Error(`Expected result field to be an object.`)
          if (!isPlainObject(rootFieldValue)) return null
          const __typename = rootFieldValue[`__typename`]
          if (typeof __typename !== `string`) throw new Error(`Expected __typename to be selected and a string.`)
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
}

const isAbortError = (error: any): error is DOMException & { name: 'AbortError' } => {
  return (error instanceof DOMException && error.name === `AbortError`)
    // Under test with JSDOM, the error must be checked this way.
    // todo look for an open issue with JSDOM to link here, is this just artifact of JSDOM or is it a real issue that happens in browsers?
    || (error instanceof Error && error.message.startsWith(`AbortError:`))
}

const isTypedContext = (context: Context): context is TypedContext => `schemaIndex` in context
