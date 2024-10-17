import { createPrefilled } from '../../../../../../entrypoints/client.js'
import { defaultSchemaUrl } from './Data.js'
import { Name } from './Data.js'
import { schemaDrivenDataMap } from './SchemaDrivenDataMap.js'

export const create = createPrefilled(Name, schemaDrivenDataMap, defaultSchemaUrl)
