// @ts-check
import { PassThrough } from "node:stream"

/**
 * Used for setting up tests.
 *
 * Check if given process has given output (used to check if server is running)
 *
 * @param {import("zx").ProcessPromise} process
 * @param {(data: string) => boolean} isRunning
 * @returns Whether given process is running
 */
export async function checkServerRunning(process, isRunning) {
	const given = new PassThrough()
	const running = new Promise((resolve) => {
		given.on("data", (data) => {
			const running = isRunning(data.toString())
			// console.log({ data: data.toString() })
			console.log(data.toString())
			if (running) {
				setTimeout(() => resolve(true), 300)
			}
		})
	})
	process.pipe(given)
	return running
}
