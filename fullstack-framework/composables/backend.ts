// Import the Prim+RPC client
import { createPrimClient } from "@doseofted/prim-rpc"
// Also, import the browser-specific plugins to communicate with our server
import { createMethodPlugin } from "@doseofted/prim-rpc-plugins/browser"
// Import the module type from the server (use `import type` to import types only)
import type module from "@/hello"

// Setup the Prim+RPC client and give it the endpoint of the configured server
export const backend = createPrimClient<typeof module>({
	endpoint: process.server ? "http://localhost:3000/api/prim" : "/api/prim",
	methodPlugin: createMethodPlugin(),
})
