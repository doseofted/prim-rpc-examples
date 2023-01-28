import { createResource } from "solid-js"
import { render } from "solid-js/web"
import html from "solid-js/html"

// NOTE: Prim+RPC client setup will go here

async function fetchHello() {
	const message = await fetch(
		"http://[::1]:3001/api?x=Frontend&y=Backend"
	).then((r) => r.text())
	console.log("Message:", message)
	return message
}

const [message] = createResource(fetchHello)
render(() => html`<p>${() => message()}</p>`, document.body)
