import { isExtractableFile, extractFiles, ExtractableFile } from 'extract-files'

/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
const isExtractableFileEnhanced = (value: any): value is ExtractableFile | { pipe: Function } =>
  isExtractableFile(value) ||
  (value !== null && typeof value === 'object' && typeof value.pipe === 'function')

/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 *
 * Otherwise returns JSON
 */
export default function createRequestBody(query: string, variables?: object) {
  const { clone, files } = extractFiles({ query, variables }, '', isExtractableFileEnhanced)

  if (files.size > 0) {
    const form = new FormData()

    form.append('operations', JSON.stringify(clone))

    const map: { [key: number]: string[] } = {}
    let i = 0
    files.forEach((paths) => {
      map[++i] = paths
    })
    form.append('map', JSON.stringify(map))

    i = 0
    files.forEach((paths, file) => {
      form.append(`${++i}`, file as any)
    })

    return form
  }

  return JSON.stringify(clone)
}
