import path from "node:path"
import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
// The following is an (optional) safeguard to prevent server-side functions from being imported on the client
import preventImport from "@doseofted/prim-rpc-tooling/build"

export default defineConfig({
	server: { port: 3000 },
	plugins: [
		solidPlugin(),
		preventImport.vite({ name: path.join(__dirname, "..", "module") }),
	],
})
