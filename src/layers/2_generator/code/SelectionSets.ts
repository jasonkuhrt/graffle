// todo: generate in JSDoc how the feature maps to GQL syntax.
// todo: on union fields, JSDoc that mentions the syntax `on*`

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
import {
  analyzeArgsNullability,
  getNodeNameAndKind,
  hasCustomScalars,
  isCustomScalarType,
  RootTypeName,
  StandardScalarTypeTypeScriptMapping,
} from '../../../lib/graphql.js'
import type { StandardScalarTypeNames } from '../../../lib/graphql.js'
import { entries } from '../../../lib/prelude.js'
import { createCodeGenerator, createModuleGenerator } from '../createCodeGenerator.js'
import {
  getDocumentation,
  getInterfaceImplementors,
  renderDocumentation,
  renderName,
  title1,
  typeTitle2SelectionSet,
} from '../helpers.js'
import { moduleNameScalar } from './Scalar.js'

export const fragmentOnPolymorphicTypePropertyPrefix = `___on_`

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

    code.push(`import type { SelectionSet as $SelectionSet } from '${config.libraryPaths.schema}'`)
    code.push(`import type * as $Utilities from '${config.libraryPaths.utilitiesForGenerated}'`)
    if (hasCustomScalars(config.typeMapByKind)) {
      code.push(`import type * as $Scalar from './${moduleNameScalar}.js'`)
    }
    code.push(``)

    entries(config.typeMapByKind).forEach(([kind, nodes]) => {
      if (kind === `GraphQLScalarType`) return
      if (kind === `GraphQLScalarTypeCustom`) return // todo
      if (kind === `GraphQLScalarTypeStandard`) return // todo

      code.push(title1(`${kind} Types`))
      code.push(``)

      nodes.forEach(node => {
        code.push(kindRenderLookup[kind]({ config, node: node as never }))
        code.push(``)
        code.push(`type __${renderName(node)} = ${renderName(node)} // [1]`)
        code.push(``)
      })
    })

    // console.log(code.join(`\n`))
  },
)

const renderUnion = createCodeGenerator<{ node: GraphQLUnionType }>(
  ({ config, node, code }) => {
    const doc = renderDocumentation(config, node)
    code.push(doc)

    const memberTypes = node.getTypes()
    // todo: consider prefix of on_
    /**
     * @remarks It is tempting to capitalize type name so that a type name like `foobar`
     * becomes `onFoobar` instead of `onfoorbar`. However, if we capitalize it means more
     * type-level (template literal) complexity in the ResultSet inference to correctly map
     * the capitalized case back to the actually lowercase name.
     */
    code.push(`
      export interface ${renderName(node)} {
        ${
      memberTypes.map((type) => `${fragmentOnPolymorphicTypePropertyPrefix}${type.name}?: ${renderName(type)}`).join(
        `\n`,
      )
    }
        ${Helpers.inlineFragment(node)}
        ${Helpers.__typename(`union`)}
      }
    `)
  },
)

const renderEnum = createCodeGenerator<{ node: GraphQLEnumType }>(
  ({ config, node, code }) => {
    const doc = renderDocumentation(config, node)
    code.push(doc)

    const values = Object.values(node.getValues())
    code.push(Helpers.type(renderName(node), values.map((value) => Code.quote(value.name)).join(` | `)))
  },
)

const renderInputObject = createCodeGenerator<{ node: GraphQLInputObjectType }>(
  ({ config, node, code }) => {
    const doc = renderDocumentation(config, node)
    code.push(doc)

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
    const onTypesRendered = implementorTypes.map(type =>
      Helpers.outputField(`${fragmentOnPolymorphicTypePropertyPrefix}${type.name}`, renderName(type))
    ).join(
      ` \n `,
    )

    code.push(``)
    code.push(`// --------------`)
    code.push(`// Interface Type ${node.name}`)
    code.push(`// --------------`)
    code.push(``)

    const doc = renderDocumentation(config, node)
    code.push(doc)

    code.push(`
      export interface ${renderName(node)} extends $SelectionSet.Bases.ObjectLike {
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

    code.push(typeTitle2SelectionSet(node))
    code.push(``)

    code.push(`// ----------------------------------------| Entrypoint Interface |`)
    code.push(``)

    const propertiesRendered = fields.map(field => {
      const nodeWhat = getNodeNameAndKind(getNamedType(field.type))
      const type = nodeWhat.kind === `Scalar` ? `\`${nodeWhat.name}\` (a \`Scalar\`)` : nodeWhat.kind
      const doc = Code.TSDoc(`
        Select the \`${field.name}\` field on the \`${node.name}\` object. Its type is ${type}.
      `)
      const propertyRendered = Helpers.outputFieldAlisable(field.name, `${renderName(node)}.${renderName(field)}`)
      return doc + `\n` + propertyRendered
    }).join(`\n`)

    const isRootType = node.name in RootTypeName
    const extendsClause = isRootType ? `` : `extends $SelectionSet.Bases.ObjectLike`

    const doc = renderDocumentation(config, node)
    code.push(doc)

    code.push(`
      export interface ${renderName(node)} ${extendsClause} {
        ${propertiesRendered}
        ${Helpers.inlineFragment(node)}
        ${Helpers.__typename(`object`)}
      }
    `)
    code.push(``)

    code.push(`// ----------------------------------------| Fields Interfaces |`)
    code.push(``)

    code.push(`
      export namespace ${renderName(node)} {
        ${fields.map((field) => renderField({ config, field })).join(`\n`)}
      }
    `)
    code.push(``)
  },
)

const kindRenderLookup = {
  GraphQLInputObjectType: renderInputObject,
  GraphQLRootType: renderObject,
  GraphQLObjectType: renderObject,
  GraphQLEnumType: renderEnum,
  GraphQLInterfaceType: renderInterface,
  GraphQLUnionType: renderUnion,
}

const renderField = createCodeGenerator<{ field: GraphQLField<any, any> }>(
  ({ config, field, code }) => {
    const namedType = getNamedType(field.type)
    const nameRendered = renderName(field)

    // code.push(``)
    // code.push(`// -- .${nameRendered} --`)
    // code.push(``)

    if (isScalarType(namedType) || isEnumType(namedType)) {
      const argsAnalysis = analyzeArgsNullability(field.args)
      const argsRendered = renderFieldArgs({ config, field })
      if (argsAnalysis.hasAny) {
        if (argsAnalysis.isAllNullable) {
          code.push(
            `type ${nameRendered}SelectionSet = $Utilities.Simplify<$SelectionSet.Bases.Base & { ${argsRendered} }>`,
          )
          code.push(``)
          code.push(
            Helpers.type(
              `${nameRendered}$Expanded`,
              `$Utilities.UnionExpanded<$SelectionSet.ClientIndicator | ${nameRendered}SelectionSet>`,
            ),
          )
          code.push(``)
          code.push(
            Helpers.type(nameRendered, `$SelectionSet.ClientIndicator | ${nameRendered}SelectionSet`),
          )
          code.push(``)
        } else {
          // todo test that a directive can be passed with the intersection that otherwise cannot be.
          code.push(Helpers.$interface(nameRendered, `$SelectionSet.Bases.Base`, argsRendered))
          code.push(``)
          code.push(Helpers.type(`${nameRendered}$Expanded`, nameRendered))
          code.push(``)
        }
      } else {
        code.push(Helpers.type(`${nameRendered}$Expanded`, `$SelectionSet.NoArgsIndicator$Expanded`))
        code.push(``)
        code.push(Helpers.type(nameRendered, `$SelectionSet.NoArgsIndicator`))
        code.push(``)
      }
    } else {
      const argsRendered = renderFieldArgs({ config, field })
      const sigRendered = `export interface ${nameRendered} extends __${renderName(namedType)}`
      code.push(`${sigRendered} {${argsRendered ? `\n${argsRendered}\n` : ``}}`)
      code.push(`export type ${nameRendered}$Expanded = ${nameRendered}`)
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
    code.push(`${arg.name}${Helpers.propOpt(arg.type)}: ${typeRendered}`)
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
    if (isCustomScalarType(sansNullabilityType)) {
      const scalarTypeRendered = `$Scalar.${sansNullabilityType.name}Decoded`
      return `${scalarTypeRendered} ${nullableRendered}`
    }
    const scalarTypeRendered = StandardScalarTypeTypeScriptMapping[sansNullabilityType.name as StandardScalarTypeNames]
    return `${scalarTypeRendered} ${nullableRendered}`
  }

  return `${renderName(sansNullabilityType)} ${nullableRendered}`
}

namespace Helpers {
  export const propOpt = (type: GraphQLType) => {
    return isNullableType(type) ? `?` : ``
  }
  export const maybeList = (type: string) => {
    return `${type} | Array<${type}>`
  }
  export const $interface = (name: string, extendsClause: string | null, fields: string) => {
    return `export interface ${name} ${extendsClause ? ` extends ${extendsClause}` : ``} { ${fields} }`
  }
  export const type = (name: string, type: string) => {
    return `export type ${name} = ${type}`
  }

  export const outputField = (name: string, type: string) => {
    return `${name}?: ${type}`
  }

  export const outputFieldAlisable = (name: string, type: string, aliasable: boolean = true) => {
    const alias = aliasable ? `| $SelectionSet.Alias<${type}>` : ``
    return `${name}?: ${type}$Expanded${alias}`
  }

  export const __typename = (kind: 'union' | 'interface' | 'object') => {
    return `
      ${__typenameDoc(kind)}
      ${outputFieldAlisable(`__typename`, `$SelectionSet.NoArgsIndicator`)}
    `
  }

  export const inlineFragment = (node: GraphQLObjectType | GraphQLUnionType | GraphQLInterfaceType) => {
    const doc = Code.TSDoc(`
      Inline fragments for field groups. 
     
      Generally a niche feature. This can be useful for example to apply an \`@include\` directive to a subset of the
      selection set allowing a variable to opt-in or not to that part of the selection.
       
      @see https://spec.graphql.org/draft/#sec-Inline-Fragments
    `)

    return `
      ${doc}
      ___?: ${renderName(node)} | ${renderName(node)}[]
    `
  }

  const __typenameDoc = (kind: 'union' | 'interface' | 'object') => {
    const see = `@see https://graphql.org/learn/queries/#meta-fields`
    if (kind === `object`) {
      return Code.TSDoc(`
        A meta field. Is the name of the type being selected.
          
        ${see}
      `)
    }

    const relation = kind === `interface` ? `implementor` : `member`
    return Code.TSDoc(`
       A meta field. Is the name of the type being selected. Since this is a ${kind} type and thus polymorphic,
       the name is one of the ${relation} type names, whichever is ultimately returned at runtime.
       
       ${see}
    `)
  }
}
