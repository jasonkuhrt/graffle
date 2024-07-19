/* eslint-disable */
import { ExecutionResult } from 'graphql'
import { type ObjMap } from 'graphql/jsutils/ObjMap.js'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../../lib/graphql.js'

describe('extensions', async () => {
  const graffle = Graffle.create({ schema, output: { extensions: true } })
  const result = await graffle.query.__typename()
  // todo
  expectTypeOf(result).toEqualTypeOf<{ data: { __typename: 'Query' }; extensions: {} }>()
})
