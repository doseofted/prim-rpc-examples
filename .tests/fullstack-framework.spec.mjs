// @ts-check
import { test, expect } from "@playwright/test"
import { $ } from "zx"
import { setupServer } from "./utils/setup-server.mjs"

const { beforeAll, afterAll } = setupServer(
	() => $`pnpm start`,
	(data) => !!data.match(/Nitro built in .+ ms/m),
	"./fullstack-framework"
)
test.beforeAll(beforeAll)
test.afterAll(afterAll)

test("Fullstack Framework example works", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.locator("#__nuxt>p").waitFor()
	const innerText = await page.innerText("#__nuxt")
	expect(innerText).toContain("Backend, meet Frontend.")
})
