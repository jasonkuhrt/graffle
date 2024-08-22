// Read files from examples dir

import * as FS from 'node:fs/promises'
import * as Path from 'node:path'

import { globby } from 'globby'

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

// Transform imports:
// 1. Inline helpers $helpers, remove import
// 2. Rewrite ../src/entrypoints/graffle/<x>.js to graphql-request/graffle/<x>
// 3. Wrap in code block with code types of "ts twoslash"

const transformRewriteGraffleImports = (file: File) => {
  const newContent = file.content.replace(
    /from '\.\.\/src\/entrypoints\/graffle\/(.*?).js'/g,
    "from 'graphql-request/graffle/$1'",
  ).replace(
    /\.js$/,
    '',
  )
  return {
    ...file,
    content: newContent,
  }
}
import { publicGraphQLSchemaEndpoints } from '../../examples/$helpers.js'

const transformRewriteHelperImports = (file: File) => {
  const consoleLog = 'console.log'
  const newContent = file.content.replace(/^import.*\$helpers.*$\n/m, '').replace(
    'publicGraphQLSchemaEndpoints.SocialStudies',
    `\`${publicGraphQLSchemaEndpoints.SocialStudies}\``,
  ).replace('show', consoleLog)
    .replace(
      /(^console.log.*$)/m,
      `$1
//${' '.repeat(consoleLog.length - 1)}^?`,
    )

  return {
    ...file,
    content: newContent,
  }
}

const transformMarkdown = (file: File) => {
  const newContent = `\`\`\`ts twoslash\n${file.content.trim()}\n\`\`\`\n`
  return {
    ...file,
    content: newContent,
  }
}

const filesTransformed = files
  .map(transformRewriteGraffleImports)
  .map(transformRewriteHelperImports)
  .map(transformMarkdown)

await Promise.all(filesTransformed.map(async (file) => {
  await FS.writeFile(`./content/examples/${file.name}.md`, file.content)
}))

// console.log(filesTransformed)
