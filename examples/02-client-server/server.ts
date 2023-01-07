// First, import Prim+RPC server
import { createPrimServer } from "@doseofted/prim-rpc"

// And import plugins for intended servers (we'll be using `fastify` and `ws`)
import { createMethodHandler } from "@doseofted/prim-rpc-plugins/fastify"
import { createCallbackHandler } from "@doseofted/prim-rpc-plugins/ws"

// import server frameworks themselves
import Fastify from "fastify"
import { WebSocketServer } from "ws"

// Import Fastify's `cors` module so that client can communicate with server
import cors from "@fastify/cors"

/** Define some function to be called from the client. This one says hello. */
function sayHello(x: string, y: string) {
	return `${x}, meet ${y}.`
}

// Ensure function is exposed to client by adding the `.rpc` property
sayHello.rpc = true

// Create a module (or a variable resembling one) to be used with Prim+RPC
// Also, export this module so that types (and types only) can be imported by client
export const module = { sayHello }

// Setup Fastify and WS Server (this isn't Prim+RPC related)
const fastify = Fastify()
const wss = new WebSocketServer({ server: fastify.server })

// Register `cors` module with fastify so that client can communicate with server
await fastify.register(cors)

// Now create the Prim+RPC with the configured module and plugins for our servers
createPrimServer({
	prefix: "/",
	module: { sayHello },
	methodHandler: createMethodHandler({ fastify }),
	callbackHandler: createCallbackHandler({ wss }),
})

// Start listening with Fastify server (where Prim+RPC will be served)
const address = await fastify.listen({ port: 3001 })
console.log("Serving", address)
