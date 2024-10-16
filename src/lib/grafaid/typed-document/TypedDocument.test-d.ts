import type { DocumentNode } from 'graphql'
import { assertEqual } from '../../assert-equal.js'
import type {
  GetVariablesInputKind,
  Node,
  Query,
  ResultOf,
  SomeObjectData,
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
  assertEqual<GetVariablesInputKind<Variables>, VariablesInputKindOptional>()
  assertEqual<GetVariablesInputKind<never>, VariablesInputKindNone>()
  assertEqual<GetVariablesInputKind<{}>, VariablesInputKindNone>()
  assertEqual<GetVariablesInputKind<{ x: 1 }>, VariablesInputKindRequired>()
  assertEqual<GetVariablesInputKind<{ x: 1; y?: 1 }>, VariablesInputKindRequired>()
  assertEqual<GetVariablesInputKind<{ x?: 1 }>, VariablesInputKindOptional>()
  assertEqual<GetVariablesInputKind<{ x?: 2; y?: 1 }>, VariablesInputKindOptional>()

  assertEqual<VariablesOf<DocumentNode      >, Variables>()
  assertEqual<VariablesOf<Node2   <{x:1},{}>>, {}>()
  assertEqual<VariablesOf<Node    <{x:1},{}>>, {}>()
  assertEqual<VariablesOf<Query   <{x:1},{}>>, {}>()
  assertEqual<VariablesOf<String  <{x:1},{}>>, {}>()

  assertEqual<ResultOf<string>           , SomeObjectData>()
  assertEqual<ResultOf<Node2  <{x:1},{}>>, {x:1}>()
  assertEqual<ResultOf<Node   <{x:1},{}>>, {x:1}>()
  assertEqual<ResultOf<Query  <{x:1},{}>>, {x:1}>()
  assertEqual<ResultOf<String <{x:1},{}>>, {x:1}>()
}
