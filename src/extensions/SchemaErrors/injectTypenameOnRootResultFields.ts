import type { Grafaid } from '../../lib/grafaid/__.js'
import { Nodes } from '../../lib/grafaid/graphql.js'
import type { SchemaDrivenDataMap } from '../CustomScalars/schemaDrivenDataMap/__.js'

export const injectTypenameOnRootResultFields = (
  { request, sddm }: {
    sddm: SchemaDrivenDataMap
    request: Grafaid.RequestAnalyzedDocumentNodeInput
  },
): void => {
  injectTypenameOnRootResultFields_({
    sddm,
    rootTypeName: request.rootType,
    selectionSet: request.operation.selectionSet,
  })
}

const injectTypenameOnRootResultFields_ = (
  { selectionSet, sddm, rootTypeName }: {
    sddm: SchemaDrivenDataMap
    rootTypeName: Grafaid.Schema.RootTypeName
    selectionSet: Nodes.SelectionSetNode
  },
): void => {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Nodes.Kind.FIELD: {
        const isResultField = Boolean(sddm.roots[rootTypeName]?.f[selection.name.value]?.r)
        if (isResultField) {
          // @ts-expect-error selections is typed as readonly
          // @see https://github.com/graphql/graphql-js/discussions/4212
          selection.selectionSet?.selections.push(Nodes.Field({ name: Nodes.Name({ value: `__typename` }) }))
        }
        continue
      }
      case Nodes.Kind.INLINE_FRAGMENT: {
        injectTypenameOnRootResultFields_({
          rootTypeName,
          sddm,
          selectionSet: selection.selectionSet,
        })
      }
    }
  }
}
