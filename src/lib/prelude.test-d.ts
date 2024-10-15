import { assertEqual } from './assert-equal.js'
import type { ConfigManager } from './prelude.js'
import type { OmitKeysWithPrefix } from './prelude.js'

// dprint-ignore
{

assertEqual<OmitKeysWithPrefix<{ a: 1; b: 2 }, 'a'>         , { a: 1; b: 2 }>()
assertEqual<OmitKeysWithPrefix<{ foo_a: 1; b: 2 }, 'foo'>   , { b: 2 }>()

// ConfigManager
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, [], { a2: 2 }>, { a: { b: 2 }; a2: 2 }>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a'], { b: 3 }>, { a: { b: 3 } }>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b'], 3>, { a: { b: 3 } }>()
// never
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, [], 1>, never>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['x'], 1>, never>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b', 'c'], 3>, { a: { b: never } }>()

}
