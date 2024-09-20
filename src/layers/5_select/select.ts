import type { GlobalRegistry } from '../2_generator/globalRegistry.js'

type Create = <$Name extends GlobalRegistry.SchemaNames>(
  name: $Name,
  // eslint-disable-next-line
  // @ts-ignore passes after generation
) => GlobalRegistry.GetOrDefault<$Name>['interfaces']['SelectMethods']

export const create: Create = (_name) => {
  return identityProxy as any
}

const identityProxy = new Proxy({}, {
  get: () => (value: unknown) => value,
})

// eslint-disable-next-line
// @ts-ignore generated types
export const select: TypeSelectionSets<GlobalRegistry.SchemaIndexDefault> = identityProxy
