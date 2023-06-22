// Import the Prim+RPC client
import { createPrimClient } from "@doseofted/prim-rpc"
// Also, import the browser-specific plugins to communicate with our server
import { createMethodPlugin } from "@doseofted/prim-rpc-plugins/browser"

// Setup the Prim+RPC client and give it the endpoint of the configured server
// Also provide module type to generic parameter (since module type is possibly is null)
export const backend = createPrimClient<typeof import("@/hello")>({
	module: process.server ? import("@/hello") : null,
	endpoint: "/api/prim",
	methodPlugin: createMethodPlugin(),
})
