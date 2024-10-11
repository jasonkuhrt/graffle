import { isString } from './prelude.js'
import { linesPrepend, linesTrim } from './text.js'

type FieldTuple = [k: string, v: string]

export namespace Code {
  export const field = (name: string, type: string, options?: { optional?: boolean }) => {
    if (options?.optional) return `${name}?: ${type}`
    return `${name}: ${type}`
  }
  export interface TermObjectWith {
    $spread?: string[]
    $fields?: TermObject | TermObjectWith
    $literal?: string
  }
  export type TermObjectWithLike<$Fields extends null | TermObject | TermObjectWith = null> = {
    $spread?: string[]
    $literal?: string
  } & ($Fields extends null ? { $fields?: TermObject | TermObjectWith } : { $fields: $Fields })

  const isTermObjectWith = (value: unknown): value is TermObjectWith => {
    if (typeof value !== `object` || value === null) return false
    return Object.keys(value).some(key => key === `$spread` || key === `$fields` || key === `$fieldsMerge`)
  }

  export interface TermObject {
    [key: string]: string | TermObjectWith | TermObject
  }

  export type TermObjectOf<T> = {
    [key: string]: T
  }

  export const termObjectWith = (objectWith: TermObjectWith): string => {
    // const object = [...(objectWith.$fields ? [objectWith.$fields] : []), ...(objectWith.$fieldsMerge ?? [])].reduce(
    //   (finalO, o) => {
    //     if (isTermObjectWith(o)) {
    //       return { ...finalO, ...o }
    //     }
    //     return { ...finalO, ...o }
    //   },
    //   {},
    // )
    const spreads = (objectWith.$spread ?? []).map(spread => `...${spread},`)
    return block(
      spreads.join(`\n`) + `\n` + termObjectFields(objectWith.$fields ?? {})
        + (objectWith.$literal ? `\n${objectWith.$literal}` : ``),
    )
  }
  // terms
  export const termObject = (object: TermObject): string => {
    return block(termObjectFields(object))
  }
  export const termObjectFields = (object: TermObject | TermObjectWith): string =>
    termFieldsFromTuples(
      Object.entries(object).map(([key, value]): FieldTuple => {
        const valueNormalized = isTermObjectWith(value)
          ? termObjectWith(value)
          : isString(value)
          ? value
          : termObject(value)
        return [key, valueNormalized]
      }),
    )

  export const termFieldsFromTuples = (fields: FieldTuple[]) => fields.map(termFieldFromTuple).join(`\n`)
  export const termList = (value: string[]) => `[${value.join(`, `)}]`
  export const termFieldFromTuple = (tuple: FieldTuple) => Code.termField(tuple[0], tuple[1])
  export const termField = (name: string, type: string, options?: { comma?: boolean }) => {
    return `${name}: ${type}${(options?.comma ?? true) ? `,` : ``}`
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
