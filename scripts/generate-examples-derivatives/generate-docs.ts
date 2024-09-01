import { groupBy } from 'es-toolkit'
import * as FS from 'node:fs/promises'
import { type DefaultTheme } from 'vitepress'
import { publicGraphQLSchemaEndpoints } from '../../examples/$helpers.js'
import { deleteFiles } from '../lib/deleteFiles.js'
import type { File } from '../lib/readFiles.js'
import { readFiles } from '../lib/readFiles.js'

export const generateDocs = async () => {
  const exampleFiles = await readFiles({
    pattern: `./examples/*.ts`,
    options: { ignore: [`./examples/$*`] },
  })

  const outputFiles = await readFiles({
    pattern: `./examples/*.output.txt`,
  })

  const examples = exampleFiles.map(example => {
    const output = outputFiles.find(file => file.name === `${example.name}.output.txt`)
    if (!output) throw new Error(`Could not find output file for ${example.name}`)

    return {
      file: example,
      fileName: parseFileName(example.name),
      output,
      isUsingJsonOutput: example.content.includes(`showJson`),
      tags: parseTags(example.name),
    }
  })

  const examplesTransformed = examples
    .map(transformOther)
    .map(transformRewriteGraffleImports)
    .map(transformRewriteHelperImports)
    .map(transformOther)
    .map(transformMarkdown)

  /**
   * Write Example Pages
   * -------------------
   */

  // Delete all existing to handle case of renaming or deleting examples.
  await deleteFiles({ pattern: `./website/content/examples/*.md` })

  await Promise.all(examplesTransformed.map(async (example) => {
    await FS.writeFile(`./website/content/examples/${example.fileName.canonical}.md`, example.file.content)
  }))

  /**
   * Update Examples Sidebar
   * -----------------------
   */

  {
    const groups = groupBy(examplesTransformed, example => example.fileName.group ?? `ungrouped`)
    const sidebarExamples = Object.entries(groups).flatMap(
      ([groupName, example]): DefaultTheme.SidebarItem[] => {
        if (groupName === `ungrouped`) {
          return example.map(example => ({
            text: example.fileName.canonicalTitle,
            link: `/examples/${example.fileName.canonical}`,
          }))
        }
        return [{
          text: toTitle(groupName),
          items: example.map(example => ({
            text: example.fileName.canonicalTitle,
            link: `/examples/${example.fileName.canonical}`,
          })),
        }]
      },
    ).sort((a) => a.items ? 1 : -1)

    const code = `
	import { DefaultTheme } from 'vitepress'

	export const sidebarExamples:DefaultTheme.SidebarItem[] = ${JSON.stringify(sidebarExamples, null, 2)}
`

    await FS.writeFile(`./website/.vitepress/configExamples.ts`, code)
  }

  console.log(`Generated a Vitepress page for each example.`)

  /**
   * Write Example Links Page Partials
   * ---------------------------------
   */
  // todo

  // Delete all existing to handle case of renaming or deleting examples.
  await deleteFiles({ pattern: `./website/content/guides/_example_links/*.md` })

  const groups = examplesTransformed.reduce<Record<string, Example[]>>((groups, example) => {
    const combinations = computeCombinations(example.tags).filter(_ => {
      return _.length > 0
    })
    const combinationNames = combinations.map(combo => combo.join(`_`))
    for (const combo of combinationNames) {
      if (!groups[combo]) {
        groups[combo] = [example]
      } else {
        groups[combo].push(example)
      }
    }
    return groups
  }, {})

  await Promise.all(
    Object.entries(groups).map(async ([groupName, examples]) => {
      const codeLinks = examples.map(example => {
        return `[${example.fileName.canonicalTitle}](../../examples/${example.fileName.canonical}.md)`
      }).join(` / `)
      const code = `###### Examples -> ${codeLinks}`
      await FS.writeFile(`./website/content/guides/_example_links/${groupName}.md`, code)
    }),
  )
  console.log(`Generated a Vitepress Markdown partial for each example tags combination.`)
}

const computeCombinations = (arr: string[]): string[][] => {
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

const toTitle = (name: string) => name.split(`-`).map(titlizeWord).join(` `).split(`_`).map(titlizeWord).join(` `)

const titlizeWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

const parseFileName = (fileName: string): Example['fileName'] => {
  const [group, fileNameWithoutGroup] = fileName.includes(`|`) ? fileName.split(`|`) : [null, fileName]
  const [tagsExpression, titleExpression] = fileNameWithoutGroup.split(`__`)
  const canonicalTitleExpression = titleExpression ?? tagsExpression ?? `impossible`
  return {
    canonical: (group ? `${group}-` : ``) + canonicalTitleExpression,
    canonicalTitle: toTitle(canonicalTitleExpression),
    tags: tagsExpression ?? `impossible`,
    title: titleExpression ?? null,
    group,
  }
}

type Tag = string

const parseTags = (fileName: string) => {
  const [tagsExpression] = fileName.split(`__`)
  if (!tagsExpression) return []
  const tags = tagsExpression.split(`_`)
  return tags
}

interface Example {
  file: File
  fileName: {
    canonical: string
    canonicalTitle: string
    tags: string
    title: string | null
    group: null | string
  }
  output: File
  isUsingJsonOutput: boolean
  tags: Tag[]
}

/**
 * Define Transformers
 * -------------------
 */

/**
 * 1. Convert Graffle imports into ones that can read from website project packages.
 *    These appear correct from point of view of a user who has installed Graffle into their project.
 */

const transformRewriteGraffleImports = (example: Example) => {
  const newContent = example.file.content
    .replaceAll(
      /from '\.\.\/src\/entrypoints\/graffle\/(.*?).js'/g,
      `from 'graphql-request/graffle/$1'`,
    )
    .replaceAll(
      /\.js$/g,
      ``,
    )
    .replaceAll(
      `import { SocialStudies } from './$generated-clients/SocialStudies/__.js'`,
      `import './graffle/Global.js'
// ---cut---
import { Graffle as SocialStudies } from './graffle/__.js'`,
    )

  return {
    ...example,
    file: {
      ...example.file,
      content: newContent,
    },
  }
}

/**
 * 1. Examples in repo use some helper functions. Inline these for presentation on the website.
 */
const transformRewriteHelperImports = (example: Example) => {
  const consoleLog = `console.log`
  const newContent = example.file.content
    .replaceAll(/^import.*\$helpers.*$\n/gm, ``)
    .replaceAll(
      `publicGraphQLSchemaEndpoints.SocialStudies`,
      `\`${publicGraphQLSchemaEndpoints.SocialStudies}\``,
    )
    .replaceAll(`showJson`, consoleLog)
    .replaceAll(`show`, consoleLog)
    .replaceAll(
      /(^console.log.*$)/gm,
      `$1
//${` `.repeat(consoleLog.length - 1)}^?`,
    )

  return {
    ...example,
    file: {
      ...example.file,
      content: newContent,
    },
  }
}

/**
 * 1. Remove eslint directives.
 */
const transformOther = (example: Example) => {
  const newContent = example.file.content.replaceAll(`/* eslint-disable */`, ``)
  return {
    ...example,
    file: {
      ...example.file,
      content: newContent,
    },
  }
}

/**
 * 1. Disable outline aside. Usually empty and provides for wider
 *    code blocks that sometimes have long lines (granted,
 *    not ideal on mobile but better on desktop).
 * 2. Add twoslash code block.
 */
const transformMarkdown = (example: Example) => {
  const newContent = `
---
aside: false
---

# ${example.fileName.canonicalTitle}

\`\`\`ts twoslash
${example.file.content.trim()}
\`\`\`

#### Output

\`\`\`${example.isUsingJsonOutput ? `json` : `txt`}
${example.output.content.trim()}
\`\`\`

`.trim()

  return {
    ...example,
    file: {
      ...example.file,
      content: newContent,
    },
  }
}
