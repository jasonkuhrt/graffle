// todo we are going to run into recursion with input types such as two input
// objects each having their own custom scalars and also referencing one another.
// to solve this we'll need to either use thunks or some kind of indirect look up table?
import { Code } from '../../../lib/Code.js'
import { Nodes } from '../../../lib/grafaid/graphql.js'
import { entries } from '../../../lib/prelude.js'
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
      GraphQLInputObjectType: config.schema.typeMapByKind.GraphQLInputObjectType.filter(Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLObjectType: config.schema.typeMapByKind.GraphQLObjectType.filter(Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLInterfaceType: config.schema.typeMapByKind.GraphQLInterfaceType.filter(Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLUnionType: config.schema.typeMapByKind.GraphQLUnionType.filter(Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLRootType: config.schema.typeMapByKind.GraphQLRootType.filter(Nodes.$Schema.CustomScalars.isHasCustomScalars),
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

const UnionType = createCodeGenerator<
  { type: Nodes.$Schema.GraphQLUnionType }
>(
  ({ code, type }) => {
    // This takes advantage of the fact that in GraphQL, in a union type, all members that happen
    // to have fields of the same name, those fields MUST be the same type.
    // See:
    // - https://github.com/graphql/graphql-js/issues/1361
    // - https://stackoverflow.com/questions/44170603/graphql-using-same-field-names-in-different-types-within-union
    //
    // So what we do is inline all the custom scalar paths of all union members knowing
    // that they could never conflict.
    code(`const ${type.name} = {`)
    for (const memberType of type.getTypes()) {
      if (Nodes.$Schema.CustomScalars.isHasCustomScalars(memberType)) {
        code(`...${memberType.name},`)
      }
    }
    code(`}`)
  },
)

const InterfaceType = createCodeGenerator<
  { type: Nodes.$Schema.GraphQLInterfaceType }
>(
  ({ code, type, config }) => {
    const implementorTypes = Nodes.$Schema.KindMap.getInterfaceImplementors(config.schema.typeMapByKind, type)
    code(`const ${type.name} = {`)
    for (const implementorType of implementorTypes) {
      if (Nodes.$Schema.CustomScalars.isHasCustomScalars(implementorType)) {
        code(`...${implementorType.name},`)
      }
    }
    code(`}`)
  },
)

const ObjectType = createCodeGenerator<{ type: Nodes.$Schema.GraphQLObjectType }>(
  ({ code, type }) => {
    code(`const ${type.name} = {`)

    const fields = Object.values(type.getFields()).filter(Nodes.$Schema.CustomScalars.isHasCustomScalars)
    for (const field of fields) {
      code(Code.termField(field.name, `{`, { comma: false }))

      // Field Arguments
      const args = field.args.filter(Nodes.$Schema.CustomScalars.isHasCustomScalarInputs)
      if (args.length > 0) {
        code(Code.termField(`i`, `{`, { comma: false }))
        for (const arg of args) {
          const argType = Nodes.getNamedType(arg.type)
          if (Nodes.$Schema.isScalarTypeAndCustom(argType)) {
            code(Code.termField(arg.name, `${identifiers.$CustomScalars}.${argType.name}.codec`))
          } else if (Nodes.$Schema.isInputObjectType(argType)) {
            code(Code.termField(arg.name, argType.name))
          } else {
            throw new Error(`Failed to complete index for argument ${arg.name} of ${argType.toString()}`)
          }
        }
        code(`},`)
      }

      const fieldType = Nodes.getNamedType(field.type)

      if (Nodes.$Schema.CustomScalars.isHasCustomScalars(fieldType)) {
        if (Nodes.$Schema.isScalarTypeAndCustom(fieldType)) {
          code(Code.termField(`o`, `${identifiers.$CustomScalars}.${fieldType.name}.codec`))
        } else if (
          Nodes.$Schema.isUnionType(fieldType) || Nodes.$Schema.isObjectType(fieldType)
          || Nodes.$Schema.isInterfaceType(fieldType)
        ) {
          code(Code.termField(`r`, fieldType.name))
          // // todo make kitchen sink schema have a pattern where this code path will be traversed.
          // // We just need to have arguments on a field on a nested object.
          // // Nested objects that in turn have custom scalar arguments
          // if (Nodes.$Schema.isObjectType(fieldType) && Nodes.$Schema.isHasCustomScalars(fieldType)) {
          //   code(Code.termField(field.name, fieldType.name))
          // }
        }
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
      } else if (Nodes.$Schema.isInputObjectType(type) && Nodes.$Schema.CustomScalars.isHasCustomScalarInputs(type)) {
        code(Code.termField(field.name, type.name))
      }
    }

    code(`}`)
  },
)

const kindRenders = {
  GraphQLUnionType: UnionType,
  GraphQLInterfaceType: InterfaceType,
  GraphQLInputObjectType: InputObjectType,
  GraphQLObjectType: ObjectType,
  GraphQLRootType: ObjectType,
}
