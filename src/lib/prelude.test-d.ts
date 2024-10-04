import { AssertEqual } from './assert-equal.js'
import type { ConfigManager } from './prelude.js'
import type { OmitKeysWithPrefix } from './prelude.js'

// dprint-ignore
{

AssertEqual<OmitKeysWithPrefix<{ a: 1; b: 2 }, 'a'>         , { a: 1; b: 2 }>()
AssertEqual<OmitKeysWithPrefix<{ foo_a: 1; b: 2 }, 'foo'>   , { b: 2 }>()

// ConfigManager
AssertEqual<ConfigManager.Set<{ a: { b: 2 } }, [], { a2: 2 }>, { a: { b: 2 }; a2: 2 }>()
AssertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a'], { b: 3 }>, { a: { b: 3 } }>()
AssertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b'], 3>, { a: { b: 3 } }>()
// never
AssertEqual<ConfigManager.Set<{ a: { b: 2 } }, [], 1>, never>()
AssertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['x'], 1>, never>()
AssertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b', 'c'], 3>, { a: { b: never } }>()

}
