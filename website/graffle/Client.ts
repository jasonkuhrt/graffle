import { createPrefilled } from 'graphql-request/graffle/client'

import { $defaultSchemaUrl, $Index } from './SchemaRuntime.js'

export const create = createPrefilled(`default`, $Index, $defaultSchemaUrl)
