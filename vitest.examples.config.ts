import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globalSetup: ['./tests/_/services/pokemonVitest.ts'],
  },
})
