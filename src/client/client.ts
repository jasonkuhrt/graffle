import type { ExecutionResult } from 'graphql'
import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'
import type { MergeExclusive, NonEmptyObject } from 'type-fest'
import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from '../entrypoints/main.js'
import type { RootTypeName } from '../lib/graphql.js'
import type { Exact, IsMultipleKeys } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { InputFieldsAllNullable, Object$2 } from '../Schema/__.js'
import { Schema } from '../Schema/__.js'
import { readMaybeThunk } from '../Schema/core/helpers.js'
import * as CustomScalars from './customScalars.js'
import { toDocumentExpression } from './document.js'
import type { ResultSet } from './ResultSet/__.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { DocumentObject, GraphQLObjectSelection } from './SelectionSet/toGraphQLDocumentString.js'

type Variables = Record<string, string | number | boolean | null> // todo or any custom scalars too

type RootTypeFieldContext = {
  Config: Config
  Index: Schema.Index
  RootTypeName: Schema.RootTypeName
  RootTypeFieldName: string
  Field: Schema.SomeField
}

// dprint-ignore
type RootTypeMethods<$Config extends OptionsInputDefaults, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  $Index['Root'][$RootTypeName] extends Schema.Object$2 ?
  (
  & {
      $batch: RootMethod<$Config, $Index, $RootTypeName>
    }
  & {
      [$RootTypeFieldName in keyof $Index['Root'][$RootTypeName]['fields'] & string]:
        RootTypeFieldMethod<{
          Config: $Config,
          Index: $Index,
          RootTypeName: $RootTypeName,
          RootTypeFieldName: $RootTypeFieldName
          Field: $Index['Root'][$RootTypeName]['fields'][$RootTypeFieldName]
        }>
    }
  )
  : TSError<'RootTypeMethods', `Your schema does not have the root type "${$RootTypeName}".`>

// dprint-ignore
type RootMethod<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
    Promise<ReturnMode<$Config, ResultSet.Root<$SelectionSet, $Index, $RootTypeName>>>

// dprint-ignore
// type RootTypeFieldMethod<$Config extends OptionsInputDefaults, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName, $RootTypeFieldName extends string> =
type RootTypeFieldMethod<$Context extends RootTypeFieldContext> =
  RootTypeFieldMethod_<$Context, $Context['Field']['type']>

// dprint-ignore
type RootTypeFieldMethod_<$Context extends RootTypeFieldContext, $Type extends Schema.Output.Any> =
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? RootTypeFieldMethod_<$Context, $InnerType> : 
  $Type extends Schema.Output.List<infer $InnerType>        ? RootTypeFieldMethod_<$Context, $InnerType> :
  $Type extends Schema.Scalar.Any                           ? ScalarFieldMethod<$Context> :
  // todo test this case
  $Type extends Schema.__typename                           ? ScalarFieldMethod<$Context> :
                                                              ObjectLikeFieldMethod<$Context>

// dprint-ignore
type ObjectLikeFieldMethod<$Context extends RootTypeFieldContext> =
  <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.Field<$Context['Field'], $Context['Index'], { hideDirectives: true }>>) =>
    Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>>

// dprint-ignore
type ScalarFieldMethod<$Context extends RootTypeFieldContext> =
  $Context['Field']['args'] extends Schema.Args<infer $Fields>  ? InputFieldsAllNullable<$Fields> extends true  ? <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                                                                  <$SelectionSet>(args:  Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                  (() => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<true, $Context['Field'], $Context['Index']>>>)
// dprint-ignore
type ReturnModeForFieldMethod<$Context extends RootTypeFieldContext, $Data> =
  $Context['Config']['returnMode'] extends 'data'
    ? $Data
    : ExecutionResult<{ [k in $Context['RootTypeFieldName']] : $Data }>

// dprint-ignore
type Document<$Index extends Schema.Index> =
  {
    [name: string]:
      $Index['Root']['Query'] extends null    ? { mutation: SelectionSet.Root<$Index, 'Mutation'> } :
      $Index['Root']['Mutation'] extends null ? { query: SelectionSet.Root<$Index, 'Query'> } :
                                                MergeExclusive<
                                                  {
                                                    query: SelectionSet.Root<$Index, 'Query'>
                                                  },
                                                  {
                                                    mutation: SelectionSet.Root<$Index, 'Mutation'>
                                                  }
                                                >
  }

// dprint-ignore
type GetOperation<T extends {query:any}|{mutation:any}> =
  T extends {query:infer U}    ? U : 
  T extends {mutation:infer U} ? U :
  never

// dprint-ignore
type ValidateDocumentOperationNames<$Document> =
  // This initial condition checks that the document is not already in an error state.
  // Namely from for example { x: { mutation: { ... }}} where the schema has no mutations.
  // Which is statically caught by the `Document` type. In that case the document type variable
  // no longer functions per normal with regards to keyof utility, not returning exact keys of the object
  // but instead this more general union. Not totally clear _why_, but we have tests covering this...
  string | number extends keyof $Document
    ? $Document
    : keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K } extends never
      ? $Document
      : TSError<'ValidateDocumentOperationNames', `One or more Invalid operation name in document: ${keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K }}`>

// todo: dataAndErrors | dataAndSchemaErrors
type ReturnModeType = 'graphql' | 'data'

type OptionsInput = {
  returnMode: ReturnModeType | undefined
}

type OptionsInputDefaults = {
  returnMode: 'data'
}

type Config = {
  returnMode: ReturnModeType
}

type ApplyInputDefaults<Input extends OptionsInput> = {
  [Key in keyof OptionsInputDefaults]: undefined extends Input[Key] ? OptionsInputDefaults[Key] : Input[Key]
}

// dprint-ignore
type ReturnMode<$Config extends Config, $Data> =
  $Config['returnMode'] extends 'graphql' ? ExecutionResult<$Data> : $Data

// dprint-ignore
export type Client<$Index extends Schema.Index, $Config extends OptionsInputDefaults> =
  & {
      // todo test raw
      raw: (document: string | DocumentNode, variables?:Variables,operationName?:string) => Promise<ExecutionResult>
      document: <$Document extends Document<$Index>>
                  (document: ValidateDocumentOperationNames<NonEmptyObject<$Document>>) =>
                  // (document: $Document) =>
                    {
                      run:  <$Name extends keyof $Document & string, $Params extends (IsMultipleKeys<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined]))>
                              (...params: $Params) =>
                                Promise<
                                  ReturnMode<$Config, ResultSet.Root<GetOperation<$Document[$Name]>, $Index, 'Query'>>
                                >
                    }
    }
  & (
      $Index['Root']['Query'] extends null
        ? unknown
        : {
            query: RootTypeMethods<$Config, $Index, 'Query'>
          }
    )
  & (
      $Index['Root']['Mutation'] extends null
        ? unknown
        : {
            mutation: RootTypeMethods<$Config, $Index, 'Mutation'>
          }
    )
// todo
// & ($SchemaIndex['Root']['Subscription'] extends null ? {
//     subscription: <$SelectionSet extends SelectionSet.Subscription<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Subscription<$SelectionSet,$SchemaIndex>>
//   }
//   : unknown)
//

interface HookInputDocumentEncode {
  rootIndex: Object$2
  documentObject: GraphQLObjectSelection
}

interface Input {
  /**
   * @defaultValue 'default'
   */
  name?: keyof NamedSchemas
  schema: URL | string | GraphQLSchema
  headers?: HeadersInit
  /**
   * Used internally for several functions.
   *
   * When custom scalars are being used, this runtime schema is used to
   * encode/decode them before/after your application sends/receives them.
   *
   * When using root type field methods, this runtime schema is used to assist how arguments on scalars versus objects
   * are constructed into the sent GraphQL document.
   */
  schemaIndex: Schema.Index
  returnMode?: ReturnModeType
  hooks?: {
    documentEncode: (
      input: HookInputDocumentEncode,
      fn: (input: HookInputDocumentEncode) => GraphQLObjectSelection,
    ) => GraphQLObjectSelection
  }
}

export const create = <$Input extends Input>(
  input: $Input,
): Client<
  // @ts-expect-error fixme
  (undefined extends $Input['name'] ? NamedSchemas['default']['index'] : NamedSchemas[$Input['name']]['index']),
  ApplyInputDefaults<{ returnMode: $Input['returnMode'] }>
> => {
  const parentInput = input
  const returnMode = input.returnMode ?? `data`

  const runHookable = <$Name extends keyof ExcludeUndefined<Input['hooks']>>(
    name: $Name,
    input: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[0],
    fn: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[1],
  ) => {
    return parentInput.hooks?.[name](input, fn) ?? fn(input)
  }

  const executeDocumentExpression = async (
    { document, variables, operationName }: {
      document: string | DocumentNode
      variables?: Variables
      operationName?: string
    },
  ): Promise<ExecutionResult> => {
    let result: ExecutionResult
    if (input.schema instanceof URL || typeof input.schema === `string`) {
      // todo return errors too
      const data: ExecutionResult['data'] = await request({
        url: new URL(input.schema).href, // todo allow relative urls - what does fetch in node do?
        requestHeaders: input.headers,
        document,
        variables,
        // todo use operationName
      })
      result = { data }
    } else {
      if (typeof document === `string`) {
        result = await graphql({
          schema: input.schema,
          source: document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          operationName,
        })
      } else if (typeof document === `object`) {
        result = await execute({
          schema: input.schema,
          document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          operationName,
        })
      } else {
        throw new Error(`Unsupported GraphQL document type: ${String(document)}`)
      }
    }
    return result
  }

  const executeRootObject =
    (rootTypeName: RootTypeName) => async (documentObject: GraphQLObjectSelection): Promise<ExecutionResult> => {
      const rootIndex = input.schemaIndex.Root[rootTypeName]
      if (!rootIndex) throw new Error(`Root type not found: ${rootTypeName}`)

      const documentObjectEncoded = runHookable(
        `documentEncode`,
        { rootIndex, documentObject },
        ({ rootIndex, documentObject }) => CustomScalars.encode({ index: rootIndex, documentObject }),
      )
      const documentString = SelectionSet.selectionSet(documentObjectEncoded)
      // todo variables
      const result = await executeDocumentExpression({ document: documentString })
      // @ts-expect-error todo make global available in TS...
      if (result.errors && (result.errors.length > 0)) throw new AggregateError(result.errors) // eslint-disable-line
      // todo check for errors
      const dataDecoded = CustomScalars.decode(rootIndex, result.data)
      return { ...result, data: dataDecoded }
    }

  const rootTypeNameToOperationName = {
    Query: `query`,
    Mutation: `mutation`,
    Subscription: `subscription`,
  } as const

  const executeRootTypeFieldSelection = (rootTypeName: RootTypeName, key: string) => {
    return async (argsOrSelectionSet?: object) => {
      const type = readMaybeThunk(
        // eslint-disable-next-line
        // @ts-ignore excess depth error
        Schema.Output.unwrapToNamed(readMaybeThunk(input.schemaIndex.Root[rootTypeName]?.fields[key]?.type)),
      ) as Schema.Output.Named
      if (!type) throw new Error(`${rootTypeName} field not found: ${String(key)}`) // eslint-disable-line
      // @ts-expect-error fixme
      const isSchemaScalarOrTypeName = type.kind === `Scalar` || type.kind === `typename` // todo fix type here, its valid
      const isSchemaHasArgs = Boolean(input.schemaIndex.Root[rootTypeName]?.fields[key]?.args)
      const documentObject = {
        [rootTypeNameToOperationName[rootTypeName]]: {
          [key]: isSchemaScalarOrTypeName
            ? isSchemaHasArgs && argsOrSelectionSet ? { $: argsOrSelectionSet } : true
            : argsOrSelectionSet,
        },
      } as GraphQLObjectSelection
      const result = await rootObjectExecutors[rootTypeName](documentObject)
      const resultHandled = handleReturn(result)
      // @ts-expect-error make this type safe?
      return returnMode === `data` ? resultHandled[key] : resultHandled
    }
  }

  const handleReturn = (result: ExecutionResult) => {
    switch (returnMode) {
      case `data`: {
        if (result.errors && result.errors.length > 0) {
          // @ts-expect-error fixme -- get this global available
          throw new AggregateError(result.errors) // eslint-disable-line
        }
        return result.data
      }
      default: {
        return result
      }
    }
  }

  const rootObjectExecutors = {
    Mutation: executeRootObject(`Mutation`),
    Query: executeRootObject(`Query`),
    Subscription: executeRootObject(`Subscription`),
  }

  const createRootTypeMethods = (rootTypeName: RootTypeName) =>
    new Proxy({}, {
      get: (_, key) => {
        if (typeof key === `symbol`) throw new Error(`Symbols not supported.`)
        if (key === `$batch`) {
          return async (selectionSetOrIndicator: GraphQLObjectSelection) => {
            const result = await rootObjectExecutors[rootTypeName]({
              [rootTypeNameToOperationName[rootTypeName]]: selectionSetOrIndicator,
            })
            return handleReturn(result)
          }
        } else {
          return executeRootTypeFieldSelection(rootTypeName, key)
        }
      },
    })

  // @ts-expect-error ignoreme
  const client: Client = {
    raw: async (document: string | DocumentNode, variables?: Variables, operationName?: string) => {
      return await executeDocumentExpression({ document, variables, operationName })
    },
    document: (documentObject: DocumentObject) => {
      return {
        run: async (operationName: string) => {
          // todo this does not support custom scalars
          const documentExpression = toDocumentExpression(documentObject)
          const result = await executeDocumentExpression({
            document: documentExpression,
            operationName,
            // todo variables
          })
          return handleReturn(result)
        },
      }
    },
    query: createRootTypeMethods(`Query`),
    mutation: createRootTypeMethods(`Mutation`),
    // todo
    // subscription: async () => {},
  }

  return client
}
