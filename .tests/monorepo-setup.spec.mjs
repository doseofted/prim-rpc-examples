// @ts-check
import { test, expect } from "@playwright/test"
import { $ } from "zx"
import { setupServer } from "./utils/setup-server.mjs"

let matches = 0
const { beforeAll, afterAll } = setupServer(
	() => $`npm start`,
	(data) => {
		if (data.match(/Local.+3000/m)) {
			matches++
		}
		if (data.match(/Serving.+3001/m)) {
			matches++
		}
		return matches === 2
	},
	"./monorepo-setup"
)
test.beforeAll(beforeAll)
test.afterAll(afterAll)

test("Monorepo Setup example works", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.waitForResponse("http://*localhost:3001/*")
	await page.locator("#root>p").waitFor()
	const innerText = await page.innerText("#root")
	expect(innerText).toContain("Backend, meet Frontend.")
})
