/* eslint-disable */

import isPlainObject from 'is-plain-obj'

const extractFiles = (value: any, isExtractable: (value: unknown) => boolean, path: string): {
  clone: object
  files: Map<string, string[]>
} => {
  /**
   * Deeply clonable value.
   * @typedef {Array<unknown> | FileList | {
   *   [key: PropertyKey]: unknown
   * }} Cloneable
   */

  /**
   * Clone of a {@link Cloneable deeply cloneable value}.
   * @typedef {Exclude<Cloneable, FileList>} Clone
   */

  /**
   * Map of values recursed within the input value and their clones, for reusing
   * clones of values that are referenced multiple times within the input value.
   * @type {Map<Cloneable, Clone>}
   */
  const clones = new Map()

  /**
   * Extracted files and their object paths within the input value.
   * @type {Extraction<Extractable>["files"]}
   */
  const files = new Map()

  /**
   * Recursively clones the value, extracting files.
   * @param {unknown} value Value to extract files from.
   * @param {ObjectPath} path Prefix for object paths for extracted files.
   * @param {Set<Cloneable>} recursed Recursed values for avoiding infinite
   *   recursion of circular references within the input value.
   * @returns {unknown} Clone of the value with files replaced with `null`.
   */
  function recurse(value: any, path: string, recursed: Set<any>) {
    if (isExtractable(value)) {
      const filePaths = files.get(value)

      filePaths ? filePaths.push(path) : files.set(value, [path])

      return null
    }

    const valueIsList = Array.isArray(value)
      || (typeof FileList !== `undefined` && value instanceof FileList)

    const valueIsPlainObject = isPlainObject(value)

    if (valueIsList || valueIsPlainObject) {
      let clone = clones.get(value)

      const uncloned = !clone

      if (uncloned) {
        clone = valueIsList
          ? []
          // Replicate if the plain object is an `Object` instance.
          : value instanceof /** @type {any} */ (Object)
          ? {}
          : Object.create(null)

        clones.set(value, /** @type {Clone} */ (clone))
      }

      if (!recursed.has(value)) {
        const pathPrefix = path ? `${path}.` : ``
        const recursedDeeper = new Set(recursed).add(value)

        if (valueIsList) {
          let index = 0

          for (const item of value) {
            const itemClone = recurse(
              item,
              pathPrefix + index++,
              recursedDeeper,
            )

            if (uncloned) /** @type {Array<unknown>} */ (clone).push(itemClone)
          }
        } else {
          for (const key in value) {
            const propertyClone = recurse(
              value[key],
              pathPrefix + key,
              recursedDeeper,
            )

            if (uncloned) {
              /** @type {{ [key: PropertyKey]: unknown }} */
              clone[key] = propertyClone
            }
          }
        }
      }

      return clone
    }

    return value
  }

  return {
    clone: recurse(value, path, new Set()),
    files,
  }
}

/** @typedef {import("./isExtractableFile.mjs").default} isExtractableFile */

/**
 * Recursively extracts files and their {@link ObjectPath object paths} within a
 * value, replacing them with `null` in a deep clone without mutating the
 * original value.
 * [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/Filelist)
 * instances are treated as
 * [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) instance
 * arrays.
 * @template Extractable Extractable file type.
 * @param {unknown} value Value to extract files from. Typically an object tree.
 * @param {(value: unknown) => value is Extractable} isExtractable Matches
 *   extractable files. Typically {@linkcode isExtractableFile}.
 * @param {ObjectPath} [path] Prefix for object paths for extracted files.
 *   Defaults to `""`.
 * @returns {Extraction<Extractable>} Extraction result.
 * @example
 * Extracting files from an object.
 *
 * For the following:
 *
 * ```js
 * import extractFiles from "extract-files/extractFiles.mjs";
 * import isExtractableFile from "extract-files/isExtractableFile.mjs";
 *
 * const file1 = new File(["1"], "1.txt", { type: "text/plain" });
 * const file2 = new File(["2"], "2.txt", { type: "text/plain" });
 * const value = {
 *   a: file1,
 *   b: [file1, file2],
 * };
 *
 * const { clone, files } = extractFiles(value, isExtractableFile, "prefix");
 * ```
 *
 * `value` remains the same.
 *
 * `clone` is:
 *
 * ```json
 * {
 *   "a": null,
 *   "b": [null, null]
 * }
 * ```
 *
 * `files` is a
 * [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * instance containing:
 *
 * | Key     | Value                        |
 * | :------ | :--------------------------- |
 * | `file1` | `["prefix.a", "prefix.b.0"]` |
 * | `file2` | `["prefix.b.1"]`             |
 */
export default extractFiles

/**
 * An extraction result.
 * @template [Extractable=unknown] Extractable file type.
 * @typedef {object} Extraction
 * @prop {unknown} clone Clone of the original value with extracted files
 *   recursively replaced with `null`.
 * @prop {Map<Extractable, Array<ObjectPath>>} files Extracted files and their
 *   object paths within the original value.
 */

/**
 * String notation for the path to a node in an object tree.
 * @typedef {string} ObjectPath
 * @see [`object-path` on npm](https://npm.im/object-path).
 * @example
 * An object path for object property `a`, array index `0`, object property `b`:
 *
 * ```
 * a.0.b
 * ```
 */
