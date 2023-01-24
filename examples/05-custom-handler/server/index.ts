// First, import Prim+RPC server
import { createPrimServer, JsonHandler } from "@doseofted/prim-rpc"
// Now import your JavaScript code to be used with Prim+RPC
import * as module from "./hello"

// And import plugins for intended servers (we'll be using `fastify` and `ws`)
import { createMethodHandler } from "@doseofted/prim-rpc-plugins/fastify"
import { createCallbackHandler } from "@doseofted/prim-rpc-plugins/ws"

// import server frameworks themselves
import Fastify from "fastify"
import { WebSocketServer } from "ws"

// Import Fastify's `cors` module so that client can communicate with server
import cors from "@fastify/cors"

// import custom JSON handler
import yaml from "yaml"

const jsonHandler: JsonHandler = {
	parse: yaml.parse,
	stringify: yaml.stringify,
	mediaType: "application/yaml",
}

// Setup Fastify and WS Server (this isn't Prim+RPC related)
const fastify = Fastify()
const wss = new WebSocketServer({ server: fastify.server })

fastify.addContentTypeParser("application/yaml", (_req, payload, done) => {
	let data: Buffer
	payload.on("data", (chunk) => {
		data = Buffer.concat([data, chunk].filter((given) => given))
	})
	payload.on("error", () => {
		done(new Error("Buffer could not be read"))
	})
	payload.on("end", () => {
		done(null, data.toString("utf-8"))
	})
})

// Register `cors` module with fastify so that client can communicate with server
await fastify.register(cors)

// Now create the Prim+RPC with the configured module and plugins for our servers
createPrimServer({
	prefix: "/",
	module,
	jsonHandler,
	handleBlobs: false,
	methodHandler: createMethodHandler({ fastify }),
	callbackHandler: createCallbackHandler({ wss }),
})

// Start listening with Fastify server (where Prim+RPC will be served)
const address = await fastify.listen({ port: 3001 })
console.log("Serving", address)

// As a last step, export the type of our module to be used from the client
// With "export type", only the type definitions are exported (no code is exported)
export type { module }
