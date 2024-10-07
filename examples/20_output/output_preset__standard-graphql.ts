/**
 * This example shows how to configure output to approximate the traditional GraphQL ExecutionResult type.
 */

import { Graffle, Preset } from '../../src/entrypoints/main.js'
import { show } from '../$/show.js'

const graffle = Graffle.create({
  schema: `...`,
  output: Preset.traditionalGraphqlOutput,
})

const result = await graffle.gql(`{ query { thisWillError } }`).send()

show(result)
