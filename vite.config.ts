// This config file is to get around this Vitest bug https://github.com/vitest-dev/vitest/issues/4605
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      graphql: 'graphql/index.js',
    },
  },
})
