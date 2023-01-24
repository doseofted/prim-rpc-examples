// First, import Prim+RPC server
import { createPrimServer, JsonHandler } from "@doseofted/prim-rpc"
// Now import your JavaScript code to be used with Prim+RPC
import * as module from "./hello"

// And import plugins for intended servers (we'll be using `express` and `ws`)
import { createMethodHandler } from "@doseofted/prim-rpc-plugins/express"
import { createCallbackHandler } from "@doseofted/prim-rpc-plugins/ws"

// import server frameworks themselves
import { createServer } from "node:http"
import express from "express"
import { WebSocketServer } from "ws"

// Import Express's `cors` module so that client can communicate with server
import cors from "cors"

// import custom JSON handler
import yaml from "yaml"

const jsonHandler: JsonHandler = {
	parse: yaml.parse,
	stringify: yaml.stringify,
	mediaType: "application/yaml",
}

// Setup Express and WS Server (this isn't Prim+RPC related)
const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server })

// Register `cors` module with Express so that client can communicate with server
app.use(cors())

// Now create the Prim+RPC with the configured module and plugins for our servers
createPrimServer({
	prefix: "/",
	module,
	jsonHandler,
	methodHandler: createMethodHandler({ app }),
	callbackHandler: createCallbackHandler({ wss }),
})

// Start listening with Express server (where Prim+RPC will be served)
server.listen(3001)
console.log("Serving", server.address())

// As a last step, export the type of our module to be used from the client
// With "export type", only the type definitions are exported (no code is exported)
export type { module }
