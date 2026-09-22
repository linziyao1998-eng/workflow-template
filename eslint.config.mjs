import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from 'eslint-config-prettier/flat'
export default defineConfigWithVueTs(
  { files: ['**/*.{vue,ts,mjs}'] },
  globalIgnores([
    'node_modules/**',
    'dist/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.workflow-local/**',
    '.agents/skills/**',
  ]),
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  { ...pluginPlaywright.configs['flat/recommended'], files: ['e2e/**/*.spec.ts'] },
  { ...pluginVitest.configs.recommended, files: ['src/**/*.test.ts'] },
  skipFormatting,
)
