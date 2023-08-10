// @ts-check
import { test, expect } from "@playwright/test"
import { $ } from "zx"
import { setupServer } from "./utils/setup-server.mjs"

const { beforeAll, afterAll } = setupServer(
	() => $`pnpm start`,
	(data) => !!data.match(/ready in .+ ms/m),
	"./server-context"
)
test.beforeAll(beforeAll)
test.afterAll(afterAll)

test("Server Context example works", async ({ page }) => {
	await page.goto("http://localhost:3000/")
	await page.locator("#root>.result").waitFor()
	const innerText = await page.innerText("#root>.result")
	expect(innerText).toContain("Hello stranger.")
	await page.locator("#name").fill("Ted")
	const responseReceived = page.waitForResponse("http://*localhost:3001/*")
	await page.locator('[type="submit"]').click()
	await responseReceived
	await page.waitForTimeout(50)
	const innerTextNew = await page.innerText("#root>.result")
	expect(innerTextNew).toContain("Hello Ted.")
})
