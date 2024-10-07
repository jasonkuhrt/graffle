import type { DocumentNode } from 'graphql'
import { AssertEqual } from '../assert-equal.js'
import type {
  GetVariablesInputKind,
  Node,
  Query,
  ResultOf,
  String,
  Variables,
  VariablesInputKindNone,
  VariablesInputKindOptional,
  VariablesInputKindRequired,
  VariablesOf,
} from './TypedDocument.js'
// We want to test both internal/external Node to ensure they both work. See jsdoc for `Node` for more context.
import type { TypedDocumentNode as Node2 } from '@graphql-typed-document-node/core'

// dprint-ignore
{
  AssertEqual<GetVariablesInputKind<Variables>, VariablesInputKindOptional>()
  AssertEqual<GetVariablesInputKind<never>, VariablesInputKindNone>()
  AssertEqual<GetVariablesInputKind<{}>, VariablesInputKindNone>()
  AssertEqual<GetVariablesInputKind<{ x: 1 }>, VariablesInputKindRequired>()
  AssertEqual<GetVariablesInputKind<{ x: 1; y?: 1 }>, VariablesInputKindRequired>()
  AssertEqual<GetVariablesInputKind<{ x?: 1 }>, VariablesInputKindOptional>()
  AssertEqual<GetVariablesInputKind<{ x?: 2; y?: 1 }>, VariablesInputKindOptional>()

  AssertEqual<VariablesOf<DocumentNode      >, Variables>()
  AssertEqual<VariablesOf<Node2   <{x:1},{}>>, {}>()
  AssertEqual<VariablesOf<Node    <{x:1},{}>>, {}>()
  AssertEqual<VariablesOf<Query   <{x:1},{}>>, {}>()
  AssertEqual<VariablesOf<String  <{x:1},{}>>, {}>()

  AssertEqual<ResultOf<Node2  <{x:1},{}>>, {x:1}>()
  AssertEqual<ResultOf<Node   <{x:1},{}>>, {x:1}>()
  AssertEqual<ResultOf<Query  <{x:1},{}>>, {x:1}>()
  AssertEqual<ResultOf<String <{x:1},{}>>, {x:1}>()
}
