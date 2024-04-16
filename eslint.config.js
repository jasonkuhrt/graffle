import configPrisma from 'eslint-config-prisma'
import tsEslint from 'typescript-eslint'

export default tsEslint.config({
  ignores: ['**/build/**/*', 'eslint.config.js', 'vite.config.ts', '**/generated/**/*'],
  extends: configPrisma,
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
