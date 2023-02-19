import { defineConfig } from "tsup"

export default defineConfig((options) => ({
	...options,
	entry: ["src/index.ts"],
	target: "ES2020",
	format: ["esm"],
	dts: true,
}))
