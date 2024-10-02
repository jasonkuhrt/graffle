// todo we are going to run into recursion with input types such as two input
// objects each having their own custom scalars and also referencing one another.
// to solve this we'll need to either use thunks or some kind of indirect look up table?
import { isInputObjectType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { Nodes } from '../../../lib/graphql-plus/graphql.js'
import { entries } from '../../../lib/prelude.js'
import { Select } from '../../2_Select/__.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { createCodeGenerator } from '../helpers/moduleGeneratorRunner.js'
import { title1 } from '../helpers/render.js'
import { ModuleGeneratorScalar } from './Scalar.js'

const identifiers = {
  $CustomScalars: `CustomScalars`,
}

export const ModuleGeneratorRuntimeCustomScalars = createModuleGenerator(
  `RuntimeCustomScalars`,
  ({ config, code }) => {
    code(`import * as ${identifiers.$CustomScalars} from './${ModuleGeneratorScalar.name}.js'`)

    // dprint-ignore
    const kindsFiltered = {
      GraphQLInputObjectType: config.schema.typeMapByKind.GraphQLInputObjectType.filter(Nodes.$Schema.isHasCustomScalarInputs),
      GraphQLObjectType: config.schema.typeMapByKind.GraphQLObjectType.filter(Nodes.$Schema.isHasCustomScalarInputs),
      GraphQLRootType: config.schema.typeMapByKind.GraphQLRootType.filter(Nodes.$Schema.isHasCustomScalarInputs),
    }

    for (const [kindName, nodes] of entries(kindsFiltered)) {
      code(title1(kindName))
      code()
      if (nodes.length === 0) {
        code(`// None of your ${kindName}s have custom scalars.`)
      }
      for (const type of nodes) {
        const codeGenerator = kindRenders[kindName] as any
        code(codeGenerator({ config, type: type as any }))
        code()
      }

      code()
    }

    code(title1(`Index`))
    code()
    code(`export const $index = {`)
    kindsFiltered.GraphQLRootType.forEach(type => {
      code(type.name + `,`)
    })
    code(`}`)
  },
)

//
//
//
// Code Generators
// ---------------
//
//
//

const ObjectType = createCodeGenerator<{ type: Nodes.$Schema.GraphQLObjectType }>(
  ({ code, type }) => {
    code(`const ${type.name} = {`)

    const fields = Object.values(type.getFields()).filter(Nodes.$Schema.isHasCustomScalarInputs)
    for (const field of fields) {
      code(Code.termField(field.name, `{`, { comma: false }))

      // Field Arguments
      const args = field.args.filter(Nodes.$Schema.isHasCustomScalarInputs)
      if (args.length > 0) {
        code(Code.termField(Select.Arguments.key, `{`, { comma: false }))
        for (const arg of args) {
          const argType = Nodes.getNamedType(arg.type)
          if (Nodes.$Schema.isScalarTypeAndCustom(argType)) {
            code(Code.termField(arg.name, `${identifiers.$CustomScalars}.${argType.name}.codec`))
          } else if (isInputObjectType(argType)) {
            code(Code.termField(arg.name, argType.name))
          } else {
            throw new Error(`Failed to complete index for argument ${arg.name} of ${argType.toString()}`)
          }
        }
        code(`},`)
      }

      // todo make kitchen sink schema have a pattern where this code path will be traversed.
      // We just need to have arguments on a field on a nested object.
      // Nested objects that in turn have custom scalar arguments
      const fieldType = Nodes.getNamedType(field.type)
      if (Nodes.$Schema.isObjectType(fieldType) && Nodes.$Schema.isHasCustomScalarInputs(fieldType)) {
        code(Code.termField(field.name, fieldType.name))
      }
      code(`},`)
    }
    code(`}`)
  },
)

const InputObjectType = createCodeGenerator<{ type: Nodes.$Schema.GraphQLInputObjectType }>(
  ({ code, type }) => {
    code(`const ${type.name} = {`)

    for (const field of Object.values(type.getFields())) {
      const type = Nodes.getNamedType(field.type)
      if (Nodes.$Schema.isScalarTypeAndCustom(type)) {
        code(Code.termField(field.name, `${identifiers.$CustomScalars}.${type.name}.codec`))
      } else if (isInputObjectType(type) && Nodes.$Schema.isHasCustomScalarInputs(type)) {
        code(Code.termField(field.name, type.name))
      }
    }

    code(`}`)
  },
)

const kindRenders = {
  GraphQLInputObjectType: InputObjectType,
  GraphQLObjectType: ObjectType,
  GraphQLRootType: ObjectType,
}
