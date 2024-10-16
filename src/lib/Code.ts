import { entries, isString } from './prelude.js'
import { linesPrepend, linesTrim } from './text.js'

type FieldTuple = [k: string, v: string | null, tsDoc?: string | null]

export namespace Code {
  export const field = (name: string, type: string, options?: { optional?: boolean }) => {
    if (options?.optional) return `${name}?: ${type}`
    return `${name}: ${type}`
  }
  export interface DirectiveTermObject {
    $spread?: string[]
    $fields?: TermObject | DirectiveTermObject
    $literal?: string
  }

  export type TermPrimitive = null | string | number | boolean

  export type DirectiveTermObjectLike<$Fields extends null | TermObject | DirectiveTermObject = null> = {
    $spread?: string[]
    $literal?: string
  } & ($Fields extends null ? { $fields?: TermObject | DirectiveTermObject } : { $fields: $Fields })

  const isDirectiveTermObject = (value: unknown): value is DirectiveTermObject => {
    if (typeof value !== `object` || value === null) return false
    return Object.keys(value).some(key => key === `$spread` || key === `$fields` || key === `$fieldsMerge`)
  }

  const isDirectiveField = (value: unknown): value is DirectiveField => {
    if (typeof value !== `object` || value === null) return false
    return DirectiveFieldKeys.$VALUE in value
  }

  const isFieldPrimitive = (value: unknown): value is TermPrimitive => {
    return isString(value) || typeof value === `number` || typeof value === `boolean`
  }

  type Field = TermPrimitive | DirectiveTermObject | TermObject

  interface DirectiveField {
    $TS_DOC?: string
    $VALUE: Field
  }

  const DirectiveFieldKeys = {
    $TS_DOC: `$TS_DOC`,
    $VALUE: `$VALUE`,
  }

  export interface TermObject {
    [key: string]: Field | DirectiveField
  }

  export type TermObjectOf<T> = {
    [key: string]: T
  }

  export const directiveTermObject = (objectWith: DirectiveTermObject): string => {
    const spreads = (objectWith.$spread ?? []).map(spread => `...${spread},`)
    return block(
      spreads.join(`\n`)
        + `\n`
        + termObjectFields(objectWith.$fields ?? {})
        + (objectWith.$literal ? `\n${objectWith.$literal}` : ``),
    )
  }

  // terms

  export const termObject = (object: TermObject | DirectiveTermObject): string => {
    if (isDirectiveTermObject(object)) return directiveTermObject(object)
    return block(termObjectFields(object))
  }

  export const termObjectFields = (object: TermObject | DirectiveTermObject): string =>
    termFieldsFromTuples(
      entries(object).map(([key, value]): FieldTuple => {
        if (value === null) return [key, null]

        const [valueNormalized, tsDoc] = isDirectiveTermObject(value)
          ? [directiveTermObject(value), null]
          : isDirectiveField(value)
          ? [termObjectField(value.$VALUE), value.$TS_DOC]
          : isString(value) || typeof value === `number` || typeof value === `boolean`
          ? [String(value), null]
          : [termObject(value as any), null]
        return [key, valueNormalized, tsDoc]
      }),
    )

  const termObjectField = (field: Field): string => {
    if (isFieldPrimitive(field)) return String(field)
    return termObject(field)
  }

  export const termFieldsFromTuples = (fields: FieldTuple[]) => fields.map(termFieldFromTuple).join(`\n`)
  export const termList = (value: string[]) => `[${value.join(`, `)}]`
  export const termFieldFromTuple = (tuple: FieldTuple) => Code.termField(tuple[0], tuple[1], { tsDoc: tuple[2] })
  export const termField = (
    key: string,
    value: string | undefined | null,
    options?: { tsDoc?: string | null; comma?: boolean },
  ) => {
    if (value === undefined || value === ``) return ``
    return `${options?.tsDoc ? `${options.tsDoc}\n` : ``}${key}: ${String(value)}${(options?.comma ?? true) ? `,` : ``}`
  }
  export const termConst = (name: string, value?: string) => termConstTyped(name, null, value)
  export const termConstTyped = (name: string, type: string | null, value?: string) =>
    `const ${name} ${type ? `:${type}` : ``} = ${value ?? ``}`

  // type
  export const nullable = (type: string) => `${type} | null`
  export const union = (name: string, types: string[]) => `type ${name} =\n| ${Code.unionItems(types)}`
  export const unionItems = (types: string[]) => types.join(`\n| `)
  export const tuple = (types: string[]) => termList(types)
  export const list = (type: string) => `Array<${type}>`
  export const optionalField = (name: string, type: string) => Code.field(name, type, { optional: true })
  export const fields = (fieldTypes: string[]) => fieldTypes.join(`\n`)
  export const intersection = (a: string, b: string) => `${a} & ${b}`
  export const object = (fields: string) => `{\n${fields}\n}`

  export const objectFromEntries = (entries: readonly (readonly [string, string])[]) =>
    Code.objectFrom(Object.fromEntries(entries.map(([name, type]) => [name, { type }])))
  export const objectFrom = (
    object: Record<
      string,
      null | string | boolean | number | { type: null | string | boolean | number; optional?: boolean; tsdoc?: string }
    >,
  ) => {
    return Code.object(
      Code.fields(
        Object.entries(object).map(([name, spec]) =>
          [name, spec && typeof spec === `object` ? spec : { type: spec }] as const
        )
          .map((
            [name, spec],
          ) => Code.field(name, String(spec.type), { optional: spec.optional })),
      ),
    )
  }
  export const type = (name: string, type: string) => `type ${name} = ${type}`
  export const interface$ = (name: string, object: string) => `interface ${name} ${object}`
  export const export$ = (thing: string) => `export ${thing}`
  export const namespace = (name: string, content: string) => `namespace ${name} ${Code.object(content)}`
  // term or type
  export const propertyAccess = (object: string, name: string) => `${object}.${name}`
  export const string = (str: string) => `"${str}"`
  export const block = (content: string) => `{\n${content}\n}`
  export const boolean = (value: boolean) => value ? `true` : `false`
  export const TSDoc = <$Content extends string | null>(content: $Content): $Content => {
    return (content === null ? null : `/**\n${linesPrepend(`* `, linesTrim(content)) || `*`}\n*/`) as $Content
  }
  export const TSDocWithBlock = (content: string | null, block: string) => {
    const tsDoc = TSDoc(content)
    return tsDoc === null ? block : `${tsDoc}\n${block}`
  }

  export const group = (...content: string[]) => content.join(`\n`)
  export const commentSectionTitle = (title: string) => {
    const lineSize = 60
    const line = `-`.repeat(lineSize)
    const titlePrefixSpace = ` `.repeat(Math.round(lineSize / 2) - Math.round(title.length / 2))
    const titleSuffixSpace = ` `.repeat(lineSize - (titlePrefixSpace.length + title.length))
    return `\n\n// ${line} //\n// ${titlePrefixSpace + title + titleSuffixSpace} //\n// ${line} //\n\n`
  }

  export const reservedTypeScriptInterfaceNames = [
    `break`,
    `case`,
    `catch`,
    `class`,
    `const`,
    `continue`,
    `debugger`,
    `default`,
    `delete`,
    `do`,
    `else`,
    `enum`,
    `export`,
    `extends`,
    `false`,
    `finally`,
    `for`,
    `function`,
    `if`,
    `import`,
    `in`,
    `instanceof`,
    `new`,
    `null`,
    `return`,
    `super`,
    `switch`,
    `this`,
    `throw`,
    `true`,
    `try`,
    `typeof`,
    `var`,
    `void`,
    `while`,
    `with`,
    `implements`,
    `any`,
    `boolean`,
    `never`,
    `number`,
    `object`,
    `string`,
    `symbol`,
    `undefined`,
    `unknown`,
    `bigint`,
    `break`,
    `with`,
    `break`,
    `of`,
    `interface`,
  ]
}
