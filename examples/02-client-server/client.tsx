/* @refresh reload */
import { createPrimClient } from "@doseofted/prim-rpc"
import {
	createMethodPlugin,
	createCallbackPlugin,
} from "@doseofted/prim-rpc-plugins/browser-api"
import type { module } from "./server"
import { createResource } from "solid-js"
import { render } from "solid-js/web"

const backend = createPrimClient<typeof module>({
	endpoint: "http://[::1]:3001/prim",
	methodPlugin: createMethodPlugin(),
	callbackPlugin: createCallbackPlugin(),
})

function App() {
	const [greeting] = createResource(() =>
		backend.sayHello("Backend", "Frontend")
	)
	return <p>{!greeting.loading && greeting()}</p>
}

render(() => <App />, document.getElementById("root") as HTMLElement)
