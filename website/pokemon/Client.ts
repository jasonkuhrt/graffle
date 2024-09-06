import { createPrefilled } from 'graffle/client'

import { $defaultSchemaUrl, $Index } from './SchemaRuntime.js'

export const create = createPrefilled(`Pokemon`, $Index, $defaultSchemaUrl)
