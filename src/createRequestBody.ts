import { defaultJsonSerializer } from './defaultJsonSerializer.js'
import type * as Dom from './types.dom.js'
import type { Variables } from './types.js'
import type { ExtractableFile } from 'extract-files'
import { extractFiles, isExtractableFile } from 'extract-files'
import FormDataNode from 'form-data'

/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
const isExtractableFileEnhanced = (value: any): value is ExtractableFile | { pipe: Function } =>
  isExtractableFile(value) ||
  (value !== null && typeof value === `object` && typeof value.pipe === `function`)

/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
const createRequestBody = (
  query: string | string[],
  variables?: Variables | Variables[],
  operationName?: string,
  jsonSerializer = defaultJsonSerializer
): string | Dom.FormData => {
  const { clone, files } = extractFiles({ query, variables, operationName }, ``, isExtractableFileEnhanced)

  if (files.size === 0) {
    if (!Array.isArray(query)) {
      return jsonSerializer.stringify(clone)
    }

    if (typeof variables !== `undefined` && !Array.isArray(variables)) {
      throw new Error(`Cannot create request body with given variable type, array expected`)
    }

    // Batch support
    const payload = query.reduce<{ query: string; variables: Variables | undefined }[]>(
      (accu, currentQuery, index) => {
        accu.push({ query: currentQuery, variables: variables ? variables[index] : undefined })
        return accu
      },
      []
    )

    return jsonSerializer.stringify(payload)
  }

  const Form = typeof FormData === `undefined` ? FormDataNode : FormData

  const form = new Form()

  form.append(`operations`, jsonSerializer.stringify(clone))

  const map: { [key: number]: string[] } = {}
  let i = 0
  files.forEach((paths) => {
    map[++i] = paths
  })
  form.append(`map`, jsonSerializer.stringify(map))

  i = 0
  files.forEach((paths, file) => {
    form.append(`${++i}`, file as any)
  })

  return form as Dom.FormData
}

export default createRequestBody
