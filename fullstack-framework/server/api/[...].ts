// First, import Prim+RPC server
import { createPrimServer } from "@doseofted/prim-rpc"
// And import plugins for intended server (we'll be using `h3` which powers Nuxt's Nitro server)
import { defineH3PrimHandler } from "@doseofted/prim-rpc-plugins/h3"
// Now import your JavaScript code to be used with Prim+RPC
import * as myModule from "@/hello"

// Now create the Prim+RPC with the configured module and plugin for our server
const prim = createPrimServer({
	prefix: "/api/prim",
	module: myModule,
})

// Unlike previous examples, we don't need to give the Prim+RPC server a method handler.
// Instead we will create an H3 event handler and pass it an instance of our Prim+RPC server.
// We need to do this here because Nuxt expects a default export containing an H3 route handler.
export default defineH3PrimHandler({ prim })
