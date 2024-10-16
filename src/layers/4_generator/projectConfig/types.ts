import type { Extension } from '../../6_client/extension/extension.js'

export interface ProjectConfig {
  extensions: Extension[]
}

export interface ProjectConfigInput {
}
export const normalizeInput = (input: ProjectConfigInput): ProjectConfig => {
  input // todo
  return {
    extensions: [],
  }
}
