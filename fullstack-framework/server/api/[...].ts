// First, import Prim+RPC server
import { createPrimServer } from "@doseofted/prim-rpc"
// And import plugins for intended server (we'll be using `h3` which powers Nuxt's Nitro server)
import { defineH3PrimHandler } from "@doseofted/prim-rpc-plugins/h3"

// Now create the Prim+RPC with the configured module and plugin for our server
const prim = createPrimServer({
	module: import("@/hello"),
	prefix: "/api/prim",
})

// Unlike previous examples, we don't need to give the Prim+RPC server a method handler.
// Instead we will export an H3 event handler and pass it an instance of our Prim+RPC server.
export default defineH3PrimHandler({ prim })
