import { createPrefilled } from 'graffle/client'
import { defaultSchemaUrl } from './Data.js'
import { schemaDrivenDataMap } from './SchemaDrivenDataMap.js'

export const create = createPrefilled(`default`, schemaDrivenDataMap, defaultSchemaUrl)
