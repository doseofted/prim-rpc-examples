// First, import Prim+RPC server
import { createPrimServer } from "@doseofted/prim-rpc"
// Now import your JavaScript code to be used with Prim+RPC
import * as module from "./hello"
// And import plugins for intended servers (we'll be using `hono`)
import { createMethodHandler } from "@doseofted/prim-rpc-plugins/hono"
// import server framework itself
import { Hono } from "hono"
// Import Hono's `cors` module so that client can communicate with server
import { cors } from "hono/cors"

// Setup Hono (this isn't Prim+RPC related)
const app = new Hono()

// Register `cors` module with Hono so that client can communicate with server
app.use("*", cors())
app.get("/health", (ctx) => ctx.text("ok")) // simple health check

// Now create the Prim+RPC with the configured module and plugins for our servers
const methodHandler = createMethodHandler({ app })
createPrimServer({
	prefix: "/",
	module,
	methodHandler,
})

// if testing project locally, start a local Node.js server for testing
if (typeof process !== "undefined" && typeof process?.env?.NODE === "string") {
	const { serve } = await import("@hono/node-server")
	serve(app).listen(3001)
	console.log("Serving", `http://localhost:3001`)
}

// export app to be used from serverless environment
export default app

// As a last step, export the type of our module to be used from the client
// With "export type", only the type definitions are exported (no code is exported)
export type { module }
