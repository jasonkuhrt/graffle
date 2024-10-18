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
    'src/layers/1_Schema/Hybrid/types/Scalar/Scalar.ts', // There is an ESLint error that goes away when ignored leading to a circular issue of either lint error or unused lint disable.
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
