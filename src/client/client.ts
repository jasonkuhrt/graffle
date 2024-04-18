import type { ExecutionResult } from 'graphql'
import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'
import type { MergeExclusive, NonEmptyObject } from 'type-fest'
import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from '../entrypoints/main.js'
import { type RootTypeName } from '../lib/graphql.js'
import type { Exact, IsMultipleKeys } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { InputFieldsAllNullable, Object$2 } from '../Schema/__.js'
import { Schema } from '../Schema/__.js'
import { readMaybeThunk } from '../Schema/core/helpers.js'
import * as CustomScalars from './customScalars.js'
import { toDocumentExpression } from './document.js'
import type { ResultSet } from './ResultSet/__.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { GraphQLDocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

type Variables = Record<string, string | number | boolean | null> // todo or any custom scalars too

// dprint-ignore
type RootTypeMethods<$Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  $Index['Root'][$RootTypeName] extends Schema.Object$2 ?
  (
  & {
      $batch: RootMethod<$Index, $RootTypeName>
    }
  & {
      [$RootTypeField in keyof $Index['Root'][$RootTypeName]['fields'] & string]: RootTypeMethod<$Index, $Index['Root'][$RootTypeName]['fields'][$RootTypeField]>
    }
  )
  : TSError<'RootTypeMethods', `Your schema does not have the root type "${$RootTypeName}".`>

// dprint-ignore
type RootMethod<$Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
    Promise<ResultSet.Root<$SelectionSet, $Index, $RootTypeName>>

// dprint-ignore
type RootTypeMethod<$Index extends Schema.Index, $Field extends Schema.SomeField> =
  RootTypeMethod_<$Index, $Field, $Field['type']>

// dprint-ignore
type RootTypeMethod_<$Index extends Schema.Index, $Field extends Schema.SomeField, $Type extends Schema.Output.Any> =
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? RootTypeMethod_<$Index, $Field, $InnerType> : 
  $Type extends Schema.Output.List<infer $InnerType>        ? RootTypeMethod_<$Index, $Field, $InnerType> :
  $Type extends Schema.Scalar.Any                           ? ScalarFieldMethod<$Index,$Field> :
                                                              ObjectLikeFieldMethod<$Index, $Field>

// dprint-ignore
type ObjectLikeFieldMethod<$Index extends Schema.Index, $Field extends Schema.SomeField> =
  <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.Field<$Field, $Index, { hideDirectives: true }>>) => Promise<ResultSet.Field<$SelectionSet, $Field, $Index>>

// dprint-ignore
type ScalarFieldMethod<$Index extends Schema.Index, $Field extends Schema.SomeField> =
  $Field['args'] extends Schema.Args<infer $Fields> ? InputFieldsAllNullable<$Fields> extends true  ? <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSet.Args<$Field['args']>>) => Promise<ResultSet.Field<$SelectionSet, $Field, $Index>> :
                                                                                                      <$SelectionSet>(args: Exact<$SelectionSet, SelectionSet.Args<$Field['args']>>) => Promise<ResultSet.Field<$SelectionSet, $Field, $Index>> :
                                                      (() => Promise<ResultSet.Field<true, $Field, $Index>>)

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

// dprint-ignore
export type Client<$Index extends Schema.Index> =
  & {
      // todo test raw
      raw: (document: string | DocumentNode, variables?:Variables) => Promise<object>
      document: <$Document extends Document<$Index>>
                  (document: ValidateDocumentOperationNames<NonEmptyObject<$Document>>) =>
                  // (document: $Document) =>
                    {
                      run:  <$Name extends keyof $Document & string, $Params extends (IsMultipleKeys<$Document> extends true ? [name: $Name] : ([] | [name: $Name | undefined]))>
                              (...params: $Params) =>
                                Promise<ResultSet.Root<GetOperation<$Document[$Name]>, $Index, 'Query'>>
                    }
    }
  & (
      $Index['Root']['Query'] extends null
        ? unknown
        : {
            query: RootTypeMethods<$Index, 'Query'>
          }
    )
  & (
      $Index['Root']['Mutation'] extends null
        ? unknown
        : {
            mutation: RootTypeMethods<$Index, 'Mutation'>
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
  documentObject: GraphQLDocumentObject
}

interface Input {
  schema: URL | string | GraphQLSchema
  headers?: HeadersInit
  // If there are no custom scalars then this property is useless. Improve types.
  schemaIndex: Schema.Index
  hooks?: {
    documentEncode: (
      input: HookInputDocumentEncode,
      fn: (input: HookInputDocumentEncode) => GraphQLDocumentObject,
    ) => GraphQLDocumentObject
  }
}

export const create = <$SchemaIndex extends Schema.Index>(input: Input): Client<$SchemaIndex> => {
  const parentInput = input

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
    if (input.schema instanceof URL || typeof input.schema === `string`) {
      // todo return errors too
      const data: ExecutionResult['data'] = await request({
        url: new URL(input.schema).href, // todo allow relative urls - what does fetch in node do?
        requestHeaders: input.headers,
        document,
        variables,
      })
      return { data }
    } else {
      if (typeof document === `string`) {
        return await graphql({
          schema: input.schema,
          source: document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          operationName,
        })
      } else if (typeof document === `object`) {
        return await execute({
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
  }

  const executeDocumentObject = (rootType: RootTypeName) => async (documentObject: GraphQLDocumentObject) => {
    const rootIndex = input.schemaIndex.Root[rootType]
    if (!rootIndex) throw new Error(`Root type not found: ${rootType}`)

    const documentObjectEncoded = runHookable(
      `documentEncode`,
      { rootIndex, documentObject },
      ({ rootIndex, documentObject }) => CustomScalars.encode({ index: rootIndex, documentObject }),
    )
    const documentString = SelectionSet.toGraphQLDocumentString(documentObjectEncoded)
    // todo variables
    const result = await executeDocumentExpression({ document: documentString })
    // @ts-expect-error todo make global available in TS...
    if (result.errors && (result.errors.length > 0)) throw new AggregateError(result.errors) // eslint-disable-line
    // todo check for errors
    const resultDecoded = CustomScalars.decode(rootIndex, result.data as object)
    return resultDecoded
  }

  const executeDocumentObjectQuery = executeDocumentObject(`Query`)

  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    raw: async (document, variables) => {
      return await executeDocumentExpression({ document, variables })
    },
    document: (documentObject) => {
      return {
        run: async (operationName) => {
          const documentExpression = toDocumentExpression(documentObject as any)
          return await executeDocumentExpression({
            document: documentExpression,
            operationName,
            // todo variables
          })
        },
      }
    },
    query: new Proxy({}, {
      get: (_, key) => {
        if (key === `$batch`) {
          return executeDocumentObjectQuery
        } else {
          return async (argsOrSelectionSet?: object) => {
            const type = readMaybeThunk(
              // eslint-disable-next-line
              // @ts-ignore excess depth error
              Schema.Output.unwrapToNamed(readMaybeThunk(input.schemaIndex.Root.Query?.fields[key]?.type)),
            ) as Schema.Output.Named
            if (!type) throw new Error(`Query field not found: ${String(key)}`) // eslint-disable-line
            const isSchemaScalar = type.kind === `Scalar`
            const isSchemaHasArgs = Boolean(input.schemaIndex.Root.Query?.fields[key]?.args)
            const documentObject = {
              [key]: isSchemaScalar
                ? isSchemaHasArgs && argsOrSelectionSet ? { $: argsOrSelectionSet } : true
                : argsOrSelectionSet,
            } as GraphQLDocumentObject
            const result = await executeDocumentObjectQuery(documentObject) as { [key in typeof key]: any }
            return result[key]
          }
        }
      },
    }),
    mutation: {
      $batch: executeDocumentObject(`Mutation`),
      // todo proxy that allows calling any mutation field
    },
    // todo
    // subscription: async () => {},
  }

  return client
}
