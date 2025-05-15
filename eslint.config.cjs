const { defineConfig } = require('eslint/config');

const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const jsonc = require('eslint-plugin-jsonc');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const parser = require('jsonc-eslint-parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

module.exports = defineConfig([
	{
		ignores: [
			'eslint.config.cjs',
			'node_modules/**',
			'dist/**',
			'webpack.common.js',
			'webpack.dev.js',
			'webpack.prod.js',
		],

		extends: compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:prettier/recommended',
			'plugin:jsonc/recommended-with-json',
		),

		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier,
			jsonc,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',

			parserOptions: {
				project: './tsconfig.json',
			},
		},

		rules: {
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					semi: true,
					singleQuote: true,
					tabWidth: 4,
				},
			],

			'no-tabs': 'off',
		},
	},
	{
		files: ['**/*.json'],

		languageOptions: {
			parser: parser,
		},

		rules: {
			indent: ['error', 'tab'],
			'no-tabs': 'off',
		},
	},
]);
