/* @refresh reload */
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
	endpoint: "http://website.localhost:3001/",
	// we'll need to include credentials on the Fetch API client so that cookies are set
	methodPlugin: createMethodPlugin({ credentials: "include" }),
	callbackPlugin: createCallbackPlugin(),
})

// App is the root component used by Solid. The return value will become HTML.
function App() {
	// Name is set by `changeName()` below and persists between page loads because it's saved to a cookie
	const [message, { refetch }] = createResource(() => backend.sayHello())
	return (
		<>
			<form
				onSubmit={async (event) => {
					// prevent page refresh on form submission
					event.preventDefault()
					const form = event.currentTarget
					// whenever the form is submitted, change the name
					// note that the server will read from the form given to it
					await backend.changeName(form)
					// call Solid's `refetch()` method to call `backend.sayHello()` again
					refetch()
					// also reset the form
					form.reset()
				}}
				class="inputs"
			>
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" />
				<input type="submit">Change</input>
			</form>
			<div class="result">{message()}</div>
		</>
	)
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
