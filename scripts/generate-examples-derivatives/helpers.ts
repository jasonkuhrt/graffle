import { capitalize, kebabCase } from 'es-toolkit'
import { execa, ExecaError } from 'execa'
import { globby } from 'globby'
import stripAnsi from 'strip-ansi'
import { showPartition } from '../../examples/$/helpers.js'
import { type File, readFiles } from '../lib/readFiles.js'

export const directories = {
  outputs: `./examples/__outputs__`,
  examples: `./examples`,
}

export const examplesIgnorePatterns = [`./examples/$*`, `./examples/*.output.*`, `./examples/*.output-encoder.*`]

export const readExampleFiles = () =>
  readFiles({
    pattern: `./examples/*.ts`,
    options: { ignore: examplesIgnorePatterns },
  })

export const readExamples = async (): Promise<Example[]> => {
  const exampleFiles = await readExampleFiles()

  const outputFiles = await readFiles({
    pattern: `./examples/__outputs__/*.output.txt`,
  })

  const encoderFilePaths = await globby(`${directories.outputs}/*.output.encoder.ts`)

  const examples = exampleFiles.map((example) => {
    const outputFile = outputFiles.find(file => file.name === `${example.name}.output.txt`)
    if (!outputFile) throw new Error(`Could not find output file for ${example.name}`)
    const encoderFilePath = encoderFilePaths.find((encoderFilePath) =>
      encoderFilePath.includes(`${example.name}.output.encoder.ts`)
    )

    const { description, content } = extractDescription(example.content)

    return {
      file: {
        ...example,
        content,
      },
      fileName: parseFileName(example.name),
      output: {
        file: outputFile,
        blocks: outputFile.content.split(showPartition + `\n`).map(block => block.trim()).filter(Boolean),
        encoder: encoderFilePath
          ? {
            filePath: encoderFilePath,
          }
          : undefined,
      },
      isUsingJsonOutput: example.content.includes(`showJson`),
      description,
      tags: parseTags(example.name),
    }
  })

  return examples
}

const parseFileName = (fileName: string): Example['fileName'] => {
  const [group, fileNameWithoutGroup] = fileName.includes(`|`) ? fileName.split(`|`) : [null, fileName]
  const [tagsExpression, titleExpression] = fileNameWithoutGroup.split(`__`)
  // If group name is duplicated by tags then omit that from the canonical title.
  const tags = tagsExpression ? parseTags(tagsExpression) : null
  const tagsExpressionWithoutGroupName = tags
    ? (tags.length > 1 ? tags.map(tag => tag === group ? `` : tag).filter(Boolean) : tags).join(` `)
    : null
  const canonicalTitleExpression = titleExpression ?? tagsExpressionWithoutGroupName ?? `impossible`
  return {
    canonical: (group ? `${group}-` : ``) + kebabCase(canonicalTitleExpression),
    canonicalTitle: toTitle(canonicalTitleExpression),
    tags: tagsExpression ?? `impossible`,
    title: titleExpression ?? null,
    group,
  }
}

const parseTags = (fileName: string) => {
  const [tagsExpression] = fileName.replace(/^[^|]+\|/, ``).split(`__`)
  if (!tagsExpression) return []
  const tags = tagsExpression.split(`_`)
  return tags
}

export interface Example {
  description: string | null
  file: File
  fileName: {
    canonical: string
    canonicalTitle: string
    tags: string
    title: string | null
    group: null | string
  }
  output: {
    file: File
    blocks: string[]
    encoder?: {
      filePath: string
    }
  }
  isUsingJsonOutput: boolean
  tags: Tag[]
}

type Tag = string

const extractDescription = (fileContent: string) => {
  const pattern = /^\/\*\*([\s\S]*?)\*\//
  const jsdocMatch = fileContent.match(pattern)

  if (jsdocMatch) {
    const description = jsdocMatch[1]!.trim().replaceAll(/^\s*\* /gm, ``)
    return {
      description,
      content: fileContent.replace(pattern, ``),
    }
  }

  return {
    description: null,
    content: fileContent,
  }
}

export const toTitle = (name: string) => kebabCase(name).split(`-`).map(capitalize).join(` `)

export const computeCombinations = (arr: string[]): string[][] => {
  const result: string[][] = []

  const generateCombinations = (currentCombination: string[], index: number) => {
    if (index === arr.length) {
      result.push([...currentCombination])
      return
    }

    // Include the current element
    generateCombinations([...currentCombination, arr[index]!], index + 1)

    // Exclude the current element
    generateCombinations(currentCombination, index + 1)
  }

  generateCombinations([], 0)

  return result
}

export const runExample = async (filePath: string) => {
  const result = await execa({ reject: false })`pnpm tsx ${filePath}`

  let exampleOutput = ``

  // todo: better understand the Execa API
  if (filePath.includes(`_or-throw`)) {
    if (result instanceof ExecaError) {
      // @ts-expect-error fixme
      exampleOutput = result.stdout
    }
  } else {
    exampleOutput = result.failed ? result.stderr : result.stdout
  }

  exampleOutput = stripAnsi(exampleOutput)
  exampleOutput = rewriteDynamicError(exampleOutput)

  return exampleOutput
}

export const rewriteDynamicError = (value: string) => {
  return value
    .replaceAll(/\/.*\/(.+)\.ts/g, `/some/path/to/$1.ts`)
    // When Node.js process exits via an uncaught thrown error, version is printed at bottom.
    .replaceAll(/Node\.js v.+/g, `Node.js vXX.XX.XX`)
    .replaceAll(/(.+):\d+:\d+\)/g, `$1:XX:XX)`)
}
