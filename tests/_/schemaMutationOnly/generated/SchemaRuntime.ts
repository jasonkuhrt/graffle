/* eslint-disable */

import * as $ from '../../../../src/entrypoints/alpha/schema.js'
import * as $Scalar from './Scalar.js'

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
})

export const $Index = {
  Root: {
    Query: null,
    Mutation,
    Subscription: null,
  },
  objects: {},
  unions: {},
  interfaces: {},
  error: {
    objects: {},
  },
}
