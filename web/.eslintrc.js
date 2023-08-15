module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['xo', 'next', 'prettier', 'eslint:recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			extends: ['xo-typescript'],
			files: ['*.ts', '*.tsx'],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'react/no-unescaped-entities': 'off',
		'@next/next/no-page-custom-font': 'off',
	},
};
