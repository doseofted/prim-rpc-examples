/* @refresh reload */
// Import the Prim+RPC client
import { createPrimClient } from "@doseofted/prim-rpc"

// Also, import the browser-specific plugins to communicate with our server
// The "method" plugin uses the Fetch API and the "callback" plugin uses the WebSocket API
import {
	createMethodPlugin,
	createCallbackPlugin,
} from "@doseofted/prim-rpc-plugins/browser-api"

// Import the module type from the server (use `import type` to import types only)
import type { module } from "./server"

// Import Solid dependencies (this isn't Prim+RPC related, just for displaying result)
import { createResource } from "solid-js"
import { render } from "solid-js/web"

// Setup the Prim+RPC client and give it the endpoint of the configured server
const backend = createPrimClient<typeof module>({
	endpoint: "http://[::1]:3001/",
	methodPlugin: createMethodPlugin(),
	callbackPlugin: createCallbackPlugin(),
})

// App is the root component used by Solid. The return value will become HTML.
function App() {
	// Make a function call using Prim+RPC (`createResource` is Solid's way of handling returned promise)
	const [greeting] = createResource(async () => {
		const greeting = await backend.sayHello("Backend", "Frontend")
		console.log(greeting)
		return greeting
	})
	// Check if promise has resolved (loading === false) and then display returned value
	return <p>{!greeting.loading && greeting()}</p>
}

// Render Solid app to HTML given in #root of index.html
render(() => <App />, document.getElementById("root") as HTMLElement)
