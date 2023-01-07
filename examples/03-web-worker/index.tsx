/* @refresh reload */
// Import the Prim+RPC client
import { createPrimClient } from "@doseofted/prim-rpc"
import type { module } from "./worker"
// Also, import the browser-specific plugins to communicate with our server
// The "method" plugin uses the Fetch API and the "callback" plugin uses the WebSocket API
import {
	createMethodPlugin,
	createCallbackPlugin,
} from "@doseofted/prim-rpc-plugins/web-worker"

// Import Solid dependencies (this isn't Prim+RPC related, just for displaying results)
import { createResource } from "solid-js"
import { render } from "solid-js/web"

const worker = new Worker(new URL("./worker", import.meta.url), {
	type: "module",
})

// Setup the Prim+RPC client and give it the endpoint of the configured server
const { methodPlugin, jsonHandler } = createMethodPlugin({ worker })
const { callbackPlugin } = createCallbackPlugin({ worker })
const workerClient = createPrimClient<typeof module>({
	jsonHandler,
	methodPlugin,
	callbackPlugin,
})

// App is the root component used by Solid
function App() {
	// Make a function call using Prim+RPC (`createResource` is Solid's way of handling returned promise)
	const [upper] = createResource(() =>
		workerClient.makeUpperCase("I am capitalized.")
	)
	// Check if promise has resolved (loading === false) and then display returned value
	return <p>{!upper.loading && upper()}</p>
}

// Render Solid app to HTML given in #root of index.html
render(() => <App />, document.getElementById("root") as HTMLElement)
