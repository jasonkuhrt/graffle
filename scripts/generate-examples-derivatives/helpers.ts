import { capitalize, kebabCase } from 'es-toolkit'
import { execa, ExecaError } from 'execa'
import { globby } from 'globby'
import * as Path from 'node:path'
import stripAnsi from 'strip-ansi'
import { showPartition } from '../../examples/$/helpers.js'
import { type File, readFiles } from '../lib/readFiles.js'
import {
  getOutputEncoderFilePathFromExampleFilePath,
  getOutputFilePathFromExampleFilePath,
  outputEncoderExtension,
} from './generate-outputs.js'

export const directories = {
  outputs: `./examples/__outputs__`,
  examples: `./examples`,
  tests: `./tests/examples`,
}

export const examplesIgnorePatterns = [`./examples/$`, directories.outputs]

export const readExampleFiles = () =>
  readFiles({
    pattern: `./examples/*/*.ts`,
    options: { ignore: examplesIgnorePatterns },
  })

export const readExamples = async (): Promise<Example[]> => {
  const exampleFiles = await readExampleFiles()

  const outputFiles = await readFiles({
    pattern: `./examples/__outputs__/*/*.output.txt`,
  })

  const encoderFilePaths = await globby(`${directories.outputs}/**/*${outputEncoderExtension}`)

  const examples = exampleFiles.map((example) => {
    const group = parseGroup(example.path.full)
    const fileName = parseFileName(example.name, group.humanName)

    const outputFilePath = getOutputFilePathFromExampleFilePath(example.path.full)
    const outputEncoderFilePath = getOutputEncoderFilePathFromExampleFilePath(example.path.full)
    const outputFile = outputFiles.find(file => {
      return Path.relative(file.path.full, outputFilePath) === ``
    })
    if (!outputFile) throw new Error(`Could not find output file for ${example.name}`)

    const testEncoderFilePath = encoderFilePaths.find((filePath) => {
      return Path.relative(filePath, outputEncoderFilePath) === ``
    })

    const { description, content } = extractDescription(example.content)

    return {
      file: {
        ...example,
        content,
      },
      group,
      fileName,
      output: {
        file: outputFile,
        blocks: outputFile.content.split(showPartition + `\n`).map(block => block.trim()).filter(Boolean),
        encoder: testEncoderFilePath
          ? {
            filePath: testEncoderFilePath,
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

const parseGroup = (filePath: string) => {
  const dirName = Path.dirname(filePath).split(`/`).pop()!
  const humanName = dirName.replace(/^\d+_/, ``)
  return {
    dirName,
    humanName,
  }
}

const parseFileName = (fileName: string, group: string): Example['fileName'] => {
  const fileNameWithoutGroup = fileName
  const [tagsExpression, titleExpression] = fileNameWithoutGroup.split(`__`)
  // If group name is duplicated by tags then omit that from the canonical title.
  const tags = tagsExpression ? parseTags(tagsExpression) : null
  const tagsExpressionWithoutGroupName = tags
    ? (tags.length > 1 ? tags.map(tag => tag === group ? `` : tag).filter(Boolean) : tags).join(` `)
    : null
  const canonicalTitleExpression = titleExpression ?? tagsExpressionWithoutGroupName ?? `impossible`
  return {
    canonical: kebabCase(canonicalTitleExpression),
    canonicalTitle: toTitle(canonicalTitleExpression),
    tags: tagsExpression ?? `impossible`,
    title: titleExpression ?? null,
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
  }
  group: {
    humanName: string
    dirName: string
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
