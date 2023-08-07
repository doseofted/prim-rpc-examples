/* @refresh reload */
// Import the Prim+RPC client
import { createPrimClient } from "@doseofted/prim-rpc"
import type { module } from "./worker"
// Also, import the worker-specific plugins to communicate with our server
// Both the "method" and "callback" plugin uses the message event channel to communicate
import {
	createMethodPlugin,
	createCallbackPlugin,
	jsonHandler
} from "@doseofted/prim-rpc-plugins/web-worker"

// Import Solid dependencies (this isn't Prim+RPC related, just for displaying results)
import { createResource } from "solid-js"
import { render } from "solid-js/web"

// Import the worker in your script
const worker = new Worker(new URL("./worker", import.meta.url), {
	type: "module",
})

// Setup the Prim+RPC plugins with your worker
const methodPlugin = createMethodPlugin({ worker })
const callbackPlugin = createCallbackPlugin({ worker })
// Pass these plugins to the Prim+RPC client
const workerClient = createPrimClient<typeof module>({
	jsonHandler,
	methodPlugin,
	callbackPlugin,
})

// App is the root component used by Solid
function App() {
	// Make a function call using Prim+RPC (`createResource` is Solid's way of handling returned promise)
	const [greeting] = createResource(() =>
		workerClient.sayHello("Backend", "Frontend")
	)
	// Check if promise has resolved (loading === false) and then display returned value
	return <p>{!greeting.loading && greeting()}</p>
}

// Render Solid app to HTML given in #root of index.html
render(() => <App />, document.getElementById("root") as HTMLElement)
