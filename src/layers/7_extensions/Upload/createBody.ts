import type { ExecutionInput } from '../../../lib/graphqlHTTP.js'
import extractFiles from './extractFiles.js'

export const createBody = (input: ExecutionInput): FormData => {
  const { clone, files } = extractFiles(
    { query: input.query, variables: input.variables },
    (value: unknown) => value instanceof Blob,
    ``,
  )
  const operationJSON = JSON.stringify(clone)

  if (files.size === 0) throw new Error(`Not an upload request.`)

  const form = new FormData()

  form.append(`operations`, operationJSON)

  const map: Record<string, string[]> = {}
  let i = 0
  for (const paths of files.values()) {
    map[++i] = paths
  }
  form.append(`map`, JSON.stringify(map))

  i = 0
  for (const file of files.keys()) {
    form.append(String(++i), file)
  }

  return form
}
