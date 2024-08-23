import { globby } from 'globby'
import * as FS from 'node:fs/promises'
import * as Path from 'node:path'
import { type DefaultTheme } from 'vitepress'
import { publicGraphQLSchemaEndpoints } from '../../examples/$helpers.js'

const toTitle = (name: string) => name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

interface File {
  content: string
  name: string
  path: string
}

const filePaths = await globby('../examples/*.ts', { ignore: ['../examples/$*'] })
const files = await Promise.all(filePaths.map(async (path): Promise<File> => {
  const content = await FS.readFile(path, 'utf-8')
  return {
    content,
    name: Path.basename(path, '.ts'),
    path,
  }
}))

/**
 * Define Transformers
 * -------------------
 */

/**
 * 1. Convert Graffle imports into ones that can read from website project packages.
 *    These appear correct from point of view of a user who has installed Graffle into their project.
 */

const transformRewriteGraffleImports = (file: File) => {
  const newContent = file.content
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
    ...file,
    content: newContent,
  }
}

/**
 * 1. Examples in repo use some helper functions. Inline these for presentation on the website.
 */
const transformRewriteHelperImports = (file: File) => {
  const consoleLog = 'console.log'
  const newContent = file.content
    .replaceAll(/^import.*\$helpers.*$\n/gm, '')
    .replaceAll(
      'publicGraphQLSchemaEndpoints.SocialStudies',
      `\`${publicGraphQLSchemaEndpoints.SocialStudies}\``,
    )
    .replaceAll('show', consoleLog)
    .replaceAll(
      /(^console.log.*$)/gm,
      `$1
//${' '.repeat(consoleLog.length - 1)}^?`,
    )

  return {
    ...file,
    content: newContent,
  }
}

/**
 * 1. Remove eslint directives.
 */
const transformOther = (file: File) => {
  const newContent = file.content.replaceAll(`/* eslint-disable */`, '')
  return {
    ...file,
    content: newContent,
  }
}

/**
 * 1. Disable outline aside. Usually empty and provides for wider
 *    code blocks that sometimes have long lines (granted,
 *    not ideal on mobile but better on desktop).
 * 2. Add twoslash code block.
 */
const transformMarkdown = (file: File) => {
  const newContent = `
---
aside: false
---

\`\`\`ts twoslash
${file.content.trim()}
\`\`\`
`.trim()

  return {
    ...file,
    content: newContent,
  }
}

const filesTransformed = files
  .map(transformOther)
  .map(transformRewriteGraffleImports)
  .map(transformRewriteHelperImports)
  .map(transformOther)
  .map(transformMarkdown)

await Promise.all(filesTransformed.map(async (file) => {
  await FS.writeFile(`./content/examples/${file.name}.md`, file.content)
}))

/**
 * Update Examples Sidebar
 * -----------------------
 */

const sidebarExamples: DefaultTheme.SidebarItem[] = filesTransformed.map(file => {
  return {
    text: toTitle(file.name),
    link: `/examples/${file.name}`,
  }
})

const code = `
	import { DefaultTheme } from 'vitepress'

	export const sidebarExamples:DefaultTheme.SidebarItem[] = ${JSON.stringify(sidebarExamples, null, 2)}
`

await FS.writeFile('.vitepress/configExamples.ts', code)
