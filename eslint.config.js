import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      // TODO: enable linting for stories files (issue 26 in audit) — will surface
      // a backlog of existing lint errors; tackle as a focused cleanup pass.
      '**/*.stories.tsx',
      '**/generated/**',
      // Auto-generated Solar component barrels — 7,400+ files, regenerated from
      // SVG assets; safe to skip linting.
      'packages/icons/src/solar/**',
      'packages/icons/src/solar.ts',
      'packages/icons/src/solar.native.ts',
    ],
  },
  {
    // Hard guardrail: the icons package MUST stay statically tree-shakable.
    // Metro (Expo) and webpack's dead-code elimination break the moment we
    // introduce dynamic / templated imports — and we lose per-icon bundle
    // savings across thousands of icons. Use named static imports only.
    files: ['packages/icons/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportExpression',
          message:
            'Dynamic imports (import()) break Metro/webpack tree-shaking in the icons package. ' +
            'Use static named imports from variant barrels instead, e.g. ' +
            "`import { Home2Linear } from '@pebtech/icons/solar/linear'`.",
        },
      ],
    },
  }
)
