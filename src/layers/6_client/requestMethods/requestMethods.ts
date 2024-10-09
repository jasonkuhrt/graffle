import type { HKT } from '../../../entrypoints/utilities-for-generated.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import { readMaybeThunk } from '../../1_Schema/_.js'
import { Schema } from '../../1_Schema/__.js'
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
    $Context['config']['schemaIndex'] extends null
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
      if (typeof key === `symbol`) throw new Error(`Symbols not supported.`)

      if (key.startsWith(`$batch`)) {
        return async (selectionSetOrIndicator: Select.SelectionSet.FieldValue) =>
          executeRootType(state, rootTypeName, selectionSetOrIndicator as Select.SelectionSet.AnySelectionSet)
      } else {
        const fieldName = key
        return (selectionSetOrArgs: Select.SelectionSet.AnySelectionSet | Select.Arguments.ArgsObject) =>
          executeRootTypeField(state, rootTypeName, fieldName, selectionSetOrArgs)
      }
    },
  })
}

const executeRootTypeField = async (
  state: State,
  rootTypeName: Grafaid.Schema.RootTypeName,
  rootTypeFieldName: string,
  argsOrSelectionSet?: Select.SelectionSet.AnySelectionSet | Select.Arguments.ArgsObject,
) => {
  if (!state.input.schemaIndex) throw new Error(`Schema not loaded`)

  const selectedType = readMaybeThunk(state.input.schemaIndex.Root[rootTypeName]?.fields[rootTypeFieldName]?.type)
  const selectedNamedType = readMaybeThunk(
    // eslint-disable-next-line
    // @ts-ignore excess depth error
    Schema.Output.unwrapToNamed(selectedType),
  ) as Schema.Output.Named
  // eslint-disable-next-line
  if (!selectedNamedType) throw new Error(`${rootTypeName} field not found: ${String(rootTypeFieldName)}`)
  // @ts-expect-error fixme
  const isSelectedTypeScalarOrTypeName = selectedNamedType.kind === `Scalar` || selectedNamedType.kind === `typename` // todo fix type here, its valid
  const isFieldHasArgs = Boolean(state.input.schemaIndex.Root[rootTypeName]?.fields[rootTypeFieldName]?.args)
  // We should only need to add __typename for result type fields, but the return handler doesn't yet know how to look beyond a plain object type so we have to add all those cases here.
  // todo we could look at the root type fields that have result types and compare to the incoming query for match?
  const isHasSchemaErrors = Object.values(state.input.schemaIndex.error.objects).length > 0
  const needsTypenameAdded = isHasSchemaErrors && state.config.output.errors.schema !== false
    && (selectedNamedType.kind === `Object` || selectedNamedType.kind === `Interface`
      || selectedNamedType.kind === `Union`)
  const rootTypeFieldSelectionSet = isSelectedTypeScalarOrTypeName
    ? isFieldHasArgs && argsOrSelectionSet ? { $: argsOrSelectionSet } : true
    : needsTypenameAdded
    ? { ...argsOrSelectionSet, __typename: true }
    : argsOrSelectionSet

  const result = await executeRootType(state, rootTypeName, {
    [rootTypeFieldName]: rootTypeFieldSelectionSet,
  } as Select.SelectionSet.AnySelectionSet)
  if (result instanceof Error) return result

  return state.config.output.envelope.enabled
    ? result
    // @ts-expect-error
    : result[rootTypeFieldName]
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
  const initialInput = {
    document,
    operationName,
    // todo, remove the above
    state,
    interfaceType,
    transportType,
    url,
    schema,
    schemaIndex: state.config.schemaIndex,
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

  return handleOutput(state, result)
}
