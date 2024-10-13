export type TemplateStringsArguments = [TemplateStringsArray, ...unknown[]]

export const isTemplateStringArguments = (args: [...unknown[]]): args is TemplateStringsArguments => {
  return isTemplateStringArray(args[0])
}

export const isTemplateStringArray = (arg: any): arg is TemplateStringsArray => {
  return Array.isArray(arg) && `raw` in arg && arg.raw !== undefined
}

export const joinTemplateStringArrayAndArgs = (args: TemplateStringsArguments): string => {
  const [templateParts, ...templateArgs] = args
  return templateParts.reduce(
    (string, part, index) => `${string}${part}${index in templateArgs ? String(templateArgs[index]) : ``}`,
    ``,
  )
}
