// todo: generate in JSDoc how the feature maps to GQL syntax.
// on union fields, JSDoc that mentions the syntax `on*`

import type { GraphQLEnumType, GraphQLInterfaceType, GraphQLUnionType } from 'graphql'
import {
  getNullableType,
  type GraphQLArgument,
  type GraphQLField,
  type GraphQLInputField,
  type GraphQLInputObjectType,
  type GraphQLObjectType,
  type GraphQLType,
  isEnumType,
  isListType,
} from 'graphql'
import { getNamedType, isNullableType, isScalarType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { analyzeArgsNullability, RootTypeName, StandardScalarTypeTypeScriptMapping } from '../../../lib/graphql.js'
import type { StandardScalarTypeNames } from '../../../lib/graphql.js'
import { entries } from '../../../lib/prelude.js'
import { createCodeGenerator, createModuleGenerator } from '../createCodeGenerator.js'
import { getDocumentation, getInterfaceImplementors, renderDocumentation, renderName, title } from '../helpers.js'

export const { moduleName: moduleNameSelectionSets, generate: generateSelectionSets } = createModuleGenerator(
  `SelectionSets`,
  ({ config, code }) => {
    code.push(`
      /**
       * [1] This type alias serves to allow field selection interfaces to extend their respective object type without
       *     name clashing between the field name and the object name.
       * 
       *     For example imagine \`Query.Foo\` field with type also called \`Foo\`. Our generated interfaces for each field
       *     would end up with an error of \`export interface Foo extends Foo ...\`
       */
    `)
    code.push(``)

    code.push(`import type { SelectionSet } from '${config.libraryPaths.schema}';`)
    code.push(``)

    entries(config.typeMapByKind).forEach(([kind, nodes]) => {
      if (kind === `GraphQLScalarType`) return
      if (kind === `GraphQLScalarTypeCustom`) return // todo
      if (kind === `GraphQLScalarTypeStandard`) return // todo

      code.push(title(`${kind} Types`))
      code.push(``)

      nodes.forEach(node => {
        const doc = renderDocumentation(config, node as never)
        code.push(doc)
        code.push(renderLookup[kind]({ config, node: node as never }))
        code.push(``)
        code.push(`type __${renderName(node)} = ${renderName(node)} // [1]`)
        code.push(``)
      })
    })

    // console.log(code.join(`\n`))
  },
)

const renderUnion = createCodeGenerator<{ node: GraphQLUnionType }>(
  ({ node, code }) => {
    const memberTypes = node.getTypes()
    /**
     * @remarks It is tempting to capitalize type name so that a type name like `foobar`
     * becomes `onFoobar` instead of `onfoorbar`. However, if we capitalize it means more
     * type-level (template literal) complexity in the ResultSet inference to correctly map
     * the capitalized case back to the actually lowercase name.
     */
    code.push(`
      export interface ${renderName(node)} {
        ${memberTypes.map((type) => `on${type.name}?: ${renderName(type)}`).join(`\n`)}
        ${Helpers.inlineFragment(node)}
        ${Helpers.__typename(`union`)}
      }
    `)
  },
)

const renderEnum = createCodeGenerator<{ node: GraphQLEnumType }>(
  ({ node, code }) => {
    const values = Object.values(node.getValues())
    code.push(Helpers.type(renderName(node), values.map((value) => Code.quote(value.name)).join(` | `)))
  },
)

const renderInputObject = createCodeGenerator<{ node: GraphQLInputObjectType }>(
  ({ config, node, code }) => {
    const fields = Object.values(node.getFields())
    code.push(`
      export interface ${renderName(node)} {
        ${fields.map((field) => renderArgLike({ config, arg: field })).join(`\n`)}
      }
    `)
  },
)

const renderInterface = createCodeGenerator<{ node: GraphQLInterfaceType }>(
  ({ config, node, code }) => {
    const fields = Object.values(node.getFields())
    const fieldsRendered = fields.map(field => {
      return Helpers.outputField(field.name, `${renderName(node)}.${renderName(field)}`)
    }).join(`\n`)
    const implementorTypes = getInterfaceImplementors(config.typeMapByKind, node)
    const onTypesRendered = implementorTypes.map(type => Helpers.outputField(`on${type.name}`, renderName(type))).join(
      ` \n `,
    )
    code.push(`
      export interface ${renderName(node)} extends SelectionSet.Bases.ObjectLike {
        ${fieldsRendered}
        ${onTypesRendered}
        ${Helpers.inlineFragment(node)}
        ${Helpers.__typename(`interface`)}
      }
    `)
    code.push(``)

    code.push(`
      export namespace ${renderName(node)} {
        ${fields.map((field) => renderField({ config, field })).join(`\n`)}
      }
    `)
    code.push(``)
  },
)

const renderObject = createCodeGenerator<{ node: GraphQLObjectType }>(
  ({ config, node, code }) => {
    const fields = Object.values(node.getFields())

    const fieldSelectorsRendered = fields.map(field => {
      return Helpers.outputField(field.name, `${renderName(node)}.${renderName(field)}`)
    }).join(`\n`)

    const isRootType = node.name in RootTypeName
    const extendsClause = isRootType ? `` : `extends SelectionSet.Bases.ObjectLike`

    code.push(`
      export interface ${renderName(node)} ${extendsClause} {
        ${fieldSelectorsRendered}
        ${Helpers.inlineFragment(node)}
        ${Helpers.__typename(`object`)}
      }
    `)
    code.push(``)

    code.push(`
      export namespace ${renderName(node)} {
        ${fields.map((field) => renderField({ config, field })).join(`\n`)}
      }
    `)
    code.push(``)
  },
)

const renderField = createCodeGenerator<{ field: GraphQLField<any, any> }>(
  ({ config, field, code }) => {
    const namedType = getNamedType(field.type)

    if (isScalarType(namedType) || isEnumType(namedType)) {
      const argsAnalysis = analyzeArgsNullability(field.args)
      const argsRendered = renderFieldArgs({ config, field })
      if (argsAnalysis.hasAny) {
        const type = argsAnalysis.isAllNullable
          ? `SelectionSet.Bases.Base | { ${argsRendered} }`
          : `{ ${argsRendered} }`
        code.push(Helpers.type(renderName(field), type))
      } else {
        code.push(Helpers.type(renderName(field), `SelectionSet.NoArgsIndicator`))
      }
    } else {
      const argsRendered = renderFieldArgs({ config, field })
      const sigRendered = `export interface ${renderName(field)} extends __${renderName(namedType)}`
      if (argsRendered) {
        code.push(`
          ${sigRendered} {
          ${argsRendered}
        }
      `)
      } else {
        code.push(sigRendered + `{}`)
      }
    }
  },
)

const renderFieldArgs = createCodeGenerator<{ field: GraphQLField<any, any> }>(
  ({ config, field, code }) => {
    const argsAnalysis = analyzeArgsNullability(field.args)
    const argFieldsRendered = field.args.map(arg => {
      return renderArgLike({ config, arg })
    }).join(`\n`)

    if (argsAnalysis.hasAny) {
      const lead = argsAnalysis.isAllNullable
        ? `No arguments`
        : argsAnalysis.required === argsAnalysis.total
        ? `All arguments`
        : `Some (${argsAnalysis.required.toString()}/${argsAnalysis.total.toString()}) arguments`
      const tsDocMessageAboutRequired = argsAnalysis.isAllNullable
        ? `\n * ${lead} are required so you may omit this.`
        : `\n * ${lead} are required so you must include this.`

      code.push(`
        /**
         * Arguments for \`${field.name}\` field.${tsDocMessageAboutRequired}
         */
        $${argsAnalysis.isAllNullable ? `?` : ``}: {
          ${argFieldsRendered}
        }
      `)
    }
  },
)

const renderArgLike = createCodeGenerator<{ arg: GraphQLArgument | GraphQLInputField }>(
  ({ config, arg, code }) => {
    const typeRendered = renderArgType(arg.type)
    const doc = getDocumentation(config, arg)
    code.push(doc)
    code.push(`${arg.name}${renderPropertyOptional(arg.type)}: ${typeRendered}`)
  },
)

const renderArgType = (type: GraphQLType): string => {
  const sansNullabilityType = getNullableType(type)

  const nullableRendered = isNullableType(type) ? `| undefined | null` : ``

  if (isListType(sansNullabilityType)) {
    const innerType = getNullableType(sansNullabilityType.ofType)
    return `Array<${renderArgType(innerType)}> ${nullableRendered}`
  }

  if (isScalarType(sansNullabilityType)) {
    const scalarTypeRendered = StandardScalarTypeTypeScriptMapping[sansNullabilityType.name as StandardScalarTypeNames]
    return `${scalarTypeRendered} ${nullableRendered}`
  }

  return `${renderName(sansNullabilityType)} ${nullableRendered}`
}

const renderPropertyOptional = (type: GraphQLType) => {
  return isNullableType(type) ? `?` : ``
}

const renderLookup = {
  GraphQLInputObjectType: renderInputObject,
  GraphQLRootType: renderObject,
  GraphQLObjectType: renderObject,
  GraphQLEnumType: renderEnum,
  GraphQLInterfaceType: renderInterface,
  GraphQLUnionType: renderUnion,
}

namespace Helpers {
  export const type = (name: string, type: string) => {
    return `export type ${name} = ${type}`
  }

  export const outputField = (name: string, type: string) => {
    return `${name}?: ${type}`
  }

  export const __typenameField = outputField(`__typename`, `SelectionSet.NoArgsIndicator`)

  export const __typenameDoc = (kind: 'union' | 'interface' | 'object') => {
    const see = `@see https://graphql.org/learn/queries/#meta-fields`
    if (kind === `object`) {
      return `
        /**
         * A meta field. Is the name of the type being selected.
         * 
         * ${see}
         */
      `
    }

    const relation = kind === `interface` ? `implementor` : `member`
    return `
      /**
       * A meta field. Is the name of the type being selected. Since this is a ${kind} type and thus polymorphic,
       * the name is one of the ${relation} type names, whichever is ultimately returned at runtime.
       * 
       * ${see}
       */
    `
  }

  export const __typename = (kind: 'union' | 'interface' | 'object') => {
    return `
      ${__typenameDoc(kind)}
      ${__typenameField}
    `
  }

  export const inlineFragment = (node: GraphQLObjectType | GraphQLUnionType | GraphQLInterfaceType) => {
    return `
      /**
       * Inline fragments for field groups. 
       *
       * Generally a niche feature. This can be useful for example to apply an \`@include\` directive to a subset of the
       * selection set allowing a variable to opt-in or not to that part of the selection.
       *
       * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
       */
      ___?: ${renderName(node)} | ${renderName(node)}[]
    `
  }
}
