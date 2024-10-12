import { createPrefilled } from 'graffle/client'
import { defaultSchemaUrl } from './Data.js'
import { SchemaDrivenDataMap } from './SchemaDrivenDataMap.js'

export const create = createPrefilled(`default`, SchemaDrivenDataMap, defaultSchemaUrl)
