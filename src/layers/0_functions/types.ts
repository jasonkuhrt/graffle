import type { TypedQueryDocumentNode } from 'graphql'
import type { HasRequiredKeys, IsEmptyObject } from 'type-fest'
import type { StandardScalarVariables } from '../../lib/graphql.js'
import type { Negate } from '../../lib/prelude.js'
import type { DocumentInput, OperationNameInput } from '../6_client/types.js'

// dprint-ignore
export type BaseInput<$Document extends DocumentInput = DocumentInput> =
  & {
      document: $Document
      operationName?: OperationNameInput
    }
  & (
      string extends $Document
        ? { variables?: StandardScalarVariables }
        : GetVariablesInput<Exclude<$Document,string>>
            )

// dprint-ignore
type GetVariablesInput<$Document extends TypedQueryDocumentNode> =
  HasVariables<$Document> extends true
    ? HasRequiredKeys<VariablesOf<$Document>> extends true
      ? { variables: VariablesOf<$Document> }
      : { variables?: VariablesOf<$Document> }
    : {} // eslint-disable-line

export type HasVariables<$Document extends TypedQueryDocumentNode> = Negate<IsEmptyObject<VariablesOf<$Document>>>

type VariablesOf<$Document extends TypedQueryDocumentNode> = $Document extends TypedQueryDocumentNode<infer _, infer V>
  ? V
  : never
