// @ts-check
/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	plugins: ["@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	env: {
		browser: true,
		node: true,
		es2023: true,
	},
	ignorePatterns: [".eslintrc.*", "dist/"],
	globals: {},
}
