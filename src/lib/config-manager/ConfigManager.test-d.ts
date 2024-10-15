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
