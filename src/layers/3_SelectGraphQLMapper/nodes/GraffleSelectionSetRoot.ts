import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { Select } from '../../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import { type GraphQLPostOperationMapper } from '../types.js'
import { fromGraffleSelectionObjectLevel } from './GraffleSelectionObjectLevel.js'

export const toGraphQLSelectionSetRoot: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.OutputObject,
  Nodes.SelectionSetNode,
  [
    selectionSet: Select.SelectionSet.AnySelectionSet,
  ]
> = (
  context,
  sddm,
  selectionSet,
) => {
  return Nodes.SelectionSet({
    selections: Object
      .entries(selectionSet)
      .map(([key, value]) => Select.parseSelectionRoot(key, value))
      .flatMap(keyParsed => fromGraffleSelectionObjectLevel(context, sddm, keyParsed)),
  })
}
