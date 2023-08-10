// @ts-check
import { cd } from "zx"
import path from "node:path"
import { checkServerRunning } from "./server-running.mjs"

/**
 * Used for setting up tests.
 *
 * @param {() => import("zx").ProcessPromise} cmd
 * @param {(data: string) => boolean} isReady
 * @param {string} directory
 */
export function setupServer(cmd, isReady, directory) {
	/** @type {import("zx").ProcessPromise|null} */
	let server = null
	let lastPath = path.resolve()
	return {
		beforeAll: async function () {
			try {
				cd(path.resolve(directory))
				// NOTE: Vite errors on SIGINT signal (expects "q" on stdin instead), just catch error here
				server = cmd().nothrow()
				await checkServerRunning(server, isReady)
				await new Promise((resolve) => setTimeout(resolve, 1000))
				console.debug("Server is running")
			} catch (error) {
				console.log("Server failed")
			}
		},
		afterAll: async function () {
			try {
				// server?.stdin.write(Buffer.from("q"))
				await server?.kill("SIGINT")
				cd(lastPath)
				await new Promise((resolve) => setTimeout(resolve, 1000))
				console.debug("Server is stopped")
			} catch (error) {
				console.debug("Server forcefully stopped")
			}
		},
	}
}
