import { AssertIsEqual } from './assert-equal.js'
import type { OmitKeysWithPrefix } from './prelude.js'

AssertIsEqual<OmitKeysWithPrefix<{ a: 1; b: 2 }, 'a'>, { a: 1; b: 2 }>()
AssertIsEqual<OmitKeysWithPrefix<{ foo_a: 1; b: 2 }, 'foo'>, { b: 2 }>()
