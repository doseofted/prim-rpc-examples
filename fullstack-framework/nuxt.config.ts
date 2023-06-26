import path from "node:path"
// The following is an (optional) safeguard to show an error if server-side functions are imported on the client
import preventImport, {
	BuildModifyMethod,
} from "@doseofted/prim-rpc-tooling/build"

export default defineNuxtConfig({
	vite: {
		plugins: [
			preventImport.vite({
				name: path.join(__dirname, "hello"),
				method: BuildModifyMethod.RunTimeProcessCheck,
			}),
		],
	},
})
