// @ts-check
import { test, expect } from "@playwright/test"
import { $, cd } from "zx"
import path from "node:path"

test("Simple Test example works", async () => {
	const cwd = path.resolve()
	cd(path.resolve("./simple-test"))
	const result = (await $`pnpm start`).toString()
	cd(cwd)
	expect(result).toContain("Backend, meet Frontend.")
})
