import { groupBy } from 'es-toolkit'
import * as FS from 'node:fs/promises'
import { type DefaultTheme } from 'vitepress'
import { publicGraphQLSchemaEndpoints } from '../../examples/$/helpers.js'
import { deleteFiles } from '../lib/deleteFiles.js'
import { computeCombinations, type Example, readExamples, toTitle } from './helpers.js'

export const generateDocs = async () => {
  const examples = await readExamples()

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
      /from '\.\.\/src\/entrypoints\/main.js'/g,
      `from 'graffle'`,
    )
    .replaceAll(
      /from '\.\.\/src\/entrypoints\/(.*?).js'/g,
      `from 'graffle/$1'`,
    )
    .replaceAll(
      /\.js$/g,
      ``,
    )
    .replaceAll(
      `import { SocialStudies } from './$/generated-clients/SocialStudies/__.js'`,
      `import './graffle/Global.js'
// ---cut---
import { Graffle as SocialStudies } from './graffle/__.js'`,
    )
    .replaceAll(
      /import ({[^}]+}) from '.\/\$\/generated-clients\/([^/]+)\/__\.js'/g,
      `import './$2/Global.js'
// ---cut---
import $1 from './$2/__.js'`,
    )
    // Any remaining $ imports are entirely removed.
    .replaceAll(/import.*'.*\$.*'\n/g, ``)
    // Any references to servers are removed.
    // These are used in the examples to run servers for the examples to interact with.
    // This is not something that the website examples support showing.
    // It would required bringing in analysis of the server code for twoslash.
    // URL references are replaced with localhost URL literals.
    .replaceAll(`server.url`, `\`http://localhost:3000/graphql\``)
    .replaceAll(/.*server.*\n(?:\s*\n)?/g, ``)

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
    .replaceAll(/^import.*\$\/helpers.*$\n/gm, ``)
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

# ${example.fileName.canonicalTitle}${example.description ? `\n\n${example.description}\n` : ``}

<!-- dprint-ignore-start -->
\`\`\`ts twoslash
${example.file.content.trim()}
\`\`\`
<!-- dprint-ignore-end -->

#### Outputs

${
    example.output.blocks.map(block => {
      return `
<!-- dprint-ignore-start -->
\`\`\`${example.isUsingJsonOutput ? `json` : `txt`}
${block}
\`\`\`
<!-- dprint-ignore-end -->
`.trim()
    }).join(`\n`)
  }
`.trim()

  return {
    ...example,
    file: {
      ...example.file,
      content: newContent,
    },
  }
}
