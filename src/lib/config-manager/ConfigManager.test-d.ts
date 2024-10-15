import { assertEqual } from '../assert-equal.js'
import type { ConfigManager } from './__.js'

interface x1 {
  z: number
  a: [1]
  c: { x: 1 }
}

assertEqual<
  ConfigManager.SetProperties<x1, {
    a: [1, 2]
    b: boolean
    c: { y: 2 }
  }>,
  { z: number; a: [1, 2]; b: boolean; c: { y: 2 } }
>()

// ConfigManager
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, [], { a2: 2 }>, { a: { b: 2 }; a2: 2 }>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a'], { b: 3 }>, { a: { b: 3 } }>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b'], 3>, { a: { b: 3 } }>()
// never
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, [], 1>, never>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['x'], 1>, never>()
assertEqual<ConfigManager.Set<{ a: { b: 2 } }, ['a', 'b', 'c'], 3>, { a: { b: never } }>()
