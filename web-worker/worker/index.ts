// First, import Prim+RPC server
import { createPrimServer } from "@doseofted/prim-rpc"

// Now import your JavaScript code to be used with Prim+RPC
import * as module from "./hello"

// And import plugins to work with web worker and communicate with main thread
import {
	createCallbackHandler,
	createMethodHandler,
} from "@doseofted/prim-rpc-plugins/web-worker"

// Setup the handlers that will be used to communicate with the main thread
const { methodHandler } = createMethodHandler({ worker: self })
const { callbackHandler, jsonHandler } = createCallbackHandler({ worker: self })

// Pass your module, configured handlers (including JSON handler) to the Prim+RPC client
createPrimServer({
	module,
	methodHandler,
	callbackHandler,
	jsonHandler,
})

// As a last step, export the type of our module to be used from the client
// With "export type", only the type definitions are exported (no code is exported)
export type { module }
