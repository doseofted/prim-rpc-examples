// @ts-check
import { test, expect } from "@playwright/test"
import { $ } from "zx"
import { setupServer } from "./utils/setup-server.mjs"

const { beforeAll, afterAll } = setupServer(
	() => $`pnpm start`,
	(data) => !!data.match(/ready in .+ ms/m),
	"./monorepo-setup"
)
test.beforeAll(beforeAll)
test.afterAll(afterAll)

test("Monorepo Setup example works", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.locator("#root>p").waitFor()
	const innerText = await page.innerText("#root")
	expect(innerText).toContain("Backend, meet Frontend.")
})
