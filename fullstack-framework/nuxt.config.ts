import path from "node:path"
// The following is an (optional) safeguard to prevent server-side functions from being imported on the client
import preventImport from "@doseofted/prim-rpc-tooling/build"

export default defineNuxtConfig({
	vite: {
		plugins: [preventImport.vite({ name: path.join(__dirname, "hello") })],
	},
})
