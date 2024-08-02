import { expectTypeOf, test } from 'vitest'
import type { ConfigManager } from './prelude.js'

test(`ConfigManager`, () => {
  expectTypeOf<ConfigManager.Set<{ a: { b: 2 } }, [], { a2: 2 }>>().toEqualTypeOf<{ a: { b: 2 }; a2: 2 }>()
  expectTypeOf<ConfigManager.Set<{ a: { b: 2 } }, ['a'], { b: 3 }>>().toEqualTypeOf<{ a: { b: 3 } }>()
  expectTypeOf<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b'], 3>>().toEqualTypeOf<{ a: { b: 3 } }>()
  // never
  expectTypeOf<ConfigManager.Set<{ a: { b: 2 } }, [], 1>>().toEqualTypeOf<never>()
  expectTypeOf<ConfigManager.Set<{ a: { b: 2 } }, ['x'], 1>>().toEqualTypeOf<never>()
  expectTypeOf<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b', 'c'], 3>>().toEqualTypeOf<{ a: { b: never } }>()
})
