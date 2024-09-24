import { identityProxy } from '../../lib/prelude.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'

// dprint-ignore
type Create = <$Name extends GlobalRegistry.SchemaNames>(name: $Name) =>
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  GlobalRegistry.GetOrDefault<$Name>['interfaces']['MethodsSelect']

export const create: Create = (_name) => identityProxy as any

// todo is an any type
// eslint-disable-next-line
// @ts-ignore generated types
export const select: TypeSelectionSets<GlobalRegistry.SchemaIndexDefault> = identityProxy
