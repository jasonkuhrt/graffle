import { RootTypeName } from '../../lib/graphql.js'
import { assertArray, assertObject, entriesStrict, lowerCaseFirstLetter } from '../../lib/prelude.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { Config } from '../6_client/Settings/Config.js'
import type { Indicator } from './_indicator.js'
import { Directive } from './Directive/__.js'
import { SpecialKeyPrefixes } from './helpers.js'
import { isIndicator, isPositiveIndicator } from './indicator.js'
import { parseClientOn, toGraphQLOn } from './on.js'
import { parseClientFieldItem } from './runtime/FieldItem.js'
import { createFieldName } from './runtime/FieldName.js'
import { type ArgValue, normalizeAlias, type ObjectLike, type SS } from './types.js'

type FieldValue = SS | Indicator.Indicator

export interface Context {
  schemaIndex: Schema.Index
  config: Config
}

export const rootType = (
  context: Context,
  rootObjectDef: Schema.Output.RootType,
  selectionSet: ObjectLike,
  operationName: string = ``,
) => {
  const operationTypeName = lowerCaseFirstLetter(rootObjectDef.fields.__typename.type.type)
  return `${operationTypeName} ${operationName} { ${printObjectLikeField(context, rootObjectDef, selectionSet)} }`
}

const argValue = (
  context: Context,
  schemaArgTypeMaybeThunk: Schema.Input.Any,
  value: ArgValue,
): string => {
  if (value === null) return String(null) // todo could check if index agrees is nullable.

  const schemaArgType = readMaybeThunk(schemaArgTypeMaybeThunk)

  switch (schemaArgType.kind) {
    case `nullable`:
      return argValue(context, schemaArgType.type, value)
    case `list`: {
      assertArray(value)
      const values = value.map(_ => argValue(context, schemaArgType.type, _ as ArgValue))
      return `[${values.join(`, `)}]`
    }
    case `InputObject`: {
      assertObject(value)
      const entries = Object.entries(value).map(([argName_, argValue_]) => {
        const schemaArgField = schemaArgType.fields[argName_] as Schema.Input.Field | undefined
        if (!schemaArgField) throw new Error(`Arg not found: ${argName_}`)
        return [argName_, argValue(context, schemaArgField.type, argValue_)]
      })
      return `{ ${entries.map(([k, v]) => `${k!}: ${v!}`).join(`, `)} }`
    }
    case `Enum`: {
      return String(value)
    }
    case `Scalar`: {
      // @ts-expect-error fixme
      return JSON.stringify(schemaArgType.codec.encode(value))
    }
    default:
      throw new Error(`Unsupported arg kind: ${JSON.stringify(schemaArgType)}`)
  }
}

const pruneNonSelections = (ss: SS) => {
  const entries = Object.entries(ss)
  const selectEntries = entries.filter(_ => !_[0].startsWith(`$`))
  return Object.fromEntries(selectEntries)
}

export const printObjectLikeField = (
  context: Context,
  schemaItem: Schema.Object$2 | Schema.Union | Schema.Interface,
  fieldValue: FieldValue,
): string => {
  // todo fixme
  const expressions = separateExpressions(fieldValue as SS)

  const printedFieldGroups = expressions.fieldGroups.map(group => {
    return printFragmentInlineFieldGroup(context, schemaItem, group)
  }).join(`\n`) + `\n`

  switch (schemaItem.kind) {
    case `Object`: {
      const rootTypeName = (RootTypeName as Record<string, RootTypeName>)[schemaItem.fields.__typename.type.type]
        ?? null
      const printedSchemaFields = expressions.schemaFields.map(([clientFieldName, ss]) => {
        const fieldName = createFieldName(clientFieldName)
        const schemaField = schemaItem.fields[fieldName.value]
        if (!schemaField) throw new Error(`Field ${clientFieldName} not found in schema object`)
        /**
         * Inject __typename field for result fields that are missing it.
         */
        // dprint-ignore
        if (rootTypeName && context.config.output.errors.schema !== false && context.schemaIndex.error.rootResultFields[rootTypeName][fieldName.value]) {
          (ss as Record<string, boolean>)[`__typename`] = true
        }
        return printField(context, schemaField, { name: fieldName.value, value: ss })
      }).join(`\n`) + `\n`

      return printedSchemaFields + printedFieldGroups
    }
    case `Interface`: {
      const printedSchemaFields = expressions.schemaFields.map(([ClientFieldName, ss]) => {
        const fieldItem = parseClientFieldItem(ClientFieldName)

        switch (fieldItem._tag) {
          case `FieldName`: {
            if (fieldItem.value === `__typename`) {
              return `${fieldItem.value} ${printDirectives(ss)}`
            }
            const schemaField = schemaItem.fields[fieldItem.value]
            if (!schemaField) throw new Error(`Field ${ClientFieldName} not found in schema object`)
            return printField(context, schemaField, { name: fieldItem.value, value: ss })
          }
          case `On`: {
            const schemaObject = context.schemaIndex[`objects`][fieldItem.typeOrFragmentName]
            if (!schemaObject) throw new Error(`Fragment ${fieldItem.typeOrFragmentName} not found in schema`)
            return `${toGraphQLOn(fieldItem)} ${printDirectives(ss)} { ${
              printObjectLikeField(context, schemaObject, ss)
            } }`
          }
          default: {
            throw new Error(`Unknown field item tag`)
          }
        }
      }).join(`\n`) + `\n`

      return printedSchemaFields
    }
    case `Union`: {
      const printedSchemaFields = expressions.schemaFields.map(([fieldExpression, ss]) => {
        const fieldItem = parseClientFieldItem(fieldExpression)
        switch (fieldItem._tag) {
          case `FieldName`: {
            if (fieldItem.value === `__typename`) {
              return `${fieldItem.value} ${printDirectives(ss)}`
            }
            console.log(fieldItem)
            // todo
            throw new Error(`todo resolve common interface fields from unions`)
          }
          case `On`: {
            const schemaObject = context.schemaIndex[`objects`][fieldItem.typeOrFragmentName]
            if (!schemaObject) throw new Error(`Fragment ${fieldItem.typeOrFragmentName} not found in schema`)
            // if (isIndicator(ss)) throw new Error(`Union field must have selection set`)
            return `${toGraphQLOn(fieldItem)} ${printDirectives(ss)} { ${
              // @ts-expect-error fixme
              printObjectLikeField(context, schemaObject, pruneNonSelections(ss))} }`
          }
          default: {
            throw new Error(`Unknown field item tag`)
          }
        }
      }).join(`\n`) + `\n`

      return printedSchemaFields
    }
    default:
      throw new Error(`Unknown schema item kind`)
  }
}

export const printFragmentInlineFieldGroup = (
  context: Context,
  type: Schema.Object$2 | Schema.Interface | Schema.Union,
  group: SS,
) => {
  const directivesPrinted = printDirectives(group)
  return `... ${directivesPrinted} {\n${printObjectLikeField(context, type, group)}\n}`
}

export const printField = (
  context: Context,
  schemaField: Schema.SomeField,
  field: { name: string; value: FieldValue },
): string => {
  const aliases = normalizeAlias(field.value)

  if (aliases) {
    return aliases.map(alias => {
      return `${alias[0]}: ${field.name} ${printFieldValue(context, schemaField, alias[1] as FieldValue)}`
    }).join(`\n`)
  }

  return `${field.name} ${printFieldValue(context, schemaField, field.value)}`
}

const printFieldValue = (
  context: Context,
  schemaField: Schema.SomeField,
  fieldValue: null | FieldValue,
): string => {
  if (fieldValue === null) return `null` // todo test this case

  if (isIndicator(fieldValue)) return ``
  const keys = separateExpressions(fieldValue)

  const directives = printDirectives(fieldValue)
  const args = printArgs(context, schemaField, fieldValue)

  if (keys.schemaFields.length === 0 && keys.fieldGroups.length === 0) {
    return `${args} ${directives}`
  }

  // eslint-disable-next-line
  // @ts-ignore ID error
  const schemaNamedOutputType = Schema.Output.unwrapToNamed(schemaField.type) as Schema.Object$2
  const schemaNamedOutputType_ = readMaybeThunk(schemaNamedOutputType)

  const fieldGroups = keys.fieldGroups.map(group => {
    return printFragmentInlineFieldGroup(context, schemaNamedOutputType_, group)
  }).join(`\n`) + `\n`

  const selection = Object.fromEntries(keys.schemaFields) as ObjectLike

  return `${args} ${directives} {
		${fieldGroups}
		${printObjectLikeField(context, schemaNamedOutputType_, selection)}
	}`
}

const printArgs = (context: Context, schemaField: Schema.SomeField, ss: Indicator.Indicator | SS) => {
  if (isIndicator(ss)) return ``

  const { $ } = ss
  if ($ === undefined) return ``

  const schemaArgs = schemaField.args
  if (!schemaArgs) throw new Error(`Field has no args`)

  const argEntries = Object.entries($)
  if (argEntries.length === 0) return ``

  return `(${
    argEntries.map(([argFieldName, v]) => {
      const schemaArgField = schemaArgs.fields[argFieldName] as Schema.Input.Field | undefined
      if (!schemaArgField) throw new Error(`Arg field ${argFieldName} not found in schema.`)
      const valueEncoded = argValue(context, schemaArgField.type, v)
      return `${argFieldName}: ${valueEncoded}`
    }).join(`, `)
  })`
}

export const resolveFragmentInlineOn = (field: string): string => {
  const on = parseClientOn(field)
  if (on) return toGraphQLOn(on)
  return field
}

const printDirectives = (fieldValue: FieldValue): string => {
  if (isIndicator(fieldValue)) return ``

  return entriesStrict({
    $skip: fieldValue.$skip,
    $include: fieldValue.$include,
  }).reduce((code, [field, input]) => {
    const def = Directive.fieldToDef[field]
    code += Directive.Print.toGraphQLDirective(def.create(input))
    return code
  }, ``)
}

const separateExpressions = (ss: SS) => {
  const { ___, $, ...ssRest } = ss

  const fieldGroupOrGroups = ___ as SS | SS[] | undefined
  const fieldGroups = fieldGroupOrGroups
    ? Array.isArray(fieldGroupOrGroups) ? fieldGroupOrGroups : [fieldGroupOrGroups]
    : []

  const restApplicable = Object.entries(ssRest)
    .filter(([_, ss]) => isPositiveIndicator(ss)) as [
      string,
      FieldValue,
    ][]

  const directives = restApplicable.filter(([k, _]) => k.startsWith(SpecialKeyPrefixes.argumentsOrDirective))

  const schemaFields = restApplicable.filter(([k, _]) => !k.startsWith(SpecialKeyPrefixes.argumentsOrDirective))

  return {
    fieldGroups,
    args: $,
    directives,
    schemaFields,
  }
}
