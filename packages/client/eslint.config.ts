import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const typedPlugin = tsPlugin as unknown as Plugin;

export default defineConfig([
  globalIgnores(['dist']),

  {
    // run this config for JS/TS + React files
    files: ['**/*.{js,jsx,ts,tsx}'],

    // share recommended base rules from @eslint/js and React + TypeScript
    extends: [
      js.configs.recommended,
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      // react-hooks recommended rules (we import the plugin for its configs)
      reactHooks.configs?.['recommended-latest'] ??
        'plugin:react-hooks/recommended',
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser, // use TS parser for both JS/TS files (works fine)
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json', // optional: enable for rules that need type info (remove if tsconfig absent)
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@typescript-eslint': typedPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // keep your custom rule from before and prefer TS-aware rule
      // disable base 'no-unused-vars' in favor of the TS version for TS files
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]' },
      ],

      // add any project rules you prefer
      // e.g. if you want to allow JSX without explicit React import:
      // "react/react-in-jsx-scope": "off",
    },
  },
]);
