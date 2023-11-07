import { For, Show, createResource, createSignal } from "solid-js"
import { createAutoAnimate } from "@formkit/auto-animate/solid"
import { render } from "solid-js/web"
import { client } from "./prim"
import { LoginForm } from "./LoginForm"

const tabs = ["log in", "sign up"]
const [currentTab, setCurrentTab] = createSignal("sign up")

const [greeting, { refetch: refetchBase }] = createResource(async () => {
	try {
		return await client.greeting()
	} catch (error) {
		return ""
	}
})

async function refetch() {
	await refetchBase()
	setError("") // clear previous errors
}

async function logout() {
	await client.logout()
	await refetch()
}

const [error, setError] = createSignal("")
function givenError(e: unknown) {
	// no need to parse Zod's error, this is just a demo
	if (e instanceof Error && e.name === "ZodError") {
		const [error] = JSON.parse(e.message)
		if ("message" in error) setError(error.message)
	} else if (e instanceof Error) {
		setError(e.message)
	} else {
		console.log(e)
		setError("Check console logs")
	}
}

render(() => {
	let [container] = createAutoAnimate()
	return (
		<div class="h-auto grid place-items-center p-8">
			<div ref={container} class="card bg-neutral-200 w-full max-w-lg overflow-hidden">
				<Show when={!greeting()}>
					<div class="tabs tabs-boxed py-4 px-8 grid grid-cols-2">
						<For each={tabs}>
							{(tab) => (
								<button
									onclick={() => setCurrentTab(tab)}
									class="tab"
									classList={{ "tab-active": currentTab() === tab }}
								>
									{tab}
								</button>
							)}
						</For>
					</div>
					<LoginForm signUp={currentTab() === "sign up"} onsubmit={refetch} onerror={givenError} />
				</Show>
				<Show when={greeting()}>
					<div class="card-body">
						<p class="text-xl font-bold text-center">{greeting()}</p>
						<button class="btn btn-neutral" onclick={logout}>
							Log Out
						</button>
					</div>
				</Show>
				<Show when={error()}>
					<div class="alert alert-error rounded-none">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 1 1-16 0a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>{error()}</span>
					</div>
				</Show>
			</div>
		</div>
	)
}, document.getElementById("app")!)

// NOTE: ignore this line: it's just for development mode
if (import.meta.env.DEV) fetch("http://localhost:3001/prim").catch(() => setTimeout(() => location.reload(), 300))
