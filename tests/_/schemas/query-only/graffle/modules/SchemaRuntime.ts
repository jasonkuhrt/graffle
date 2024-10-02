/* eslint-disable */
import * as $ from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import { $index as $customScalarsIndex } from './RuntimeCustomScalars.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = undefined

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  idNonNull: $.field('idNonNull', $Scalar.ID),
})
export const $Index: Index = {
  name: Data.Name,
  RootTypesPresent: ['Query'] as const,
  RootUnion: undefined as any, // Type level only.
  Root: {
    Query,
    Mutation: null,
    Subscription: null,
  },
  allTypes: {
    Query,
  },
  objects: {},
  unions: {},
  interfaces: {},
  customScalars: {
    input: $customScalarsIndex,
  },
  error: {
    objects: {},
    objectsTypename: {},
    rootResultFields: {
      Mutation: {},
      Subscription: {},
      Query: {},
    },
  },
}
