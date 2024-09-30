import { Hybrid } from './Hybrid/__.js'

export interface Directive {
  name: string
  arguments: Record<string, {
    name: string
    type: Hybrid.Scalar.$Any
  }>
}

export const IncludeDirective: Directive = {
  name: `include`,
  arguments: {
    if: {
      name: `if`,
      type: Hybrid.Scalar.Boolean,
    },
  },
}

export const SkipDirective: Directive = {
  name: `skip`,
  arguments: {
    if: {
      name: `if`,
      type: Hybrid.Scalar.Boolean,
    },
  },
}

export const standardDirectivesByName = {
  include: IncludeDirective,
  skip: SkipDirective,
}
