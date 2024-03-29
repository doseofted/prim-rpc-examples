// @ts-check
import { test, expect } from "@playwright/test"
import { $ } from "zx"
import { setupServer } from "./utils/setup-server.mjs"

const { beforeAll, afterAll } = setupServer(
	() => $`npm start`,
	(data) => !!data.match(/ready in .+ ms/m),
	"./custom-handler"
)
test.beforeAll(beforeAll)
test.afterAll(afterAll)

test("Custom Handler example works", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.locator("#root>p").waitFor()
	const innerText = await page.innerText("#root")
	expect(innerText).toContain("Backend, meet Frontend.")
})
