export const linesPrepend = (prepend: string, str: string) =>
  str.split(`\n`).map((line) => `${prepend}${line}`).join(`\n`)

export const linesTrim = (str: string) => str.split(`\n`).map((line) => line.trim()).join(`\n`)

export const characterSpace = ` `

export const centerTo = (target: string, value: string) => {
  const indentSize = Math.round(target.length / 2) - Math.round(value.length / 2)
  return indent(indentSize, value)
}

export const indent = (size: number, value: string) => {
  const indentSpace = characterSpace.repeat(Math.round(size))
  return `${indentSpace}${value}`
}

export const borderThickFullWidth =
  `==================================================================================================`

export const borderThinFullWidth =
  `--------------------------------------------------------------------------------------------------`
