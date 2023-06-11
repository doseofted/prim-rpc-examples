import { createResource } from "solid-js"
import { render } from "solid-js/web"
import html from "solid-js/html"

// NOTE: Prim+RPC client setup will go here

async function fetchHello() {
	const message = await fetch(
		"http://website.localhost:3001/api?x=Frontend&y=Backend"
	).then((r) => r.text())
	console.log("Message:", message)
	return message
}

const [message] = createResource(fetchHello)
const dispose = render(() => html`<p>${() => message()}</p>`, document.body)

// ignore this bit (it's just in case server isn't running yet in development mode)
if (import.meta.hot) {
	import.meta.hot?.dispose(dispose)
	fetch("http://website.localhost:3001/health").catch(() =>
		setTimeout(() => location.reload(), 300)
	)
}
