import configPrisma from 'eslint-config-prisma'
import tsEslint from 'typescript-eslint'

export default tsEslint.config({
  ignores: [
    '**/build/**/*',
    'eslint.config.js',
    'vite.config.ts',
    '**/generated/**/*',
    '**/$generated-clients/**/*',
    '**/website/**/*',
    '**/website/.vitepress/**/*',
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
