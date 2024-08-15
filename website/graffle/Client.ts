import { createPrefilled } from 'graphql-request/graffle/client'

import { $defaultSchemaUrl, $Index } from './SchemaRuntime.js'

export const create = createPrefilled(`graffle`, $Index, $defaultSchemaUrl)
