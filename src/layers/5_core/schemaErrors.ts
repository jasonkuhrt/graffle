import { Nodes, operationTypeNameToRootTypeName, type RootTypeName } from '../../lib/graphql-plus/graphql.js'
import type { Schema } from '../1_Schema/__.js'

export const injectTypenameOnRootResultFields = (
  { document, operationName, schema }: {
    operationName?: string | undefined
    schema: Schema.Index
    document: Nodes.DocumentNode
  },
): void => {
  const operationDefinition = document.definitions.find(_ =>
    _.kind === Nodes.Kind.OPERATION_DEFINITION && (operationName ? _.name?.value === operationName : true)
  ) as Nodes.OperationDefinitionNode | undefined

  if (!operationDefinition) {
    throw new Error(`Operation not found`)
  }

  injectTypenameOnRootResultFields_({
    rootTypeName: operationTypeNameToRootTypeName[operationDefinition.operation],
    schema,
    selectionSet: operationDefinition.selectionSet,
  })
}

const injectTypenameOnRootResultFields_ = (
  { selectionSet, schema, rootTypeName }: {
    schema: Schema.Index
    rootTypeName: RootTypeName
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
