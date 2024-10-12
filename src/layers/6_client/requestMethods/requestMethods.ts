import type { HKT } from '../../../entrypoints/utilities-for-generated.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import { isSymbol } from '../../../lib/prelude.js'
import { Select } from '../../2_Select/__.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import { RequestCore } from '../../5_request/__.js'
import { type ClientContext, defineTerminus, type State } from '../fluent.js'
import { handleOutput } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'

export interface FnRequestMethods extends Fluent.FnMerge {
  // @ts-expect-error untyped params
  return: BuilderRequestMethods<this['params']>
}

// dprint-ignore
export type BuilderRequestMethods<$Context extends ClientContext>=
  & (
    $Context['config']['schemaMap'] extends null
      ? {}
      :
        (
          // eslint-disable-next-line
          // @ts-ignore Passes after generation
          & HKT.Call<GlobalRegistry.GetOrDefault<$Context['config']['name']>['interfaces']['Root'], $Context>
          & {
              // eslint-disable-next-line
              // @ts-ignore Passes after generation
              document: HKT.Call<GlobalRegistry.GetOrDefault<$Context['config']['name']>['interfaces']['Document'], $Context>
            }
        )
  )

export const requestMethodsProperties = defineTerminus((state) => {
  return {
    document: createMethodDocument(state),
    query: createMethodRootType(state, `Query`),
    mutation: createMethodRootType(state, `Mutation`),
    // todo
    // subscription: async () => {},
  }
})

export const createMethodDocument = (state: State) => (document: Select.Document.DocumentObject) => {
  const documentNormalized = Select.Document.normalizeOrThrow(document)
  return {
    run: async (maybeOperationName?: string) => {
      return await executeDocument(state, documentNormalized, maybeOperationName)
    },
  }
}

const createMethodRootType = (state: State, rootTypeName: Grafaid.Schema.RootTypeName) => {
  return new Proxy({}, {
    get: (_, key) => {
      if (isSymbol(key)) throw new Error(`Symbols not supported.`)

      if (key.startsWith(`$batch`)) {
        return async (selectionSetOrIndicator: Select.SelectionSet.AnySelectionSet) =>
          executeRootType(state, rootTypeName, selectionSetOrIndicator)
      } else {
        const fieldName = key
        return (selectionSetOrArgs: Select.SelectionSet.AnySelectionSet) =>
          executeRootField(state, rootTypeName, fieldName, selectionSetOrArgs)
      }
    },
  })
}

const executeRootField = async (
  state: State,
  rootTypeName: Grafaid.Schema.RootTypeName,
  rootFieldName: string,
  rootFieldSelectionSet?: Select.SelectionSet.AnySelectionSet,
) => {
  const result = await executeRootType(state, rootTypeName, {
    [rootFieldName]: rootFieldSelectionSet ?? {},
  })

  if (result instanceof Error) return result

  return state.config.output.envelope.enabled
    ? result
    // @ts-expect-error
    : result[rootFieldName]
}

const executeRootType = async (
  state: State,
  rootTypeName: Grafaid.Schema.RootTypeName,
  rootTypeSelectionSet: Select.SelectionSet.AnySelectionSet,
) => {
  return executeDocument(
    state,
    Select.Document.createDocumentNormalizedFromRootTypeSelection(
      rootTypeName,
      rootTypeSelectionSet,
    ),
  )
}

export const executeDocument = async (
  state: State,
  document: Select.Document.DocumentNormalized,
  operationName?: string,
  variables?: Grafaid.Variables,
) => {
  const transportType = state.config.transport.type
  const interfaceType = `typed`
  const url = state.config.transport.type === `http` ? state.config.transport.url : undefined
  const schema = state.config.transport.type === `http` ? undefined : state.config.transport.schema
  const { rootType } = document.operations[operationName ?? `__default__`]!
  const initialInput = {
    state,
    interfaceType,
    transportType,
    url,
    schema,
    request: {
      document,
      operationName,
      variables,
    },
  } as RequestCore.Hooks.HookDefEncode<Config>['input']

  const result = await RequestCore.anyware.run({
    initialInput,
    retryingExtension: state.retry as any,
    extensions: state.extensions.filter(_ => _.onRequest !== undefined).map(_ => _.onRequest!) as any,
  })

  return handleOutput(state, rootType, result)
}
