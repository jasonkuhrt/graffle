import configPrisma from 'eslint-config-prisma'
import tsEslint from 'typescript-eslint'

export default tsEslint.config({
  ignores: [
    'examples/55_generated/generated_document__document.ts',
    'eslint.config.js',
    'vite.config.ts',
    'vitest*.config.ts',
    '**/generated/**/*',
    'tests/_/schemas/*/graffle/**/*',
    '**/tests/fixture/graffle/**/*',
    '**/$/**/*',
    'legacy/**/*',
    'build/**/*',
    'website/**/*',
  ],
  extends: configPrisma,
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    ['@typescript-eslint/only-throw-error']: 'off',
    ['@typescript-eslint/no-unsafe-assignment']: 'off',
    ['@typescript-eslint/no-unsafe-call']: 'off',
    ['@typescript-eslint/no-unsafe-member-access']: 'off',
    ['@typescript-eslint/ban-types']: 'off',
  },
})
