import { AssertEqual } from '../assert-equal.js'
import type {
  GetVariablesInputKind,
  Variables,
  VariablesInputKindNone,
  VariablesInputKindOptional,
  VariablesInputKindRequired,
} from './TypedDocument.js'

// dprint-ignore
{
  AssertEqual<GetVariablesInputKind<Variables>, VariablesInputKindOptional>()
  AssertEqual<GetVariablesInputKind<never>, VariablesInputKindNone>()
  AssertEqual<GetVariablesInputKind<{}>, VariablesInputKindNone>()
  AssertEqual<GetVariablesInputKind<{ x: 1 }>, VariablesInputKindRequired>()
  AssertEqual<GetVariablesInputKind<{ x: 1; y?: 1 }>, VariablesInputKindRequired>()
  AssertEqual<GetVariablesInputKind<{ x?: 1 }>, VariablesInputKindOptional>()
  AssertEqual<GetVariablesInputKind<{ x?: 2; y?: 1 }>, VariablesInputKindOptional>()
}
