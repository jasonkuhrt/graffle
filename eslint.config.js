import configPrisma from 'eslint-config-prisma'
import tsEslint from 'typescript-eslint'

export default tsEslint.config({
  ignores: [
    'eslint.config.js',
    'vite.config.ts',
    '**/generated/**/*',
    '**/$generated-clients/**/*',
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
  },
})
