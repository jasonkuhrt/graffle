import { assertEqual } from '../assert-equal.js'
import type { TypeFunction } from './__.js'

interface a extends TypeFunction.Fn {
  // @ts-expect-error
  return: `${this['params']}a`
}

interface b extends TypeFunction.Fn {
  // @ts-expect-error
  return: `${this['params']}b`
}

interface c extends TypeFunction.Fn {
  // @ts-expect-error
  return: `${this['params']}c`
}

assertEqual<TypeFunction.CallPipeline<[a, b, c], ''>, 'abc'>()
