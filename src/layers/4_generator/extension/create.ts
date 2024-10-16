import type { Code } from '../../../lib/Code.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import type { Config } from '../config.js'

export interface Input {
  name: string
  schemaDrivenDataMap: {
    onObjectType: (input: ObjectTypeHookParams) => void
    onOutputField: (input: OutputFieldHookParams) => void
  }
}

interface ObjectTypeHookParams {
  config: Config
  sddmNode: Code.TermObject
  graphqlType: Grafaid.Schema.ObjectType
}

interface OutputFieldHookParams {
  config: Config
  sddmNode: Code.TermObjectWithLike<Code.TermObject>
  graphqlType: Grafaid.Schema.Field<any, any>
}

export const createExtension = (input: Input) => {
  return input
}
