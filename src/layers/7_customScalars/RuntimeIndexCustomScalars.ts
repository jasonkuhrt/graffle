// todo we are going to run into recursion with input types such as two input
// objects each having their own custom scalars and also referencing one another.
// to solve this we'll need to either use thunks or some kind of indirect look up table?
import { Code } from '../../lib/Code.js'
import { Grafaid } from '../../lib/grafaid/__.js'
import { entries } from '../../lib/prelude.js'
import { ModuleGeneratorScalar } from '../4_generator/generators/Scalar.js'
import { createModuleGenerator } from '../4_generator/helpers/moduleGenerator.js'
import { createCodeGenerator } from '../4_generator/helpers/moduleGeneratorRunner.js'
import { title1 } from '../4_generator/helpers/render.js'

const identifiers = {
  $CustomScalars: `CustomScalars`,
}

export const ModuleGeneratorRuntimeCustomScalars = createModuleGenerator(
  `RuntimeCustomScalars`,
  ({ config, code }) => {
    code(`import * as ${identifiers.$CustomScalars} from './${ModuleGeneratorScalar.name}.js'`)

    // dprint-ignore
    const kindsFiltered = {
      GraphQLInputObjectType: config.schema.typeMapByKind.GraphQLInputObjectType.filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLObjectType: config.schema.typeMapByKind.GraphQLObjectType.filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLInterfaceType: config.schema.typeMapByKind.GraphQLInterfaceType.filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLUnionType: config.schema.typeMapByKind.GraphQLUnionType.filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars),
      GraphQLRootType: config.schema.typeMapByKind.GraphQLRootType.filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars),
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
  { type: Grafaid.Nodes.$Schema.GraphQLUnionType }
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
      if (Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars(memberType)) {
        code(`...${memberType.name},`)
      }
    }
    code(`}`)
  },
)

const InterfaceType = createCodeGenerator<
  { type: Grafaid.Nodes.$Schema.GraphQLInterfaceType }
>(
  ({ code, type, config }) => {
    const implementorTypes = Grafaid.Nodes.$Schema.KindMap.getInterfaceImplementors(config.schema.typeMapByKind, type)
    code(`const ${type.name} = {`)
    for (const implementorType of implementorTypes) {
      if (Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars(implementorType)) {
        code(`...${implementorType.name},`)
      }
    }
    code(`}`)
  },
)

const ObjectType = createCodeGenerator<{ type: Grafaid.Nodes.$Schema.GraphQLObjectType }>(
  ({ code, type }) => {
    code(`const ${type.name} = {`)

    const fields = Object.values(type.getFields()).filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars)
    for (const field of fields) {
      code(Code.termField(field.name, `{`, { comma: false }))

      // Field Arguments
      const args = field.args.filter(Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalarInputs)
      if (args.length > 0) {
        code(Code.termField(`i`, `{`, { comma: false }))
        for (const arg of args) {
          const argType = Grafaid.Nodes.getNamedType(arg.type)
          if (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(argType)) {
            code(Code.termField(arg.name, `${identifiers.$CustomScalars}.${argType.name}.codec`))
          } else if (Grafaid.Nodes.$Schema.isInputObjectType(argType)) {
            code(Code.termField(arg.name, argType.name))
          } else {
            throw new Error(`Failed to complete index for argument ${arg.name} of ${argType.toString()}`)
          }
        }
        code(`},`)
      }

      const fieldType = Grafaid.Nodes.getNamedType(field.type)

      if (Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars(fieldType)) {
        if (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(fieldType)) {
          code(Code.termField(`o`, `${identifiers.$CustomScalars}.${fieldType.name}.codec`))
        } else if (
          Grafaid.Nodes.$Schema.isUnionType(fieldType) || Grafaid.Nodes.$Schema.isObjectType(fieldType)
          || Grafaid.Nodes.$Schema.isInterfaceType(fieldType)
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

const InputObjectType = createCodeGenerator<{ type: Grafaid.Nodes.$Schema.GraphQLInputObjectType }>(
  ({ code, type }) => {
    code(`const ${type.name} = {`)

    for (const field of Object.values(type.getFields())) {
      const type = Grafaid.Nodes.getNamedType(field.type)
      if (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(type)) {
        code(Code.termField(field.name, `${identifiers.$CustomScalars}.${type.name}.codec`))
      } else if (
        Grafaid.Nodes.$Schema.isInputObjectType(type)
        && Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalarInputs(type)
      ) {
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
