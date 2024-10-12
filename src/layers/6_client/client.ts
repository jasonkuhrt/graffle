import type { Fluent } from '../../lib/fluent/__.js'
import { proxyGet } from '../../lib/prelude.js'
import { CustomScalars } from '../7_extensions/CustomScalars/CustomScalars.js'
import { SchemaErrors } from '../7_extensions/SchemaErrors/SchemaErrors.js'
import { type UseFn, useProperties } from './extension/use.js'
import { type ClientContext, createState, type FnParametersProperty, type StateWithoutConfig } from './fluent.js'
import { type FnGql, gqlProperties } from './gql/gql.js'
import { anywareProperties, type FnAnyware } from './properties/anyware.js'
import type { FnInternal } from './properties/internal.js'
import { type FnRetry, retryProperties } from './properties/retry.js'
import { type FnWith, withProperties } from './properties/with.js'
import { type FnRequestMethods, requestMethodsProperties } from './requestMethods/requestMethods.js'
import { type InputStatic } from './Settings/Input.js'
import { type NormalizeInput } from './Settings/InputToConfig.js'

export type Client<$Context extends ClientContext> = Fluent.Materialize<
  Fluent.AddMany<
    Fluent.Create<$Context>,
    [
      FnInternal,
      FnRequestMethods,
      FnRetry,
      FnWith,
      UseFn,
      FnAnyware,
      FnGql,
    ]
  >
>

export type IncrementWthNewConfig<
  $Parameters extends FnParametersProperty,
  $ConfigNew extends ClientContext['config'],
> = Fluent.IncrementWthNewContext<
  $Parameters,
  {
    config: $ConfigNew
  }
>

// dprint-ignore
type Create = <$Input extends InputStatic>(input: $Input) =>
  // todo fixme
  // eslint-disable-next-line
  // @ts-ignore
  Client<{ config: NormalizeInput<$Input> }>

export const create: Create = (input) => {
  const initialState = createState({
    extensions: [CustomScalars(), SchemaErrors()],
    retry: null,
    input,
  })
  return createWithState(initialState)
}

const createWithState = (
  stateWithoutConfig: StateWithoutConfig,
) => {
  const state = createState(stateWithoutConfig)

  // @ts-expect-error ignoreme
  const clientDirect: Client = {
    _: state,
    ...gqlProperties(state),
    ...withProperties(createWithState, state),
    ...useProperties(createWithState, state),
    ...anywareProperties(createWithState, state),
    ...retryProperties(createWithState, state),
  }

  // todo, these methods will become available even without a schema index present.
  // The schema index nullability will affect more granular features within..
  // So, we are going to need a different check than this one.

  if (state.input.schemaMap) {
    Object.assign(clientDirect, {
      ...requestMethodsProperties(state),
    })
  }

  const clientProxy = proxyGet(clientDirect, ({ path, property }) => {
    // eslint-disable-next-line
    // @ts-ignore fixme "Type instantiation is excessively deep and possibly infinite"
    const onGetHandlers = state.extensions.map(_ => _.onBuilderGet).filter(_ => _ !== undefined)

    for (const onGetHandler of onGetHandlers) {
      const result = onGetHandler({
        client: clientDirect,
        path,
        property,
      })
      if (result !== undefined) return result
    }

    return undefined
  }) as any

  return clientProxy
}
