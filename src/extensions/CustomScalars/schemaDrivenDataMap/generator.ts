import type { Config } from '../../../layers/4_generator/config/config.js'
import { ModuleGeneratorScalar } from '../../../layers/4_generator/generators/Scalar.js'
import { createModuleGenerator } from '../../../layers/4_generator/helpers/moduleGenerator.js'
import { createCodeGenerator } from '../../../layers/4_generator/helpers/moduleGeneratorRunner.js'
import { title1 } from '../../../layers/4_generator/helpers/render.js'
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import { entries } from '../../../lib/prelude.js'
import { nullabilityFlags, propertyNames } from './types.js'

const identifiers = {
  $Scalar: `$Scalar`,
}

type ReferenceAssignments = string[]

export const ModuleGeneratorSchemaDrivenDataMap = createModuleGenerator(
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
    code(`const $schemaDrivenDataMap: $Utilities.SchemaDrivenDataMap =`)
    code(Code.termObject({
      roots: Code.directiveTermObject({
        $literal: kinds.GraphQLRootType.map(type => type.name + `,`).join(`\n`),
      }),
      directives: `{}`,
      types: Code.directiveTermObject({
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
    code()
    code(`export { $schemaDrivenDataMap as schemaDrivenDataMap }`)
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
  const { schema: { kindMap } } = config
  const condition = typeCondition(config)
  return {
    // When "variables" enabled, we need to know all named types to be able to write them out.
    GraphQLScalarTypeStandard: kindMap.GraphQLScalarTypeStandard.filter(() =>
      config.runtimeFeatures.operationVariables
    ),
    GraphQLScalarTypeCustom: kindMap.GraphQLScalarTypeCustom.filter(() => config.runtimeFeatures.customScalars),
    GraphQLEnumType: kindMap.GraphQLEnumType.filter(() => config.runtimeFeatures.operationVariables),
    GraphQLInputObjectType: kindMap.GraphQLInputObjectType.filter(condition),
    GraphQLObjectType: kindMap.GraphQLObjectType.filter(condition),
    GraphQLInterfaceType: kindMap.GraphQLInterfaceType.filter(condition),
    GraphQLUnionType: kindMap.GraphQLUnionType.filter(condition),
    GraphQLRootType: kindMap.GraphQLRootType.filter(condition),
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
  { type: Grafaid.Schema.ScalarType }
>(
  ({ code, type }) => {
    code(Code.termConst(type.name, `${identifiers.$Scalar}.${type.name}`))
  },
)

const UnionType = createCodeGenerator<
  { type: Grafaid.Schema.UnionType; referenceAssignments: ReferenceAssignments }
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
        [propertyNames.f]: Code.directiveTermObject({
          $spread: type.getTypes().filter(Grafaid.Schema.CustomScalars.isHasCustomScalars).map(memberType =>
            memberType.name + `.${propertyNames.f}`
          ),
        }),
      }),
    ))
  },
)

const InterfaceType = createCodeGenerator<
  { type: Grafaid.Schema.InterfaceType; referenceAssignments: ReferenceAssignments }
>(
  ({ code, type, config }) => {
    const implementorTypes = Grafaid.Schema.KindMap.getInterfaceImplementors(config.schema.kindMap, type)
    code(Code.termConstTyped(
      type.name,
      `$Utilities.SchemaDrivenDataMap.OutputObject`,
      Code.termObject({
        [propertyNames.f]: Code.directiveTermObject({
          $spread: implementorTypes.filter(Grafaid.Schema.CustomScalars.isHasCustomScalars).map(memberType =>
            memberType.name + `.${propertyNames.f}`
          ),
        }),
      }),
    ))
  },
)

const ObjectType = createCodeGenerator<
  { type: Grafaid.Schema.ObjectType; referenceAssignments: ReferenceAssignments }
>(
  ({ config, code, type, referenceAssignments }) => {
    const o: Code.TermObject = {}

    config.extensions.forEach(_ => {
      _.schemaDrivenDataMap?.onObjectType?.({
        config,
        sddmNode: o,
        graphqlType: type,
      })
    })

    // Fields of this object.
    // ---------------------
    const of: Code.TermObject = {}
    o[propertyNames.f] = of

    const condition = typeCondition(config)

    const outputFields = Object.values(type.getFields()).filter(condition)
    for (const outputField of outputFields) {
      const outputFieldNamedType = Grafaid.Schema.getNamedType(outputField.type)
      const sddmNodeOutputField: Code.DirectiveTermObjectLike<Code.TermObject> = {
        $fields: {},
      }
      of[outputField.name] = sddmNodeOutputField

      // Field Arguments
      const inputCondition = inputTypeCondition(config)
      const args = outputField.args.filter(inputCondition)
      if (args.length > 0) {
        const ofItemAs: Code.TermObject = {}
        sddmNodeOutputField.$fields[propertyNames.a] = ofItemAs

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

      config.extensions.forEach(_ => {
        _.schemaDrivenDataMap?.onOutputField?.({
          config,
          sddmNode: sddmNodeOutputField,
          graphqlType: outputField,
        })
      })

      if (condition(outputFieldNamedType)) {
        if (Grafaid.Schema.isScalarTypeAndCustom(outputFieldNamedType)) {
          if (config.runtimeFeatures.customScalars) {
            sddmNodeOutputField.$fields[propertyNames.nt] = outputFieldNamedType.name
          }
        } else if (
          Grafaid.Schema.isUnionType(outputFieldNamedType) || Grafaid.Schema.isObjectType(outputFieldNamedType)
          || Grafaid.Schema.isInterfaceType(outputFieldNamedType)
        ) {
          referenceAssignments.push(`${type.name}.f[\`${outputField.name}\`]!.nt = ${outputFieldNamedType.name}`)
          // dprint-ignore
          sddmNodeOutputField.$literal = `// ${Code.termField(propertyNames.nt, outputFieldNamedType.name)} <-- Assigned later to avoid potential circular dependency.`
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
  { type: Grafaid.Schema.EnumType; referenceAssignments: ReferenceAssignments }
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
  { type: Grafaid.Schema.ObjectType; referenceAssignments: ReferenceAssignments }
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
    const f: Code.TermObjectOf<Code.DirectiveTermObjectLike<Code.TermObject>> = {}
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
          `${type.name}.${propertyNames.f}![\`${inputField.name}\`]!.${propertyNames.nt} = ${inputFieldType.name}`,
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
  GraphQLScalarTypeStandard: ScalarType,
  GraphQLScalarTypeCustom: ScalarType,
  GraphQLEnumType: EnumType,
  GraphQLUnionType: UnionType,
  GraphQLInterfaceType: InterfaceType,
  GraphQLInputObjectType: InputObjectType,
  GraphQLObjectType: ObjectType,
  GraphQLRootType: ObjectType,
}

const inlineType = (type: Grafaid.Schema.InputTypes): string => {
  const [ofType, nonNull] = Grafaid.Schema.isNonNullType(type)
    ? [type.ofType, true]
    : [type, false]

  const nullFlag = nonNull
    ? nullabilityFlags.nonNull
    : nullabilityFlags.nullable

  const rest = Grafaid.Schema.isListType(ofType)
    ? inlineType(ofType.ofType)
    : ``

  return `[${nullFlag.toString()}, ${rest}]`
}
