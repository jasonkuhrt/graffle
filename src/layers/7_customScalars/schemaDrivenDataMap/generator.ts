// todo we are going to run into recursion with input types such as two input
// objects each having their own custom scalars and also referencing one another.
// to solve this we'll need to either use thunks or some kind of indirect look up table?
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import { entries } from '../../../lib/prelude.js'
import type { Config } from '../../4_generator/config.js'
import { ModuleGeneratorScalar } from '../../4_generator/generators/Scalar.js'
import { createModuleGenerator } from '../../4_generator/helpers/moduleGenerator.js'
import { createCodeGenerator } from '../../4_generator/helpers/moduleGeneratorRunner.js'
import { title1 } from '../../4_generator/helpers/render.js'
import { propertyNames, SchemaDrivenDataMap } from './types.js'

const identifiers = {
  $Scalar: `$Scalar`,
}

type ReferenceAssignments = string[]

export const ModuleGeneratorRuntimeSchemaDrivenData = createModuleGenerator(
  `SchemaDrivenDataMap`,
  ({ config, code }) => {
    code(`
      import * as ${identifiers.$Scalar} from './${ModuleGeneratorScalar.name}.js'
      import type * as $Utilities from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'
    `)

    const kinds = getKinds(config)
    const kindsList = entries(kinds)

    const referenceAssignments: ReferenceAssignments = []

    for (const [kindName, nodes] of kindsList) {
      code(title1(kindName))
      code()
      if (nodes.length === 0) {
        code(`// None of your ${kindName}s have custom scalars.`)
      }
      for (const type of nodes) {
        const codeGenerator = kindRenders[kindName] as any
        code(codeGenerator({ config, type: type as any, referenceAssignments }))
        code()
      }
      code()
    }

    code(title1(`Reference Assignments`, `(avoids circular assignment issues)`))
    code()
    if (referenceAssignments.length === 0) {
      code(`// None of your types have references to other non-scalar/enum types.`)
    }
    for (const referenceAssignment of referenceAssignments) {
      code(referenceAssignment)
    }
    code()

    code(title1(`Index`))
    code()
    code(`export const $index: $Utilities.SchemaDrivenDataMap =`)
    code(Code.termObject({
      roots: Code.termObjectWith({
        $literal: kinds.GraphQLRootType.map(type => type.name + `,`).join(`\n`),
      }),
      types: Code.termObjectWith({
        $literal: [
          ...kindsList.map(([, _]) => _).flat().map((_) => _.name),
          // We also include the custom scalars here to facilitate encoding. Encoding has names of variables and
          // that need to be looked up to determine which are/have custom scalars.
          // ...config.schema.typeMapByKind.GraphQLScalarTypeCustom.map(_ => {
          //   return `${_.name}: ${identifiers.$CustomScalars}.${_.name},`
          // }),
        ].join(`,\n`),
      }),
    }))
  },
)

//
//
//
// Helpers
// -------
//
//
//

/**
 * Get minimal kind set for SDDM
 *
 * If feature operationVariables is enabled then we need to emit all paths to inputs.
 * If feature customScalars is enabled then we need to emit all paths to customs scalar inputs AND outputs.
 * If both are enabled the merged requirement is: all paths to inputs AND custom scalar outputs.
 */
const getKinds = (config: Config) => {
  const { schema: { typeMapByKind } } = config
  const condition = typeCondition(config)
  return {
    // When "variables" enabled, we need to know all named types to be able to write them out.
    GraphQLScalarType: typeMapByKind.GraphQLScalarType.filter((n) =>
      config.runtimeFeatures.operationVariables && !Grafaid.Schema.isScalarTypeCustom(n)
    ),
    GraphQLScalarTypeCustom: typeMapByKind.GraphQLScalarTypeCustom.filter(() => config.runtimeFeatures.customScalars),
    GraphQLEnumType: typeMapByKind.GraphQLEnumType.filter(() => config.runtimeFeatures.operationVariables),
    GraphQLInputObjectType: typeMapByKind.GraphQLInputObjectType.filter(condition),
    GraphQLObjectType: typeMapByKind.GraphQLObjectType.filter(condition),
    GraphQLInterfaceType: typeMapByKind.GraphQLInterfaceType.filter(condition),
    GraphQLUnionType: typeMapByKind.GraphQLUnionType.filter(condition),
    GraphQLRootType: typeMapByKind.GraphQLRootType.filter(condition),
  }
}

const typeCondition = (config: Config) => {
  if (config.runtimeFeatures.customScalars) {
    if (config.runtimeFeatures.operationVariables) {
      const isHasInputOrOutputCustomScalar = () => true // todo
      return isHasInputOrOutputCustomScalar
    }
    return Grafaid.Schema.CustomScalars.isHasCustomScalars
  }

  if (config.runtimeFeatures.operationVariables) {
    const isHasInput = () => true // todo
    return isHasInput
  }

  return falseFilter
}

const falseFilter = () => false
const trueFilter = () => true

const inputTypeCondition = (config: Config) => {
  if (config.runtimeFeatures.operationVariables) return trueFilter

  if (config.runtimeFeatures.customScalars) {
    return Grafaid.Schema.CustomScalars.isHasCustomScalars
  }

  return falseFilter
}

//
//
//
// Code Generators
// ---------------
//
//
//
const ScalarType = createCodeGenerator<
  { type: Grafaid.Schema.GraphQLScalarType }
>(
  ({ code, type }) => {
    code(Code.termConst(type.name, `${identifiers.$Scalar}.${type.name}`))
  },
)

const UnionType = createCodeGenerator<
  { type: Grafaid.Schema.GraphQLUnionType; referenceAssignments: ReferenceAssignments }
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
    code(Code.termConstTyped(
      type.name,
      `$Utilities.SchemaDrivenDataMap.OutputObject`,
      Code.termObject({
        [propertyNames.f]: Code.termObjectWith({
          $spread: type.getTypes().filter(Grafaid.Schema.CustomScalars.isHasCustomScalars).map(memberType =>
            memberType.name + `.${propertyNames.f}`
          ),
        }),
      }),
    ))
  },
)

const InterfaceType = createCodeGenerator<
  { type: Grafaid.Schema.GraphQLInterfaceType; referenceAssignments: ReferenceAssignments }
>(
  ({ code, type, config }) => {
    const implementorTypes = Grafaid.Schema.KindMap.getInterfaceImplementors(config.schema.typeMapByKind, type)
    code(Code.termConstTyped(
      type.name,
      `$Utilities.SchemaDrivenDataMap.OutputObject`,
      Code.termObject({
        [propertyNames.f]: Code.termObjectWith({
          $spread: implementorTypes.filter(Grafaid.Schema.CustomScalars.isHasCustomScalars).map(memberType =>
            memberType.name + `.${propertyNames.f}`
          ),
        }),
      }),
    ))
  },
)

const ObjectType = createCodeGenerator<
  { type: Grafaid.Schema.GraphQLObjectType; referenceAssignments: ReferenceAssignments }
>(
  ({ config, code, type, referenceAssignments }) => {
    const of: Code.TermObject = {}
    const o: Code.TermObject = { f: of }

    const condition = typeCondition(config)

    const outputFields = Object.values(type.getFields()).filter(condition)
    for (const outputField of outputFields) {
      const ofItem: Code.TermObjectWithLike<Code.TermObject> = {
        $fields: {},
      }
      of[outputField.name] = ofItem

      // Field Arguments
      const inputCondition = inputTypeCondition(config)
      const args = outputField.args.filter(inputCondition)
      if (args.length > 0) {
        const ofItemAs: Code.TermObject = {}
        ofItem.$fields[propertyNames.a] = ofItemAs

        for (const arg of args) {
          const ofItemA: Code.TermObject = {}
          ofItemAs[arg.name] = ofItemA

          const argType = Grafaid.Schema.getNamedType(arg.type)
          // dprint-ignore
          if (
             (config.runtimeFeatures.customScalars && Grafaid.Schema.isScalarTypeAndCustom(argType)) ||
             // For variables, we need to know the variable type to write it out, so we always need the named type.
             (config.runtimeFeatures.operationVariables)
          ) {
              ofItemA[propertyNames.nt] = argType.name
              // For variables, we need to know the variable type to write it out, so we always need the inline type.
              if (config.runtimeFeatures.operationVariables) {
                ofItemA[propertyNames.it] = inlineType(arg.type)
              }
            }
        }
      }

      const outputFieldType = Grafaid.Schema.getNamedType(outputField.type)

      if (condition(outputFieldType)) {
        if (Grafaid.Schema.isScalarTypeAndCustom(outputFieldType)) {
          if (config.runtimeFeatures.customScalars) {
            ofItem.$fields[propertyNames.nt] = outputFieldType.name
          }
        } else if (
          Grafaid.Schema.isUnionType(outputFieldType) || Grafaid.Schema.isObjectType(outputFieldType)
          || Grafaid.Schema.isInterfaceType(outputFieldType)
        ) {
          referenceAssignments.push(`${type.name}.f['${outputField.name}']!.nt = ${outputFieldType.name}`)
          // dprint-ignore
          ofItem.$literal = `// ${Code.termField(propertyNames.nt, outputFieldType.name)} <-- Assigned later to avoid potential circular dependency.`
          // // todo make kitchen sink schema have a pattern where this code path will be traversed.
          // // We just need to have arguments on a field on a nested object.
          // // Nested objects that in turn have custom scalar arguments
          // if (Schema.isObjectType(fieldType) && Schema.isHasCustomScalars(fieldType)) {
          //   code(Code.termField(field.name, fieldType.name))
          // }
        }
      }
    }

    code(Code.termConstTyped(type.name, `$Utilities.SchemaDrivenDataMap.OutputObject`, Code.termObject(o)))
  },
)

const EnumType = createCodeGenerator<
  { type: Grafaid.Schema.GraphQLEnumType; referenceAssignments: ReferenceAssignments }
>(
  ({ code, type }) => {
    code(Code.termConstTyped(
      type.name,
      `$Utilities.SchemaDrivenDataMap.Enum`,
      Code.termObject({
        [propertyNames.k]: Code.string(`enum`),
        [propertyNames.n]: Code.string(type.name),
      }),
    ))
  },
)

const InputObjectType = createCodeGenerator<
  { type: Grafaid.Schema.GraphQLInputObjectType; referenceAssignments: ReferenceAssignments }
>(
  ({ config, code, type, referenceAssignments }) => {
    const o: Code.TermObject = {}

    const inputFields = Object.values(type.getFields())

    if (config.runtimeFeatures.operationVariables) {
      o[propertyNames.n] = Code.string(type.name)
      const customScalarFields = inputFields
        .filter(Grafaid.Schema.CustomScalars.isHasCustomScalarInputs)
        .map(inputField => inputField.name)
        .map(Code.string)
      if (customScalarFields.length) {
        o[propertyNames.fcs] = Code.termList(customScalarFields)
      }
    }
    const f: Code.TermObjectOf<Code.TermObjectWithLike<Code.TermObject>> = {}
    o[propertyNames.f] = f

    for (const inputField of inputFields) {
      const inputFieldType = Grafaid.Schema.getNamedType(inputField.type)

      // dprint-ignore
      const isPresent =
        config.runtimeFeatures.operationVariables ||
        (config.runtimeFeatures.customScalars &&
          (Grafaid.Schema.isScalarTypeAndCustom(inputFieldType) ||
          (Grafaid.Schema.isInputObjectType(inputFieldType) && Grafaid.Schema.CustomScalars.isHasCustomScalarInputs(inputFieldType))))

      if (!isPresent) continue

      f[inputField.name] = {
        $fields: {},
      }

      if (Grafaid.Schema.isScalarTypeAndCustom(inputFieldType)) {
        f[inputField.name]!.$fields[propertyNames.nt] = inputFieldType.name
      } else if (
        Grafaid.Schema.isInputObjectType(inputFieldType)
        && Grafaid.Schema.CustomScalars.isHasCustomScalarInputs(inputFieldType)
      ) {
        referenceAssignments.push(
          `${type.name}.${propertyNames.f}!['${inputField.name}']!.${propertyNames.nt} = ${inputFieldType.name}`,
        )
        f[inputField.name]!.$literal = `// ${
          Code.termField(propertyNames.nt, inputFieldType.name)
        } <-- Assigned later to avoid potential circular dependency.`
      }
    }

    code(Code.termConstTyped(type.name, `$Utilities.SchemaDrivenDataMap.InputObject`, Code.termObject(o)))
  },
)

const kindRenders = {
  GraphQLScalarType: ScalarType,
  GraphQLScalarTypeCustom: ScalarType,
  GraphQLEnumType: EnumType,
  GraphQLUnionType: UnionType,
  GraphQLInterfaceType: InterfaceType,
  GraphQLInputObjectType: InputObjectType,
  GraphQLObjectType: ObjectType,
  GraphQLRootType: ObjectType,
}

const inlineType = (type: Grafaid.Schema.GraphQLInputType): string => {
  const [ofType, nonNull] = Grafaid.Schema.isNonNullType(type)
    ? [type.ofType, true]
    : [type, false]

  const nullFlag = nonNull
    ? SchemaDrivenDataMap.nullabilityFlags.nonNull
    : SchemaDrivenDataMap.nullabilityFlags.nullable

  const rest = Grafaid.Schema.isListType(ofType)
    ? inlineType(ofType.ofType)
    : ``

  return `[${nullFlag.toString()}, ${rest}]`
}
