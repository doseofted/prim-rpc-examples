// @ts-check
import { test, expect } from "@playwright/test"
import { $ } from "zx"
import { setupServer } from "./utils/setup-server.mjs"

const { beforeAll, afterAll } = setupServer(
	() => $`npm start`,
	(data) => !!data.match(/ready in .+ ms/m),
	"./web-worker"
)
test.beforeAll(beforeAll)
test.afterAll(afterAll)

test("Web Worker example works", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.waitForResponse("http://localhost:3000/worker/hello*")
	await page.locator("#root>p").waitFor()
	const innerText = await page.innerText("#root")
	await page.waitForTimeout(50)
	expect(innerText).toContain("Backend, meet Frontend.")
})
