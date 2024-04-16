// This config file is to get around this Vitest bug https://github.com/vitest-dev/vitest/issues/4605
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'graphql/language/ast.js': 'graphql/language/ast.js',
      'graphql/language/parser.js': 'graphql/language/parser.js',
      'graphql/language/printer.js': 'graphql/language/printer.js',
      graphql: 'graphql/index.js',
    },
  },
})
