import { AssertIsEqual } from '../assert-equal.js'
import type {
  GetVariablesInputKind,
  Variables,
  VariablesInputKindNone,
  VariablesInputKindOptional,
  VariablesInputKindRequired,
} from './TypedDocument.js'

// dprint-ignore
{
  AssertIsEqual<GetVariablesInputKind<Variables>, VariablesInputKindOptional>()
  AssertIsEqual<GetVariablesInputKind<never>, VariablesInputKindNone>()
  AssertIsEqual<GetVariablesInputKind<{}>, VariablesInputKindNone>()
  AssertIsEqual<GetVariablesInputKind<{ x: 1 }>, VariablesInputKindRequired>()
  AssertIsEqual<GetVariablesInputKind<{ x: 1; y?: 1 }>, VariablesInputKindRequired>()
  AssertIsEqual<GetVariablesInputKind<{ x?: 1 }>, VariablesInputKindOptional>()
  AssertIsEqual<GetVariablesInputKind<{ x?: 2; y?: 1 }>, VariablesInputKindOptional>()
}
