import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
	plugins: [solid()],
	server: {
		port: 3000,
		// proxy: { "^/prim$": "http://localhost:3001" }
	},
	build: { target: "es2022" },
})
