// Import the Prim+RPC client
import { createPrimClient } from "@doseofted/prim-rpc"

// Also, import the browser-specific plugins to communicate with our server
// The "method" plugin uses the Fetch API and the "callback" plugin uses the WebSocket API
import {
	createMethodPlugin,
	createCallbackPlugin,
} from "@doseofted/prim-rpc-plugins/browser"

// Import the module type from the server (use `import type` to import types only)
import type { module } from "./server"

// Import Solid dependencies (this isn't Prim+RPC related, just for displaying result)
import { createResource } from "solid-js"
import { render } from "solid-js/web"

// Setup the Prim+RPC client and give it the endpoint of the configured server
const backend = createPrimClient<typeof module>({
	endpoint: "http://website.localhost:3001/", // replace with worker URL once deployed
	methodPlugin: createMethodPlugin(),
	callbackPlugin: createCallbackPlugin(),
})

// App is the root component used by Solid. The return value will become HTML.
function App() {
	// Make a function call using Prim+RPC (`createResource` is Solid's way of handling returned promise)
	const [greeting] = createResource(async () => {
		const greeting = await backend.sayHello("Backend", "Frontend")
		console.log(greeting) // we can log result to see the result is just a string
		return greeting
	})
	// Check if promise has resolved (loading === false) and then display returned value
	return <p>{!greeting.loading && greeting()}</p>
}

// Render Solid app to HTML given in #root of index.html
const root = document.getElementById("root") as HTMLElement
const dispose = render(() => <App />, root)

// ignore this bit (it's just in case server isn't running yet in development mode)
if (import.meta.hot) {
	import.meta.hot?.dispose(dispose)
	fetch("http://website.localhost:3001/health").catch(() =>
		setTimeout(() => location.reload(), 300)
	)
}
