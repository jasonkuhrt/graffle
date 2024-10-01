import type { RootTypeName } from '../../lib/graphql-plus/graphql.js'
import type { Schema } from '../1_Schema/__.js'
import { Select } from '../2_Select/__.js'

export const injectTypenameOnResultFields = (
  input: {
    operationName?: string | undefined
    schema: Schema.Index
    document: Select.Document.DocumentNormalized
  },
): Select.Document.DocumentNormalized => {
  const { document, operationName, schema } = input
  const operation = operationName ? document.operations[operationName] : Object.values(document.operations)[0]!

  if (!operation) {
    throw new Error(`Operation not found`)
  }

  injectTypenameOnRootResultFields({
    rootTypeName: operation.rootType,
    schema,
    selectionSet: operation.selectionSet,
  })

  return document
}

const injectTypenameOnRootResultFields = (
  input: {
    schema: Schema.Index
    selectionSet: Select.SelectionSet.AnySelectionSet
    rootTypeName: RootTypeName
  },
): void => {
  const { selectionSet, schema, rootTypeName } = input

  for (const [rootFieldName, fieldValue] of Object.entries(selectionSet)) {
    const field = Select.parseSelection(rootFieldName, fieldValue)

    switch (field.type) {
      case `InlineFragment`: {
        // we need to check contents for result root fields
        for (const inlineFragmentSelectionSet of field.selectionSets) {
          injectTypenameOnRootResultFields({
            rootTypeName,
            schema,
            selectionSet: inlineFragmentSelectionSet,
          })
        }
        continue
      }
      case `SelectionSet`: {
        if (schema.error.rootResultFields[rootTypeName][rootFieldName]) {
          field.selectionSet[`__typename`] = true
        }
        continue
      }
      case `Alias`: {
        if (schema.error.rootResultFields[rootTypeName][rootFieldName]) {
          for (const alias of field.aliases) {
            // Casting type: This alias is for a field whose type is in rootResultFields
            // so it must be a selection set (e.g. not an indicator)
            const aliasSelectionSet = alias[1] as Select.SelectionSet.AnySelectionSet
            aliasSelectionSet[`__typename`] = true
          }
        }
        continue
      }
      default: {
        continue
      }
    }
  }
}
