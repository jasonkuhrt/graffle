import type { Grafaid } from '../../lib/grafaid/__.js'
import { getOperationDefinition } from '../../lib/grafaid/document.js'
import { Nodes, operationTypeNameToRootTypeName } from '../../lib/grafaid/graphql.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'

export const injectTypenameOnRootResultFields = (
  { document, operationName, schema }: {
    operationName?: string | undefined
    schema: SchemaIndex
    document: Nodes.DocumentNode
  },
): void => {
  const operationDefinition = getOperationDefinition(document, operationName)
  if (!operationDefinition) return

  const rootTypeName = operationTypeNameToRootTypeName[operationDefinition.operation]
  const selectionSet = operationDefinition.selectionSet

  injectTypenameOnRootResultFields_({ rootTypeName, schema, selectionSet })
}

const injectTypenameOnRootResultFields_ = (
  { selectionSet, schema, rootTypeName }: {
    schema: SchemaIndex
    rootTypeName: Grafaid.Schema.RootTypeName
    selectionSet: Nodes.SelectionSetNode
  },
): void => {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Nodes.Kind.FIELD: {
        if (schema.error.rootResultFields[rootTypeName][selection.name.value]) {
          // @ts-expect-error selections is typed as readonly
          // @see https://github.com/graphql/graphql-js/discussions/4212
          selection.selectionSet?.selections.push(Nodes.Field({ name: Nodes.Name({ value: `__typename` }) }))
        }
        continue
      }
      case Nodes.Kind.INLINE_FRAGMENT: {
        injectTypenameOnRootResultFields_({
          rootTypeName,
          schema,
          selectionSet: selection.selectionSet,
        })
      }
    }
  }
}
