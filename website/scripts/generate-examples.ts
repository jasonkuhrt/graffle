import * as FS from 'node:fs/promises'
import { type DefaultTheme } from 'vitepress'
import { publicGraphQLSchemaEndpoints } from '../../examples/$helpers.js'
import { File, readFiles } from '../../scripts/lib/readFiles.js'

const toTitle = (name: string) => name.split('-').map(titlizeWord).join(' ').split('_').map(titlizeWord).join(' ')

const titlizeWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

interface Example {
  file: File
  output: File
  isUsingJsonOutput: boolean
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
      "from 'graphql-request/graffle/$1'",
    )
    .replaceAll(
      /\.js$/g,
      '',
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
  const consoleLog = 'console.log'
  const newContent = example.file.content
    .replaceAll(/^import.*\$helpers.*$\n/gm, '')
    .replaceAll(
      'publicGraphQLSchemaEndpoints.SocialStudies',
      `\`${publicGraphQLSchemaEndpoints.SocialStudies}\``,
    )
    .replaceAll('showJson', consoleLog)
    .replaceAll('show', consoleLog)
    .replaceAll(
      /(^console.log.*$)/gm,
      `$1
//${' '.repeat(consoleLog.length - 1)}^?`,
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
  const newContent = example.file.content.replaceAll(`/* eslint-disable */`, '')
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

# ${toTitle(example.file.name)}

\`\`\`ts twoslash
${example.file.content.trim()}
\`\`\`

#### Output

\`\`\`${example.isUsingJsonOutput ? 'json' : 'txt'}
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

const exampleFiles = await readFiles({
  pattern: `../examples/*.ts`,
  options: { ignore: [`../examples/$*`] },
})

const outputFiles = await readFiles({
  pattern: `../examples/*.output.txt`,
})

const examples = exampleFiles.map(example => {
  const output = outputFiles.find(file => file.name === `${example.name}.output.txt`)
  if (!output) throw new Error(`Could not find output file for ${example.name}`)

  return {
    file: example,
    output,
    isUsingJsonOutput: example.content.includes('showJson'),
  }
})

const examplesTransformed = examples
  .map(transformOther)
  .map(transformRewriteGraffleImports)
  .map(transformRewriteHelperImports)
  .map(transformOther)
  .map(transformMarkdown)

await Promise.all(examplesTransformed.map(async (example) => {
  await FS.writeFile(`./content/examples/${example.file.name}.md`, example.file.content)
}))

/**
 * Update Examples Sidebar
 * -----------------------
 */

const sidebarExamples: DefaultTheme.SidebarItem[] = examplesTransformed.map(example => {
  return {
    text: toTitle(example.file.name),
    link: `/examples/${example.file.name}`,
  }
})

const code = `
	import { DefaultTheme } from 'vitepress'

	export const sidebarExamples:DefaultTheme.SidebarItem[] = ${JSON.stringify(sidebarExamples, null, 2)}
`

await FS.writeFile('.vitepress/configExamples.ts', code)
