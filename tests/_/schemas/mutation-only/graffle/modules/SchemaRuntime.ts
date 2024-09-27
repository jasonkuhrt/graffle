/* eslint-disable */
import * as $ from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = undefined

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
})
export const $Index: Index = {
  name: Data.Name,
  RootTypesPresent: ['Mutation'] as const,
  RootUnion: undefined as any, // Type level only.
  Root: {
    Query: null,
    Mutation,
    Subscription: null,
  },
  allTypes: {
    Mutation,
  },
  objects: {},
  unions: {},
  interfaces: {},
  error: {
    objects: {},
    objectsTypename: {},
    rootResultFields: {
      Query: {},

      Subscription: {},
      Mutation: {},
    },
  },
}
