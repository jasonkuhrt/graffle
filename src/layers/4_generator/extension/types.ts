import type { Code } from '../../../lib/Code.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import type { Config } from '../config/config.js'

export interface Extension {
  name: string
  onSchema?: (input: SchemaHookParams) => void
  schemaDrivenDataMap?: {
    onObjectType?: (input: ObjectTypeHookParams) => void
    onOutputField?: (input: OutputFieldHookParams) => void
  }
}

export interface SchemaHookParams {
  config: Config
  schema: Code.TermObject
}

export interface ObjectTypeHookParams {
  config: Config
  sddmNode: Code.TermObject
  graphqlType: Grafaid.Schema.ObjectType
}

export interface OutputFieldHookParams {
  config: Config
  sddmNode: Code.DirectiveTermObjectLike<Code.TermObject>
  graphqlType: Grafaid.Schema.Field<any, any>
}
